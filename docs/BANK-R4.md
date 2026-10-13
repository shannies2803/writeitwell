# Round 4 new word banks

The children (P1 girl, P3 boy in Singapore) have now READ MOST of the existing banks and keep asking for more. This round adds 10 brand-new ENGLISH topics (the children use the English side far more; ignore the ZH column, those are for later). Read SPEC.md, WB-SPEC.md and BANK-R3.md in this folder first; all their rules apply (file format, block types, chips groups with `title` + words + `ex` + optional `note`, British spelling, simplified Chinese, correct tone-marked pinyin in idioms blocks, natural not purple, no duplicates).

Run the validator from the `src` folder: `cd /home/claude/writeitwell/src && node ../tools/validate.js <yourfile.js>` and fix every error.

## The 10 topics this round (so you know what the others are writing; stay in your lane)
| EN id | ZH id | order | cat | Topic |
|---|---|---|---|---|
| en-helping | zh-bangzhu | 105 | topics | Kindness & helping: helping strangers, volunteering, CIP, caring for the elderly, small kind acts, thanking |
| en-accidents | zh-yiwai | 106 | topics | Accidents & emergencies: falls, cuts, getting lost, fire drills, power cuts, calling for help, first aid, rescues, staying calm |
| en-mystery | zh-shenmi | 107 | phrases | Mystery & suspense: night, darkness, strange noises, shadows, clues, creaky doors, building tension, the twist and the (often funny) reveal |
| en-fantasy | zh-huanxiang | 108 | topics | Imagination & fantasy: magic, dragons, time travel, space, shrinking, talking animals, robots, dreams, portals, superpowers |
| en-gadgets | zh-keji | 109 | topics | Gadgets & screens: phones, tablets, games, video calls, online learning, screen time, AI helpers, coding, robots at home, cyber-safety |
| en-getaround | zh-chuxing | 110 | places | Getting around the city: MRT, buses, taxis, cycling, walking, traffic, queues, crowds, HDB void decks, road safety, rain on the way |
| en-choices | zh-pinde | 111 | people | Values & choices: honesty, temptation, owning up, saying sorry, keeping promises, responsibility, peer pressure, courage to do right, forgiveness |
| en-funny | zh-gaoxiao | 112 | phrases | Funny moments: laughing (many kinds), clumsy mishaps, silly mix-ups, jokes, pranks (kind ones), embarrassing-but-funny moments, comic timing |
| en-timewords | zh-shijian | 113 | words | Time words & pacing: times of day, how long things took, suddenly / gradually, before-after, waiting, slow motion, time flying, story-time connectors |
| en-colours | zh-yanse | 114 | words | Colours, shapes, sizes & textures: shades of colours, light and shine, shapes, big/small, heavy/light, soft/rough, patterns, materials (great for P1 too) |

## Requirements
- Exactly ONE unit in your file with the id, `order`, `cat` from the table; group "Word banks" (en) or "词语宝库" (zh); a short child-friendly `title` (zh title in Chinese) and `icon` like other bank units use (copy the field pattern from an existing bank unit such as en-wb14.js / zh-wb14.js).
- Volume: at least 650 entries (count every word/phrase/sentence), across 12–20 chips groups / blocks. Organise it the way a child plans a story: words → phrases → ready-to-borrow sentences → a short "plain vs vivid" table → (optional) idioms block → one small mcq (6–10 items) at the end.
- Include P1-friendly easy groups early (mark with a `note` like "Easy – P1/P2") and stretch groups later (note "P4 and up").
- Many lines a child can lift straight into a composition. Singapore context where natural (HDB, MRT, hawker centre, recess, CCA, grandparents speaking a little dialect, etc.).
- grep existing banks (en-*.js or zh-*.js) for your topic first so you add NEW material.
- Reply ONLY with: file path, unit id, title, entry count, any issues.
