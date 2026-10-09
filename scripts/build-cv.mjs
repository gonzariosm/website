#!/usr/bin/env node
// Compiles the generated LaTeX CVs (dist/cv/*.tex, produced by `astro build`)
// to PDF with Tectonic and stores them in public/cv/, so hosting never needs a
// TeX toolchain. public/cv/manifest.json records the hash of the .tex each PDF
// came from; the build warns when a PDF is out of date.
//
// Requires: tectonic (brew install tectonic). Usage: npm run cv

import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = fileURLToPath(new URL('..', import.meta.url));
const locales = ['en', 'es'];
const publicDir = join(root, 'public/cv');
const distDir = join(root, 'dist/cv');

await mkdir(publicDir, { recursive: true });
const tmp = await mkdtemp(join(tmpdir(), 'cv-'));
const manifest = {};
try {
  for (const locale of locales) {
    const name = `gonzalo-rios-cv-${locale}`;
    const source = join(distDir, `${name}.tex`);
    const tex = await readFile(source, 'utf8').catch(() => {
      throw new Error(`Missing ${source}: run astro build first (npm run cv does both).`);
    });
    await run('tectonic', ['--keep-logs', '--outdir', tmp, source]);
    const pdf = join(publicDir, `${name}.pdf`);
    await copyFile(join(tmp, `${name}.pdf`), pdf);
    await copyFile(pdf, join(distDir, `${name}.pdf`));
    const { size } = await stat(pdf);
    // XeTeX compresses the page tree, so take the page count from the log.
    const log = await readFile(join(tmp, `${name}.log`), 'utf8');
    const pages = Number(/\((\d+) pages?\b/.exec(log)?.[1] ?? 0);
    manifest[locale] = { tex: createHash('sha256').update(tex).digest('hex'), bytes: size, pages };
    console.log(`wrote public/cv/${name}.pdf (${(size / 1024).toFixed(0)} KB)`);
  }
  await writeFile(join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
} finally {
  await rm(tmp, { recursive: true, force: true });
}
