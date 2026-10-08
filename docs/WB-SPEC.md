# Word-bank expansion brief

The site's home page is now a READING page: children (Singapore primary, P1–P6) browse word & phrase banks every day to absorb vocabulary. You are adding NEW word-bank units. Read SPEC.md (same folder) for the file format and block types, and follow it exactly. Skim the existing bank units so you don't duplicate them: en-banks.js, en-more2.js, en-more3.js (English) or zh-banks.js, zh-more2.js, zh-more3.js (Chinese) — look for units with group "Word banks" / "词语宝库".

## Rules for these units
- `group`: "Word banks" (English) or "词语宝库" (Chinese). Use the exact ids and `order` numbers in your brief.
- Add a `cat` field to each unit (string) — one of: "people" (feelings, faces, body, character), "places" (settings, nature, weather, senses), "actions" (movement, speech, sounds), "words" (better word choices, adverbs, word pairs, four-character words, synonyms/antonyms), "phrases" (similes, golden lines, transitions, sentence-level phrases), "idioms" (idioms, proverbs, sayings), "topics" (topic vocabulary such as Singapore life).
- These are for READING. Build each unit mostly from `chips` blocks: give every block a `title`, and every chips group a clear `title`, the words/phrases, and an `ex` example sentence showing one of them in use (a sentence a child could copy into a composition). Add a short `note` where it helps (when to use, a nuance).
- Also allowed: `text`, `tip`, `table` (e.g. word → meaning, or plain → vivid), `idioms` (for idioms/sayings: Chinese MUST have correct tone-marked pinyin; English `py` = ""), `cards` (for a few worked examples), `settings`.
- Optionally end a unit with ONE small practice block (`mcq`, 6–10 items) — reading comes first.
- Volume: hit or exceed the entry counts in your brief (count every word/phrase). Quality matters as much as quantity: correct, natural, age-appropriate (P3–P6 can stretch), vivid, varied, original. English uses British spelling. Chinese uses simplified characters and standard usage. Singapore context where natural.
- No duplicates within a unit; avoid repeating long lists that already exist in other units.
- Validate: `node validate.js <yourfile.js>` from the folder, and fix all errors. Reply with only: file path, units (id, title, entry count), any issues.
