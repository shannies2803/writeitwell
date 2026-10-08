# Write It Well — content file spec

The site "Write It Well" teaches Singapore primary school children (P1–P6, ages 7–12) to write compositions,
in English and in Chinese (华文, simplified characters). A generic engine renders lesson "units" from data files.
You are writing ONE data file. Do not write HTML pages, CSS or engine code.

## File format (plain browser JS, no modules, no backticks anywhere)

```js
window.CONTENT_PARTS = window.CONTENT_PARTS || [];
window.CONTENT_PARTS.push({ lang: "en", units: [ /* unit objects */ ] });
```
- Use JS double-quoted strings only. Escape any inner `"` as `\"`. In English dialogue use curly quotes “ ” and ’ so you rarely need escapes. In Chinese use Chinese punctuation “ ” ， 。 ！ ？ ： ；
- Strings may contain only these tags: `<b>`, `<i>`, `<br>`, and `<mark class="...">` (essays only). No other HTML.
- No emoji anywhere.

## Unit object
```js
{ id: "en-feelings",          // unique, lowercase, prefix "en-" or "zh-"
  group: "Word banks",        // must be one of the group names for that language (below)
  order: 30,                  // number; sorts units inside the site
  title: "Feelings word bank",// short (2–5 words; Chinese 2–8 characters)
  intro: "One or two sentences telling the child what this lesson is for.",
  blocks: [ /* block objects, rendered in order */ ] }
```
Groups — English: "Start here", "Building blocks", "Word banks", "Techniques", "Practice", "Model essays"
Groups — Chinese: "入门", "基本功", "词语宝库", "写作技巧", "练习园地", "范文欣赏"

## Block types (every block has `type`; optional `title` shown as a sub-heading for any block)

Teaching blocks
- `{type:"text", html:"..."}` paragraph.
- `{type:"tip", html:"..."}` highlighted tip box. Start with a bolded label, e.g. "<b>Tip:</b> ..." / "<b>小贴士：</b>..."
- `{type:"steps", items:[{title, text}]}` ordered sequence (only for real sequences).
- `{type:"cards", items:[{tag, title, text, ex}]}` grid of cards; all fields optional strings; `ex` is shown as an example box; `tag` is a small uppercase label.
- `{type:"avoid", items:["..."], note:"..."}` list of things NOT to write (shown in red) plus a note why.
- `{type:"chips", groups:[{title, words:["..."], ex:"example sentence", note:"short tip"}]}` word lists; `ex`, `note` optional.
- `{type:"table", head:["Instead of","Try"], rows:[["said","whispered, shouted, ..."]], weakCol:0}` `weakCol` (optional) = column index shown crossed-out as the weak word.
- `{type:"mountain", stages:[{title, text, len, q}]}` story-structure diagram; exactly 5 stages; `len` = suggested length, `q` = guiding questions.
- `{type:"wordbank", items:[{name, hue, ladder:[5 words weak→strong], show:[4–6 body-language/action sentences], similes:[2–3], tell:"telling sentence", showEx:"showing rewrite"}]}` emotion explorer. `hue` 0–360 picks the colour (spread them out).
- `{type:"settings", items:[{name, senses:[{label:"See", lines:["..."]}, ...]}]}` place picker with sensory phrases (4–5 senses each, 2–4 lines each).
- `{type:"idioms", items:[{w:"in the nick of time", py:"", m:"just in time", ex:"example sentence", cat:"Time"}]}` filterable by `cat`. For Chinese, `py` = pinyin with tone marks (e.g. "xīng gāo cǎi liè"), `m` = simple Chinese meaning plus " / " short English gloss. English: `py` = "".
- `{type:"essay", title, level:"P5–P6", paras:["html with <mark class=...>"], legend:[{cls:"s", label:"Five senses"}], notes:[{title, text}]}`
  Allowed mark classes: `s` senses, `sh` show-don't-tell, `f` feeling words, `d` dialogue, `c` connectors/transitions, `fig` figurative language / rhetoric, `id` idioms / good phrases. The legend lists only classes used.

Practice blocks (each item answered/revealed earns the child a star)
- `{type:"mcq", title, intro, items:[{q, o:["opt1","opt2","opt3"], a:1, e:"why"}]}` `a` = 0-based correct index. 3–4 options. Vary the position of the right answer.
- `{type:"rewrite", title, intro, items:[{q:"sentence/task", a:"model answer", hint:"optional"}]}` child types own version, then reveals model.
- `{type:"order", title, intro, items:[{words:["weakest",...,"strongest"], hint:"e.g. happy"}]}` child taps words in order weak→strong; give 4–5 words in the CORRECT order (engine shuffles). Must be unambiguous.
- `{type:"fixit", title, intro, items:[{wrong:"sentence with error(s)", right:"corrected", why:"short reason"}]}`
- `{type:"flash", title, intro, items:[{f:"front: word or idiom (Chinese may include pinyin after a <br>)", b:"back: meaning + example sentence"}]}` flashcards; child flips and marks "I knew it".
- `{type:"topics", items:[{title, theme, level, ideas:["plot idea 1","plot idea 2"]}]}` composition question bank. `level` English: "P1–P2" | "P3–P4" | "P5–P6"; Chinese: "低年级" | "中年级" | "高年级".
- `{type:"studio", rubric:[{name:"Content", points:["I answered the question", ...]}], minWords: 150}` timed writing room (engine pulls all topics from this language).
- `{type:"planner", fields:[{id:"who", label:"Who is in my story?", ph:"placeholder example"}], checks:["..."]}`

## Quality bar
- Write FOR the child (simple, warm, direct); examples must be excellent models a teacher would praise.
- Singapore context where natural: HDB flat/组屋, void deck, hawker centre/小贩中心, MRT/地铁, market/巴刹, recess/休息时间, CCA, Mum/Dad/妈妈/爸爸, grandparents, local names (Wei Ming, Aisha, Priya, Jun Hao, Mei Ling 等).
- Do not quote exam mark allocations or name specific exam formats you are not certain of. Do not reproduce any copyrighted text; write everything original.
- Be GENEROUS: the user asked for "much, much more depth". Hit or exceed every quantity given in your brief.
- Chinese: simplified characters only, standard Mainland/Singapore usage; pinyin must be correct with tone marks; age-appropriate.
- Run the validator when done and fix every error: `node /tmp/claude-0/-home-claude/629a7b48-2ed3-5894-89a2-2191c93f2111/scratchpad/wiw/validate.js <yourfile.js>`

- English: use British spelling (colour, realise, favourite, neighbour, practise as verb) as used in Singapore schools.
