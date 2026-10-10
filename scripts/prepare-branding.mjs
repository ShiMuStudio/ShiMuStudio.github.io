import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

async function prepareBranding() {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'branding/manifest.json'), 'utf8'),
  );

  for (const asset of manifest.assets) {
    const source = resolve(
      root,
      asset.repository_path ?? `assets/${asset.source_filename}`,
    );
    const bytes = await readFile(source);
    const hash = createHash('sha256').update(bytes).digest('hex');

    if (hash !== asset.sha256) {
      throw new Error(`SHA256 mismatch for ${asset.source_filename}`);
    }

    const output = resolve(root, 'site/public', asset.output_path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, bytes);
    console.log(`Verified and prepared ${asset.output_path}`);
  }
}

prepareBranding().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
