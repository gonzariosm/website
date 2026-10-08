#!/usr/bin/env node
// Serves the static build (dist/) the way production does: every response
// gets the headers declared in public/_headers (Cloudflare Pages / Netlify
// syntax), so local previews and tunnels send the same UTF-8 content types.
// `astro preview` does not read _headers and sends .md/.txt without a charset.
//
// Usage: node scripts/preview.mjs [--port 4321] [--host 127.0.0.1]

import { createReadStream } from 'node:fs';
import { readFile, realpath, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(resolve(fileURLToPath(new URL('../dist', import.meta.url))));
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const port = Number(arg('port', process.env.PORT ?? 4321));
const host = arg('host', '127.0.0.1');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webm': 'audio/webm',
  '.mp3': 'audio/mpeg',
};

/** Parses _headers into [{ pattern: RegExp, headers: [name, value][] }]. */
function parseHeaders(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      const source = line.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
      rules.push({ pattern: new RegExp(`^${source}$`), headers: [] });
    } else if (rules.length) {
      const at = line.indexOf(':');
      if (at > 0) rules.at(-1).headers.push([line.slice(0, at).trim(), line.slice(at + 1).trim()]);
    }
  }
  return rules;
}

const rules = parseHeaders(await readFile(join(root, '_headers'), 'utf8').catch(() => ''));

async function resolveFile(pathname) {
  const target = resolve(root, `.${pathname}`);
  if (target !== root && !target.startsWith(root + sep)) return null;
  for (const candidate of [target, join(target, 'index.html'), `${target}.html`]) {
    // Resolve symlinks so nothing outside dist/ can be served through one.
    const real = await realpath(candidate).catch(() => null);
    if (!real || !real.startsWith(root + sep)) continue;
    const info = await stat(real).catch(() => null);
    if (info?.isFile()) return { file: real, size: info.size };
  }
  return null;
}

createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  let found = await resolveFile(pathname);
  let status = 200;
  if (!found) {
    found = await resolveFile('/404.html');
    status = 404;
  }
  if (!found) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }

  res.setHeader('Content-Type', types[extname(found.file)] ?? 'application/octet-stream');
  res.setHeader('Accept-Ranges', 'bytes');
  for (const rule of rules) {
    if (rule.pattern.test(pathname)) for (const [name, value] of rule.headers) res.setHeader(name, value);
  }

  // Byte ranges, so audio can seek (Safari refuses media without them). There
  // are no validators to compare, so a conditional If-Range gets the full body.
  const range =
    status === 200 && req.method === 'GET' && !req.headers['if-range'] && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
  let start = 0;
  let end = found.size - 1;
  if (range && (range[1] || range[2])) {
    start = range[1] ? Number(range[1]) : Math.max(0, found.size - Number(range[2]));
    end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
    if (start > end) {
      res.writeHead(416, { 'Content-Range': `bytes */${found.size}` }).end();
      return;
    }
    status = 206;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${found.size}`);
  }

  res.writeHead(status, { 'Content-Length': end - start + 1 });
  if (req.method === 'HEAD' || found.size === 0) {
    res.end();
    return;
  }
  createReadStream(found.file, { start, end })
    .on('error', () => res.destroy())
    .pipe(res);
}).listen(port, host, () => {
  console.log(`Previewing dist/ at http://${host}:${port}/ (headers from _headers)`);
});
