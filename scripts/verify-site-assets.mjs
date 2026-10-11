import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

async function verifySiteAssets() {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'site/assets-manifest.json'), 'utf8'),
  );

  for (const asset of manifest.assets) {
    if (!/^assets\/(?:characters\/)?[a-z0-9-]+\.png$/.test(asset.path)) {
      throw new Error(`Invalid website asset path: ${asset.path}`);
    }
    const bytes = await readFile(resolve(root, 'site/public', asset.path));
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash !== asset.sha256) {
      throw new Error(`SHA256 mismatch for ${asset.path}`);
    }
    console.log(`Verified ${asset.path}`);
  }
}

verifySiteAssets().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
