/* Checks the built page (index.html) after `python3 build.py`:
   - every inline <script> parses (a syntax error would blank the whole site)
   - no element id is used twice
   - no script is loaded from another website (everything ships with the site)
   - sw.js has a version and lists the core files
   Run from the repo root or tools/:  node tools/check-built.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) pass++;
  else { fail++; console.log('FAIL: ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
ok('the page has inline scripts', scripts.length > 0, scripts.length);
scripts.forEach((code, i) => {
  try { new vm.Script(code, { filename: 'inline-script-' + i + '.js' }); ok('script ' + i + ' parses', true); }
  catch (e) { ok('script ' + i + ' parses', false, e.message); }
});

/* ids written in the markup (ids built by scripts are checked in the browser by smoke.js) */
const ids = [...html.replace(/<script[\s\S]*?<\/script>/gi, '').matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
const dup = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
ok('no id is used twice in the markup', dup.length === 0, dup);

const external = [...html.matchAll(/(?:src|href)\s*=\s*["'](https?:\/\/[^"']+)["']|\.src\s*=\s*["'](https?:\/\/[^"']+)["']/g)]
  .map(m => m[1] || m[2]).filter(u => !/fonts\.(googleapis|gstatic)\.com|w3\.org/.test(u));
ok('no scripts or files load from other websites (fonts aside)', external.length === 0, external.slice(0, 5));

ok('pinyin loads from the site itself', /\/vendor\/pinyin-pro-3\.26\.0\.js/.test(html));
ok('the bundled pinyin file exists', fs.existsSync(path.join(ROOT, 'vendor', 'pinyin-pro-3.26.0.js')));

ok('sw.js has a build version', /const VERSION = "[0-9a-f]{8,}"/.test(sw));
ok('sw.js saves the page for offline use', /CORE_FILES = \[[^\]]*"\/index\.html"/.test(sw));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
