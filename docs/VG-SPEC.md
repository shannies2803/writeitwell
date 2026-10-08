# Vocabulary & Grammar practice — content brief

A new "Vocab & Grammar" section for Singapore primary pupils (main users: a P3 boy who is weak at spelling/grammar, and a P1 girl). It teaches each topic in child-friendly language, then gives lots of practice with instant explanations. Wrong answers go into a "mistake bank" that comes back later, so every explanation (`why`) must teach, not just say "the answer is B".

Plain JS, double-quoted strings only, no backticks, no emoji. Validate with `node validate-vg.js <file>` (in this folder) and fix every error.

## File format
```js
window.VG = window.VG || [];
window.VG.push({
  id: "en-g-sva",            // given in your brief, unique
  lang: "en",                // "en" or "zh"
  kind: "grammar",           // "grammar" or "vocab"
  group: "Verbs and tenses", // section heading given in your brief
  title: "Subject–verb agreement",
  lv: "B",                   // "A" P1–P2, "B" P3–P4, "C" P5–P6 (the topic's starting level)
  intro: "One or two friendly sentences: what this is and why it matters in writing.",
  rules: [ { h: "Short rule heading", html: "Explanation with <b>examples</b>. <br> allowed. Use ✓ and ✗ for right/wrong examples." } ],   // 3–8 rules
  words: [ { w: "reluctant", m: "not wanting to do something", ex: "Ravi was reluctant to jump into the cold pool." } ],   // VOCAB topics: 15–30 words (grammar topics: omit or [])
  mistakes: [ { wrong: "My brother play the violin.", right: "My brother plays the violin.", why: "One person (he) → add s." } ],   // 3–8 common mistakes
  items: [   // 30+ practice items, mixed levels inside (each item has lv)
    { t: "mcq", lv: "B", q: "Each of the pupils ___ a library card.", o: ["have","has","having","are having"], a: 1, why: "Each = one at a time → singular → has." },
    { t: "fix", lv: "B", q: "Neither the teacher nor the pupils was ready.", err: "was", a: "were", why: "With neither…nor, the verb agrees with the nearer subject (pupils → were)." },
    { t: "fill", lv: "A", q: "There are two ___ (box) on the table.", a: ["boxes"], why: "Words ending in x add -es." },
    { t: "trans", lv: "C", q: "Combine using 'although': It was raining. We went to the park.", a: ["Although it was raining, we went to the park.","We went to the park although it was raining."], why: "Although shows contrast; do not add 'but'." }
  ]
});
```
Item types:
- `mcq`: 4 options (3 allowed for lv A), `a` = index of the ONE correct option. Distractors must be plausible but clearly wrong; never two defensible answers.
- `fix`: a sentence with exactly ONE wrong word/short phrase; `err` = the wrong text exactly as it appears in `q`; `a` = the replacement.
- `fill`: `q` contains exactly one ___ ; `a` = list of accepted answers (1–3, exact spellings).
- `trans`: rewrite/combine; `a` = 1–3 model answers; the app compares loosely and then shows the model so the child can self-check.
Chinese uses the same types: `q` in Chinese, ___ marks the blank (for 括号题 also use ___), `why` in simple Chinese.

Mix per topic: about 55–65% mcq, 15–20% fix, 15–20% fill, and trans only where it fits (synthesis / 句式转换). Spread `lv` so a P3 child has plenty at A and B; C items for stretch.

Quality: correct, unambiguous, natural sentences set in Singapore everyday life (HDB, MRT, hawker centre, school, CCA), varied names, child-safe. English: British spelling and Singapore school grammar conventions. Chinese: simplified, standard, the terms used in Singapore schools (关联词, 量词, 病句, 修辞手法…). Explanations short and kind, written for a 9-year-old.
