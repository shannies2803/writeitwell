# Model essay library — writing brief

Singapore primary pupils (P1–P6) READ these model essays to absorb good language. Each essay must be an excellent, ORIGINAL model a teacher would praise at that level — not preachy, not stiff. They will be shown with colour highlights on key phrases and a "Why this works" panel; highlighted phrases are also collected into a phrase bank.

## File format (plain JS, double-quoted strings only, no backticks, no emoji)
```js
window.ESSAYS = window.ESSAYS || [];
window.ESSAYS.push({
  id: "en-kindness-01",            // "<lang>-<cat>-NN", unique
  lang: "en",                      // "en" or "zh"
  cat: "kindness",                 // your category key (given in your brief)
  level: "P3–P4",                  // English: "P1–P2" | "P3–P4" | "P5–P6"; Chinese: "低年级" | "中年级" | "高年级"
  title: "The Umbrella at the Bus Stop",
  paras: [ "Paragraph 1 with <mark class=\"s\">highlighted phrase</mark> …", "…" ],
  notes: [ { title: "Opening", text: "Why it works…" }, … ]   // 3–5 notes, written for a child
});
```
Allowed tags inside paras: `<mark class="X">…</mark>` only (and `<i>` for inner thoughts). Classes: `s` five senses, `sh` show-don't-tell (actions/face/body showing feelings), `f` feeling words, `d` dialogue, `c` connectors/transitions, `fig` figurative language (simile, metaphor, personification), `id` idioms / good phrases / proverbs. Mark only short phrases or single sentences (not whole paragraphs). Lower level: 5–8 marks; middle 8–12; upper 10–16.

## Lengths
- English: P1–P2 120–200 words; P3–P4 250–380 words; P5–P6 400–550 words.
- Chinese (count Chinese characters only): 低年级 150–260; 中年级 300–460; 高年级 480–720.
- Lower level: short simple sentences, 3–5 paragraphs. Upper: rich vocabulary, varied sentence structures, 5–8 paragraphs.

## Quality rules
- Singapore everyday settings (HDB, void deck, hawker centre, MRT, school, CCA, festivals, parks), multiracial names and characters. Child-safe: no violence, no serious injury/death, nothing frightening; minor accidents are fine.
- Every essay has a clear plot: hook opening → problem → climax (slowed down, feelings shown) → resolution → reflection. VARY openings (sound, dialogue, action, question, setting, flashback, feeling) and endings across your essays; never start with "One day".
- Dialogue must sound like real people talk (contractions, short lines, warm adults; no lecturing morals in speech, no forced slang). Use correct speech punctuation; new paragraph for each new speaker.
- Show feelings through actions, faces, body and senses. Use a few strong idioms/四字词语 naturally — don't stuff.
- English: British spelling, past tense narration (consistent tense). Chinese: simplified characters, natural standard Chinese, correct 的/地/得 and punctuation.
- All plots must be different from each other and from existing model essays (skim titles in en-*.js / zh-*.js essay blocks).

Validate with `node validate-essays.js <yourfile.js>` (from this folder) and fix every error. Reply with only: file path, 10 titles with level and length, any issues.
