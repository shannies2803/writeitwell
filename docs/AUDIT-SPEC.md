# Content audit brief (fix in place)

This site teaches Singapore primary pupils (P1–P6) to write compositions in English and Chinese. Children READ the word & phrase banks and model essays every day and copy phrases straight into their own writing, so every line must be correct, natural and worth copying. The two main readers right now are a P3 boy and a P1 girl, so lower/middle-primary readability matters a lot.

You are auditing ONLY the files named in your brief, as both (a) an experienced Singapore primary language teacher / PSLE marker and (b) a child reader. Edit those files IN PLACE. Never touch any other file.

## What to look for and fix
1. Errors: spelling, grammar, wrong word meaning, an `ex` example sentence that misuses the word or doesn't use a word from its group, wrong table pairings (e.g. "plain → vivid" where the vivid one isn't better), wrong antonyms/synonyms, mislabelled categories.
2. Unnatural language: stiff, old-fashioned, translated-sounding or adult-bureaucratic phrasing; dialogue that doesn't sound like real Singaporean children/parents/teachers talking in standard English (contractions are good; no lecturing). Chinese: 的/地/得 errors, wrong collocations (搭配不当), 病句, unnatural 四字词语 use, wrong or missing tone marks in pinyin, traditional characters slipping in.
3. Clichés and over-the-top lines that teachers mark down (e.g. "my heart was going to explode", piling three similes into one sentence, melodrama for small events). Replace with a vivid but believable line. Keep some classic useful phrases — just don't let them dominate.
4. Child safety & suitability: nothing frightening, violent, romantic, body-shaming, or stereotyping by race/religion/gender. Minor accidents are fine.
5. Duplicates: the SAME phrase repeated inside one unit/group (remove the repeat or replace it with a NEW good entry).
6. American spelling/usage in English (British spelling is required: colour, favourite, realise, mum, neighbour, learnt is fine). "Recess" is correct Singapore school usage — keep it.
7. Model essays only: wrong `<mark>` class (s senses, sh show-don't-tell actions/face/body, f feeling words, d dialogue, c connectors, fig figurative, id idioms/good phrases), notes that describe something not in the essay, tense slips, speech punctuation, paragraphing for new speakers.

## Rules
- Replace, don't shrink: if you delete a bad entry, add a better one in its place. Do not reduce the total volume.
- Keep the data structure, ids and block types exactly as they are. Strings use double quotes; no backticks; no emoji.
- Make edits with careful Python string replacements or the Edit tool; re-run the file through node to be sure it still parses.
- Validate when done: banks `node validate.js <file>`; essays `node validate-essays.js <file>`. Fix every error.
- Reply with ONLY: files audited, number of fixes by type (errors / unnatural / cliché / duplicates / spelling / marks-notes / other), and 8 representative before → after examples. Keep the reply short.
