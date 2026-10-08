# Round 3 new word banks — extra notes (read WB-SPEC.md and SPEC.md first; they still apply)

The two children who use the site most are in P1 and P3. The P3 boy LOVES reading phrase banks and copying good lines into his writing, but his compositions are weak, so banks must be (1) organised the way a child plans a story, (2) full of lines he can lift straight into a composition, and (3) natural, not purple. Mark harder entries for upper primary in a group `note` where helpful.

Use exactly the unit id, file name, `order` and `cat` in your brief. Group "Word banks" (English) / "词语宝库" (Chinese).

Before writing, grep the existing bank files (en-*.js or zh-*.js) for your topic so you add NEW material rather than repeating long existing lists.

Quality bar (an audit of existing banks found these problems, avoid them):
- Over-the-top lines for small events ("my heart was going to explode"). Keep it vivid but believable.
- Stiff or translated-sounding dialogue. People in Singapore speak warm, natural standard English / 普通话: short lines, contractions, interruptions; adults don't lecture.
- Clichés stacked together. One strong image per sentence.
- English: British spelling. Chinese: simplified characters, correct 的/地/得, correct tone-marked pinyin in idioms blocks.
- Every chips group needs an `ex` sentence that really uses one of its entries.

Volume: meet or beat the entry counts in your brief (count each word/phrase/sentence).
Validate: `node validate.js <file>` and fix every error. Reply ONLY with: file path, units (id, title, entry count), any issues.
