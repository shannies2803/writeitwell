# Spelling trainer content brief

The site is getting a "My Spelling" section for a P3 boy who reads well and knows the words but cannot spell them (English and Chinese). He has already asked his mum to spell: immediately, a while, into, another, their, through, breakfast. The method is: learn the WHY of each word (a trick), Look–Say–Cover–Write–Check, spaced review over days, words tested inside real sentences, and a personal proofreading card. Your content powers all of that, so every word needs a genuinely helpful trick (word parts, a rule, a memory hook, a "spelling voice" pronunciation, a family of similar words) — not just "remember it".

All files: plain JS, double-quoted strings only, no backticks, no emoji. Validate with `node validate-spell.js <file>` in this folder and fix every error.

## English words — file spell-en-words.js
```js
window.SPELL_EN_WORDS = window.SPELL_EN_WORDS || [];
window.SPELL_EN_WORDS.push(
  { w: "immediately", lv: "B", rank: 1, tag: "suffix-ly",
    trick: "immediate + ly. Keep the e! The double m comes from im + mediate.",
    s: "Please come downstairs immediately." },
  ...
);
```
- `w`: the word exactly as spelt (may contain a space, e.g. "a while", or an apostrophe, e.g. "they're").
- `lv`: "A" (P1–P2), "B" (P3–P4), "C" (P5–P6). `rank`: 1 = very common and very often misspelt (learn first), 2 = common, 3 = useful extra.
- `tag`: a short pattern key (e.g. "compound", "ough", "silent-letter", "homophone", "suffix-ly", "double", "drop-e", "ie-ei", "tion", "tricky", "days-months"...).
- `trick`: 1–2 short child-friendly sentences explaining WHY / how to remember (British spelling throughout).
- `s`: a natural Singapore-flavoured sentence a child would write, containing `w` EXACTLY once (same letters; capital allowed only if `w` starts the sentence — avoid that).

## Chinese words — file spell-zh-words.js
```js
window.SPELL_ZH_WORDS = window.SPELL_ZH_WORDS || [];
window.SPELL_ZH_WORDS.push(
  { w: "晴天", py: "qíng tiān", lv: "A", rank: 1,
    parts: "晴 = 日 + 青",
    trick: "天晴了才看得见太阳，所以“晴”是日字旁。",
    s: "今天是个晴天，我们去公园放风筝。",
    confuse: "睛（眼睛）· 请（请问）· 清（清水）" },
  ...
);
```
- `w`: a 词语 (2–4 characters) from the Singapore primary curriculum level given, chosen because children often WRITE it wrongly (形近字, 同音字, missing strokes, wrong radical). `py`: tone-marked pinyin, syllables separated by spaces.
- `parts`: the hardest character broken into components (e.g. "晴 = 日 + 青"); `trick`: one or two short sentences in simple Chinese explaining how to remember it (radical meaning, story, 字谜, which stroke children forget). `s`: natural sentence containing `w` exactly once. `confuse`: the look-alike/sound-alike characters with a word each (may be "" if none).

## English patterns and homophones — file spell-en-rules.js
```js
window.SPELL_EN_PATTERNS = window.SPELL_EN_PATTERNS || [];
window.SPELL_EN_PATTERNS.push({ id: "ough", lv: "B", title: "The -ough family",
  explain: "<b>ough</b> can sound six different ways…", rule: "One-line rule a child can remember.",
  words: ["through","though","thought","enough","rough","tough","cough","bought","brought","fought","ought","dough","drought","plough"],
  odd: ["(any exceptions to watch, may be empty)"], tip: "Learn them in groups that rhyme: …" });
window.SPELL_EN_HOMO = window.SPELL_EN_HOMO || [];
window.SPELL_EN_HOMO.push({ set: ["their","there","they're"],
  hints: ["their = belongs to them (there's an heir inside – an heir owns things)", "there = a place (it has here inside)", "they're = they are"],
  quiz: [ { s: "___ dog barks every morning.", a: "Their" }, { s: "Put the box over ___.", a: "there" }, ... ] });
```
- `words` 10–20 per pattern; `quiz` 5–6 sentences per homophone set, each with exactly one ___ and `a` equal to one of `set` (capitalised only when the blank starts the sentence).

## Chinese look-alike groups — file spell-zh-groups.js
```js
window.SPELL_ZH_GROUPS = window.SPELL_ZH_GROUPS || [];
window.SPELL_ZH_GROUPS.push({ title: "“青”字家族", lv: "A",
  note: "这些字都有“青”，读音也差不多，要看偏旁来分辨。",
  chars: [ { c: "晴", py: "qíng", tip: "日字旁：和太阳、天气有关", words: ["晴天","晴朗"] }, ... ],
  quiz: [ { s: "天气（　）朗", opts: ["晴","睛","请","清"], a: "晴" }, ... ] });
```
- 3–6 `chars` per group; 4–6 `quiz` items, each `s` containing （　） once, `a` in `opts`, 3–4 opts.

Quality: accurate, age-appropriate, natural sentences, simplified Chinese, British English. No duplicates of `w` within your file.
