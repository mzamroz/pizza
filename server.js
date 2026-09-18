import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const port = Number(process.env.PORT) || 5173;
const version = JSON.parse(readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8')).version;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

/** Dopina ?v= z package.json, żeby po deployu przeglądarka nie trzymała starego CSS/JS. */
function withCacheBust(body, ext) {
  let text = body.toString('utf8');
  if (ext === '.html') {
    text = text.replace(/(href|src)="([^"?]+\.(?:css|js))(?:\?[^"]*)?"/g, (_, attr, file) => `${attr}="${file}?v=${version}"`);
  } else if (ext === '.js') {
    text = text.replace(/from\s+(['"])(\.\/[^'"?]+)(?:\?[^'"]*)?\1/g, (_, q, spec) => `from ${q}${spec}?v=${version}${q}`);
  }
  return text;
}

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root + '/')) { res.writeHead(403).end(); return; }
    const ext = extname(path);
    let body = await readFile(path);
    if (ext === '.html' || ext === '.js') body = withCacheBust(body, ext);
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache, must-revalidate',
      'X-App-Version': version
    }).end(body);
  } catch { res.writeHead(404).end('Nie znaleziono pliku'); }
}).listen(port, '0.0.0.0', () => console.log(`Pizza Piccola v${version}: http://localhost:${port}`));
