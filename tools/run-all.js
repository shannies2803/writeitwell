/* Runs every content validator and the built-page check; with --browser it also
   runs the real-browser smoke test. Stops the build if anything fails.
   Run from tools/:  npm test   or   npm run test:all */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const files = re => fs.readdirSync(SRC).filter(f => re.test(f)).sort();

const STEPS = [
  ['lessons and word banks', 'validate.js', files(/^(en|zh)-.*\.js$/)],
  ['model essays', 'validate-essays.js', files(/^essays-.*\.js$/)],
  ['spelling', 'validate-spell.js', [...files(/^spell-en-.*\.js$/), 'spell-zh-groups.js']],
  ['vocab and grammar', 'validate-vg.js', files(/^vg-.*\.js$/)],
  ['picture stories', 'validate-pics.js', files(/^picsets.*\.js$/)],
  ['built page', 'check-built.js', []],
];
if (process.argv.includes('--browser')) STEPS.push(['phone smoke test', 'smoke.js', []]);

const failed = [];
for (const [label, script, args] of STEPS) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args],
    { cwd: script.startsWith('validate') ? SRC : __dirname, encoding: 'utf8', timeout: 600000, maxBuffer: 64 * 1024 * 1024 });
  const out = ((r.stdout || '') + (r.stderr || '')).trim();
  const last = out.split('\n').pop() || '';
  const good = r.status === 0;
  console.log((good ? 'ok   ' : 'FAIL ') + label.padEnd(24) + last);
  if (!good) { failed.push(label); console.log(out.split('\n').slice(-15).join('\n')); }
}
console.log(failed.length ? '\nFailed: ' + failed.join(', ') : '\nAll ' + STEPS.length + ' checks passed');
process.exit(failed.length ? 1 : 0);
