# Write It Well · 好好写作文

A bilingual (English and 华文) composition-writing site for Singapore primary
pupils, made for Faye and Philip. It is a single HTML file with no server:
open it in a browser and it works. Progress is kept in the browser's own
storage, per device and per learner.

**Live site:** https://philipessaywriting.netlify.app

| File | What it is |
| --- | --- |
| `index.html` | The whole site, built from `src/`. This is what Netlify publishes. |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and the home-screen app icon (built/kept alongside `index.html`). |
| `src/` | The engine, the feature modules and every content file (word banks, essays, spelling lists, vocab & grammar questions, picture stories). |
| `tools/` | Validators and Playwright smoke tests. Not part of the site. |
| `docs/` | Writing briefs and the audit reports used to make and check the content. |

## What's inside

- **Words** – about 27,000 word-bank entries per language (feelings, senses, climax, dialogue, story scenes, festivals, travel, science, P1 first words…), with Find a word, focus mode and a word book.
- **Learn** – step-by-step lessons on planning, openings, endings, show-don't-tell, dialogue, picture compositions and more.
- **Practice** – Today's practice and the Daily 4, 850 model essays with highlights, plot maps and quick checks, picture stories, the writing studio, games, dictation, Look-hide-write, the story spinner.
- **My spelling / 我的听写** – spaced-repetition spelling with tricks for every word, school test lists, mock tests, mistake patterns, Chinese handwriting grids and 形近字 quizzes.
- **Vocab & Grammar / 词语与语法** – 105 topics and about 3,500 questions with explanations, a mistake bank, Daily 10, practice papers, 60-second sprints and printable worksheets.
- **Parent report** – practice calendar, accuracy, weak spots, reward goals and weekly certificates.

## Deploying

Netlify is connected to this repository. Every push to `main` is published
automatically. `netlify.toml` holds the settings (no build command; publish the
repository root).

## Editing

1. Change files in `src/` (content files are plain JavaScript data; see `docs/*-SPEC.md` for each format).
2. Rebuild: `cd src && python3 build.py` – this rewrites `index.html` and `sw.js` (with a new version number, so phones pick up the update).
3. Check (optional but recommended):

```bash
cd src
node ../tools/validate.js en-*.js zh-*.js         # lessons and word banks
node ../tools/validate-essays.js essays-*.js      # model essays
node ../tools/validate-spell.js spell-en-*.js spell-zh-groups.js
node ../tools/validate-vg.js vg-*.js              # vocab & grammar
node ../tools/validate-pics.js picsets*.js        # picture stories
node ../tools/check-built.js                      # the built page's scripts parse, no duplicate ids, no outside scripts

cd ../tools
npm install && npx playwright install chromium    # once
npm test                                          # all of the above in one go
npm run test:all                                  # plus a real-browser check on a 375 px phone screen
python3 smoke6.py; python3 smoke7.py; python3 smoke17.py   # older visual smoke tests (Python Playwright)
```

GitHub runs `npm run test:all` on every push and pull request, and also rebuilds
the site from `src/` to make sure the committed `index.html` is up to date.

4. Commit `src/` **and** the rebuilt `index.html` and `sw.js`, then push.

After the first visit the site works offline (a service worker saves it), and phones show an "Update now" button when a new version is pushed.

Keep the site a single file with no external dependencies, so it keeps working
on a school iPad with a weak signal. (The pinyin library ships with the site in `vendor/`, MIT licence. Only the
Google Fonts load from the web, and the page falls back to system fonts without them.)
