# Expanding EXISTING word banks

Children read the word & phrase banks every day, so we are making every bank much bigger. You add content to EXISTING units WITHOUT editing their files, using an `extends` list. Read SPEC.md (block types and string rules) and WB-SPEC.md (reading-first style) in this folder first.

## File format
```js
window.CONTENT_PARTS = window.CONTENT_PARTS || [];
window.CONTENT_PARTS.push({ lang: "en", units: [], extends: [
  { id: "en-feelings", blocks: [ /* new blocks, appended to that unit */ ] },
  { id: "en-nature",   blocks: [ ... ] }
]});
```
- `id` must be an existing unit id (look it up in the existing files). Blocks are appended after the unit's existing blocks.
- A `wordbank`, `settings` or `idioms` block you add is MERGED into the unit's existing block of the same type (its items are added to the same picker / list), so only include NEW items (no repeats of existing names/idioms).
- For new wordbank emotions, add `face` to each item: one of happy, excited, proud, grateful, relieved, surprised, shocked, confused, curious, determined, hopeful, calm, worried, nervous, scared, sad, lonely, disappointed, frustrated, regretful, guilty, embarrassed, jealous, angry, moved, anxious, wronged, shy (pick the closest). `hue` 0–360.
- Give every new block a `title` that makes clear it is new material (e.g. "More ways to show happiness", "Rain: from drizzle to downpour").
- Mostly `chips` blocks: each group has a clear `title`, many words/phrases, an `ex` example sentence a child could borrow, and an optional `note`. `table` and `cards` are fine too. No practice blocks in extensions.
- READ the existing unit first so you add NEW entries rather than repeating what is there.
- Quality: natural, correct, vivid, age-appropriate (Singapore P1–P6; P5–P6 can stretch). English: British spelling; dialogue and example sentences must sound like real people talk (no stiff or old-fashioned phrasing, no forced slang). Chinese: simplified, standard, natural; pinyin with correct tone marks in idioms blocks.
- Validate: `node validate.js <yourfile.js>` from this folder and fix all errors. Reply with only: file path, which units you extended and how many entries you added to each, any issues.
