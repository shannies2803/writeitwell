# Expert audit: English composition content (Write It Well)

Auditor's viewpoint: Singapore primary English composition specialist (PSLE marking, teacher training).
Scope: English lesson units (en-basics, en-more1–4, en-banks), word banks (en-wb*, en-x*, en-p1/p2; sampled), 400 English model essays (42 read in full across P1–P6 and all round files, plus the 25 essays inside units). Engine and feature files were not touched.

All edited files pass `node validate.js` (139 English units, including the new file) and `node validate-essays.js` (400 essays).

---

## 1. Strengths

- **The core method is sound and current.** Read the question → plan (story mountain, 5W1H) → hook opening → show feelings → slow the climax → ending with meaning → check. Content and Language are explained separately ("What markers look for"), which matches how compositions are marked in Singapore schools.
- **Excellent technique lessons for P4–P6:** pacing (summary vs scene), flashbacks, mood, zooming in on detail, originality ("third-idea trick", cost of a choice), suspense, sentence patterns with correct inversion rules (Hardly… when / No sooner… than / Only when… did I). The grammar, punctuation and tense lessons are accurate and use the errors Singapore pupils actually make.
- **Situational writing** is taught properly with PAC, formal/informal tone, every content point ticked off, and six full models (proposal, neighbour letter, invitation, complaint, thank-you note, report).
- **Model essays are genuinely good.** Singapore settings, multiracial names, natural dialogue, believable child-sized problems, varied openings and endings, little preaching. Notes panels almost always teach a transferable move (planted detail, circle ending, slowing the climax, showing fear through hands/face), not just praise. I found no unsafe content and very few language slips.
- **Word banks** are rich, British-spelt, organised by story need (faces, body language, speech, scenes, climax, reflections) and full of liftable sentences.

## 2. Problems found

### A. Pedagogy and coverage (most important)

1. **Picture-series compositions were not taught, and the advice given was wrong for P1–P4.** The only picture lesson (`en-picture`) teaches PSLE-style picture *ideas* ("you only need to use one picture", "never squeeze in every picture"). In lower and middle primary the usual format is a picture *series* that tells one story in order, often with helping words, where every picture must be used in order. The P1 and P3 learning paths both send children to `en-picture`, so a P3 boy would have been told to leave pictures out. **Fixed** (see 3A) and a new lesson added (`en-picseries`).
2. **No true beginner lesson for P1.** Path A starts with "Six steps to a great story" (50-minute timing, markers' criteria, story mountain) and then the PSLE picture lesson. Nothing teaches what a sentence is (capital letter, full stop, who + did what, finger spaces), how to grow a sentence, or how to make a 3-part story of four to six sentences. **Added** `en-firststory`.
3. **Model length vs level.** P1–P2 library essays average about 185 words; P3–P4 average about 320 (many 330–380). They are fine as *reading* models, but they are far longer than a P1 child or a weak P3 child can write, and there was no shorter "you can do this" model. The new units include 70- and 95-word P1 models and a 264-word P3 picture-series model. (More are recommended, see 4.)
4. **Some ordering issues in the engine's level paths** (see 4.2): Path B (P3–P4) omits Punctuation and the step-by-step Walkthrough; Path A includes PSLE-level material early.

### B. Accuracy

- Picture-question format (above): corrected in four places, with the instruction to "always follow the instructions on your own paper" so nothing over-claims.
- "Dear Sir or Madam → Yours faithfully" was taught as a hard error rule. It is the traditional British pairing, but many Singapore teachers accept "Yours sincerely" in formal emails; softened so children are not told a correct close is wrong.
- Pacing word budget (en-pacing) left out the solution stage; corrected.
- No grammar or punctuation rule errors were found in the grammar, tense, punctuation, dialogue, patterns, spelling or proofreading units. Exam statements are appropriately general (no mark allocations).

### C. Plot logic and model quality

- **Walkthrough essay (en-walkthrough):** the climax "solved" the lost-boy problem with a bus number ("He wants to take bus 315!"), which does not actually help find his family, yet the notes praised it as the key that solves the puzzle. Rewritten so the planted toy bus carries a label with his grandma's phone number, which the station officer calls. Plan cards, paragraph texts, tips, essay paras and notes all updated consistently.
- en-unexpected-04: an elderly lady "sat on her shopping bag" full of vegetables → "leaned against the wall".
- **Near-duplicate plots in the P1–P2 library** (children read many of these in a row): two Marina Barrage kite stories with the same foot-stamping moment, two salt-instead-of-sugar stories, two lost-tooth-at-breakfast stories. Three essays rewritten with fresh plots (same ids, categories, levels).
- Contradictions with the site's own advice: a warm-up model ending and a word-swap example used "From that day on, I never…", which `en-original` teaches is a tired, too-neat ending; "Six steps" used two stacked clichés as its show-don't-tell model; First Words offered "Once upon a time," and "I woke up early because" as story openers, which `en-openings` lists as openings to avoid. All fixed.

### D. Word banks

- Content is accurate; the earlier audits did good language work. Sampled feelings, word swap, idioms (55 entries checked), first words, vocab quiz, sport, situational phrases.
- Fixed: First Words "angry" ladder was out of order (angry before annoyed); British/Singapore usage ("our jumpers were the goalposts", a street soccer court "at the void deck", "cotton candy", "fish sticks").
- Main issue is **findability**, not quality: there are about 75 English bank units. The bank a P1 child needs most (`en-firstwords`) sorts near the bottom, and nothing tells a P3 child which banks match the stage of the story he is writing. This needs engine work (see 4.4).

## 3. What I fixed (counts and examples)

| Type | Count | Examples |
|---|---|---|
| Exam-format accuracy (picture series vs picture ideas) | 7 edits in 2 files | en-question Type 2 card; MCQ "minimum you must do" now says "Upper primary… pictures as ideas"; en-steps step 1; en-picture intro, opening text and "one picture or many" step |
| Plot logic | 2 essays (10 string edits) | Walkthrough: "He wants to take bus 315!" → label under the toy bus with grandma's number; lady no longer sits on her vegetables |
| Duplicate plots replaced | 3 essays | en-outings-21 "The Kite That Would Not Fly" → "The Upside-Down Leader" (zoo map upside down, finds the pygmy hippo); en-daily-21 tooth in kaya toast → "The Sock with No Partner"; en-mistakes-11 salt pancakes → "A Mountain of Bubbles" |
| Consistency with own teaching (clichés, preachy endings, banned openers) | 5 | warm-up ending → "Now, before I leave the house, I pat my pocket twice…"; "Once upon a time," → "Splash! I jumped into the pool." |
| Over-strict or incomplete rules | 2 | "Yours faithfully" rule softened; pacing budget now includes the solution |
| Localisation / British usage | 5 | jumpers → school bags as goalposts; cotton candy → candy floss (×2); fish sticks → fish fingers |
| Ladder order | 1 | grumpy, cross, annoyed, angry, furious |
| Reference list | 1 | titles-en.txt updated for the three new essays |

### New lesson units: `en-expert.js` (please add to the build)

1. **`en-firststory` "My first stories"** (group "Start here", order 9). For P1–P2: what a sentence is (4 rules), growing a sentence in 4 steps, a 3-part story, story helpers (order words, feeling sentences, joining words), two short marked-up models ("The Big Puddle", 70 words; "Ah Ma's Heavy Bag", 95 words), things to avoid, a 6-question MCQ, 8 capital/full-stop fix-its, 6 grow-the-sentence rewrites, and 3 three-part story tasks.
2. **`en-picseries` "Picture series stories"** (group "Start here", order 12.5). For P2–P4: what a picture series is, seven steps (look at all, name who/where/when, find the problem picture, read faces, fill the gaps, use helping words, write past the last picture), one picture = one paragraph, a worked example with four described pictures and six helping words, a marked-up model ("The Tower of Tins", 264 words, every picture and helping word used), gap questions, avoid list, 6 MCQs and 6 picture-to-story rewrites.

Both use existing group names and block types, unused ids, British spelling, no backticks/emoji; validated.

## 4. Recommendations I could not do myself (app/engine)

1. **Build:** add `en-expert.js` to the `files` list in build.py (anywhere among the en-*.js unit files, before the essays).
2. **Level paths (engine.html line ~1229):**
   - Path A (P1–P2): start with `en-firststory`, `en-picseries`, `en-picstories`, then openings, feelings, senses… Move `en-steps` later and remove `en-picture` (it is PSLE picture-ideas material).
   - Path B (P3–P4): insert `en-picseries` right after `en-plan` (keep `en-picture` after it), add `en-punctuation` after `en-dialogue`, and add `en-walkthrough` before the model essays.
   - Path C: optionally keep `en-picseries` out.
3. **Icons:** add `firststory:"pencil"` and `picseries:"pictures"` to ICONMAP.
4. **Word bank findability:** a search box across all banks; level badges (P1–P2 / P3–P4 / P5–P6) on units or groups; a "by story stage" view (opening, problem, climax, ending, reflection) that pulls the matching groups; show `en-firstwords` first for a P1 learner; for Path A, show a short "starter" set of banks instead of all 75.
5. **Writing studio:** `minWords: 150` applies to everyone. Make the word target follow the learner's level (much lower for P1–P2), and add a picture-type choice in the brief ("series: use every picture in order" / "ideas: use at least one"). Consider grouping the rubric into the two marking strands children hear about at school, Content and Language, with Organisation under Content and Accuracy under Language.
6. **Picture stories practice (picstories):** add one line of instruction that a series is used in full and in order, and show the helping words before the child writes.
7. **Essay library:** default the level filter to the learner's level and show each essay's word count. Add 10–15 shorter P3 "starter" models (180–250 words) and 10 P1 micro-stories (50–100 words); most P3–P4 models are 300–380 words, which is a stretch target, not a starting point.
8. **Remaining near-duplicates for a future content round:** en-family-35 and en-unexpected-35 (both a grandfather at a hawker stall's last day); en-school-21 and en-unexpected-11 (both a loose tooth at a meal); en-school-01 and the "My First Day at School" model in en-models3 (both a new friend with a gap in her teeth); the class hamster "Biscuit" recurs across lessons and the library.
9. **Content vs language self-check:** a short P3-level "check my story" card in the studio (Did I use every picture? Is the problem the longest part? Did I say how I felt? Capital letters and full stops?) would help weak writers more than the full 20-point rubric.
