import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));

async function verifySiteAssets() {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'site/assets-manifest.json'), 'utf8'),
  );

  if (manifest.schema_version !== 2 || manifest.assets.length !== 6) {
    throw new Error('Expected six public display assets in manifest schema 2.');
  }
  const publicPaths = new Set(manifest.assets.map((asset) => `site/public/${asset.path}`));
  let tracked = [];
  // Archives can build without Git metadata; check the index when available.
  try {
    tracked = execFileSync('git', ['-C', root, 'ls-files', '-z'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\0').filter(Boolean);
  } catch (error) {
    if (error.status !== 128) throw error;
  }
  for (const path of tracked) {
    if (path.startsWith('branding/') || /\.prompt\.txt$/i.test(path) ||
        (/\.(png|jpe?g|webp)$/i.test(path) && !publicPaths.has(path))) {
      throw new Error(`Private source or unapproved image tracked in public repository: ${path}`);
    }
  }

  for (const asset of manifest.assets) {
    if (!/^assets\/(?:characters\/)?[a-z0-9-]+\.webp$/.test(asset.path)) {
      throw new Error(`Invalid website asset path: ${asset.path}`);
    }
    const bytes = await readFile(resolve(root, 'site/public', asset.path));
    if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
      throw new Error(`Expected a WebP display image: ${asset.path}`);
    }
    const maxEdge = asset.path.startsWith('assets/characters/') ? 1024 : 768;
    if (asset.dimensions.length !== 2 || asset.dimensions.some((n) => !Number.isInteger(n) || n < 1 || n > maxEdge)) {
      throw new Error(`Invalid display image dimensions for ${asset.path}`);
    }
    const metadata = await sharp(bytes).metadata();
    if (metadata.format !== 'webp' || metadata.width !== asset.dimensions[0] || metadata.height !== asset.dimensions[1]) {
      throw new Error(`Display image metadata mismatch for ${asset.path}`);
    }
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
