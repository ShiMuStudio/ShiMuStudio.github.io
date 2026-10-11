import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

async function syncSiteAssets() {
  if (!process.argv[2]) {
    throw new Error('Usage: npm run assets:sync -- /path/to/production-kit');
  }
  const sourceRoot = resolve(process.argv[2]);
  const dirty = execFileSync('git', ['-C', sourceRoot, 'status', '--porcelain', '--', 'branding'], { encoding: 'utf8' });
  if (dirty.trim()) {
    throw new Error('Commit production-kit branding changes before exporting website assets.');
  }
  const sourceRevision = execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const readManifest = async (path) => JSON.parse(await readFile(resolve(sourceRoot, path), 'utf8'));
  const branding = await readManifest('branding/manifest.json');
  const characters = await readManifest('branding/characters/manifest.json');
  const sources = [...branding.assets, ...(branding.logo_variants ?? []), ...characters.characters];
  const prepared = [];

  // Validate every source before changing any published copy.
  for (const asset of sources) {
    if (!/^assets\/(?:characters\/)?[a-z0-9-]+\.png$/.test(asset.output_path)) {
      throw new Error(`Invalid website asset path: ${asset.output_path}`);
    }
    const source = resolve(sourceRoot, asset.repository_path ?? asset.image_path);
    if (!source.startsWith(resolve(sourceRoot, 'branding') + sep) || !source.endsWith('.png')) {
      throw new Error(`Invalid branding source path: ${source}`);
    }
    const bytes = await readFile(source);
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash !== asset.sha256) {
      throw new Error(`SHA256 mismatch for ${source}`);
    }
    prepared.push({ asset, bytes });
  }

  for (const { asset, bytes } of prepared) {
    const output = resolve(root, 'site/public', asset.output_path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, bytes);
    console.log(`Exported ${asset.output_path}`);
  }
  const manifest = {
    schema_version: 1,
    source_repository: 'https://github.com/ShiMuStudio/production-kit',
    source_revision: sourceRevision,
    assets: prepared.map(({ asset }) => ({
      id: asset.id,
      path: asset.output_path,
      dimensions: asset.dimensions,
      sha256: asset.sha256,
    })),
  };
  await writeFile(resolve(root, 'site/assets-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
}

syncSiteAssets().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
