/* Real-browser smoke test for the built site, on a phone-sized screen (375 px).
   Checks: no script errors, nothing wider than the screen on any main view,
   no duplicate ids, the bundled pinyin library loads and works, and the page
   makes no requests to other websites except Google Fonts.

   Run:  cd tools && npm install && npx playwright install chromium && node smoke.js
   Or set CHROME_PATH to any Chromium/Chrome binary to skip the download. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0, warn = 0;
const ok = (label, cond, detail) => {
  if (cond) pass++;
  else { fail++; console.log('FAIL: ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const note = (label, detail) => { warn++; console.log('WARN: ' + label + '  -> ' + JSON.stringify(detail)); };

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.css': 'text/css' };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(rsp);
    }).listen(0, '127.0.0.1', () => res(srv));
  });
}
const ignorable = t => /fonts\.(googleapis|gstatic)\.com|ERR_(TUNNEL|NAME|INTERNET|CONNECTION)|Failed to load resource/.test(t);

(async () => {
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] } : {});
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [], foreign = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !ignorable(m.text())) errors.push(m.text()); });
  page.on('request', r => {
    const u = new URL(r.url());
    if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && !/fonts\.(googleapis|gstatic)\.com/.test(u.hostname) && u.protocol.startsWith('http')) foreign.push(u.hostname);
  });

  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  const m = await page.evaluate(() => {
    const seen = {}, dup = [];
    document.querySelectorAll('[id]').forEach(e => { if (seen[e.id]) dup.push(e.id); seen[e.id] = 1; });
    return {
      doctype: !!document.doctype, lang: document.documentElement.lang,
      viewport: (document.querySelector('meta[name=viewport]') || {}).content || '',
      overflow: document.documentElement.scrollWidth > innerWidth + 1, dup: [...new Set(dup)],
    };
  });
  ok('has a doctype', m.doctype);
  ok('declares its language', !!m.lang, m.lang);
  ok('has a phone viewport', /width=device-width/.test(m.viewport), m.viewport);
  ok('home fits a 375 px screen', !m.overflow);
  if (m.dup.length) note('ids used more than once', m.dup.slice(0, 10));

  /* the bundled pinyin library: load the same file the site's loaders point at
     (check-built.js confirms the site uses this path) and use it */
  const py = await page.evaluate(() => new Promise(res => {
    if (window.pinyinPro) return res({ out: window.pinyinPro.pinyin('中文') });
    const s = document.createElement('script');
    s.src = '/vendor/pinyin-pro-3.26.0.js';
    s.onload = () => res({ out: window.pinyinPro ? window.pinyinPro.pinyin('中文') : null });
    s.onerror = () => res({ err: 'could not load /vendor/pinyin-pro-3.26.0.js' });
    document.head.appendChild(s);
  }));
  ok('the bundled pinyin library loads', !py.err, py.err);
  ok('pinyin works (中文 -> zhōng wén)', py.out === 'zhōng wén', py.out);

  /* open each main section from the navigation */
  const labels = await page.evaluate(() => [...document.querySelectorAll('nav button, nav a, [role=tab], .tabs button')]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1; })
    .map(e => (e.textContent || '').trim().replace(/\s+/g, ' ')).filter(Boolean));
  let opened = 0;
  for (const label of [...new Set(labels)].slice(0, 25)) {
    const clicked = await page.evaluate(l => {
      const b = [...document.querySelectorAll('nav button, nav a, [role=tab], .tabs button')]
        .find(e => (e.textContent || '').trim().replace(/\s+/g, ' ') === l);
      if (!b || /reset|delete|clear|remove/i.test(l)) return false;
      b.click(); return true;
    }, label);
    if (!clicked) continue;
    opened++;
    await page.waitForTimeout(300);
    ok('"' + label + '" fits the screen', !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)));
  }
  ok('opened at least one section', opened > 0, labels.length);

  ok('no script errors', errors.length === 0, errors.slice(0, 3));
  ok('no requests to other websites (fonts aside)', foreign.length === 0, [...new Set(foreign)]);

  await browser.close();
  srv.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed' + (warn ? ', ' + warn + ' warnings' : ''));
  process.exit(fail ? 1 : 0);
})();
