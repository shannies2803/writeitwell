# Child-user audit — Write It Well (preview.html, 6 Oct 2026)

Personas: **Mia, P1 girl, 7** (slow reader, loves animals and performing) and **Jun, P3 boy, 9** (weak writer, loves word banks, music, chess, robotics, science). Both tested in English and 华文, mostly at 390×860, quick check at 1280.
Tools: Playwright/Chromium. Learners created via "Add a learner" (Mia = P1, Jun = P3), plus guest.

**Technical summary:** no `pageerror` JS errors on any route. No page-level horizontal scroll at 390 or 1280. The only console error is the blocked Google Fonts request, which is harmless. Main technical issues: tables that scroll sideways inside themselves, small tap targets (30px), and history/back behaviour (see P1-12).

---

## P0 — broken, or a child gives up

1. **Today's 10 shows the answer before the child tries** — `#en-today`, Today's 10 card, "Tenses in stories" / "fix the mistake" items. The green **MODEL ANSWER** box ("When I reached the hall, the concert had already started. Why: …past perfect") shows under the empty "My correction" box before Check is pressed. *Child:* "I'll just copy the green one." The practice is useless and the star is free. **Fix:** hide the model-answer block until Check is pressed, or put it behind a button labelled "Show me the answer" (same as the warm-up items, which already use "Show model answer").

2. **Dictation does nothing when the device has no voice** — `#en-dictation` → Start dictation → "▶ Play" (same on `#zh-dictation`). With no speech voice installed (the headless test had `speechSynthesis.getVoices().length === 0`; many school Chromebooks and Android tablets have no Chinese voice), Play makes no sound and gives no message. The child types a guess and gets "Not quite. The answer is temperature". *Child:* "It's broken / I'm stupid." **Fix:** if there are no voices for the language, show a banner instead of starting: "Your device can't read words out loud. Ask a grown-up to turn on a voice, or play with a partner who reads the words to you." Do the same for "Listen", "Read along" and "▶ Hear".

3. **Look, hide, write hides the sentence after about 4.5 seconds** — `#en-memo` / `#zh-memo`. The blue bar runs out and the sentence vanishes. Mia had only read "My stomach dropped," when it disappeared. *Child (P1):* "I didn't finish reading!" → gives up. **Fix:** no auto-hide for P1–P2 (the child taps "I'm ready – hide it"), or allow at least 1.5 s per word with a minimum of 12 s. Add a "Show it again" button on the writing step. Pick P1 sentences from `en-firstwords` / `zh-chuxue` ("My legs shook.", "我高兴得跳了起来。"), not "My stomach dropped, and I gripped the edge of my desk."

4. **The header pinyin button does nothing on the P1 Chinese bank** — `#zh-chuxue` (also most zh banks and the "今天试用这 5 个词" chips on `#zh-home`). The bank has no pinyin at all (`rt` count = 0), and the big "拼音" button in the header changes nothing visible. A P1 child can't read 兴高采烈, 眼泪汪汪 or 火冒三丈. *Child:* taps 拼音, nothing happens, gives up on 华文. **Fix:** in `zh-chuxue` (and the try-today chips, Today's 10 and memo when the level is P1–P2), render ruby pinyin over every chip and example sentence, on by default. If a page has no pinyin, hide the 拼音 button there instead of showing a dead control.

## P1 — important

5. **The P1 learner still gets P5–P6 words on Home** — `#en-home` "5 words to try today" for Mia (P1): "a dull ache in my stomach", "unconditional love", "prefect", "could barely swallow"; for guest: "loathe", "nit-picking". On `#zh-home`: 沾沾自喜, 敢作敢为. "Use at least two of these in your next story" is impossible for her. **Fix:** pick these from the learner's level (P1–P2 from `firstwords`/`chuxue`). Change the instruction for P1–P2 to: "Pick one word. Say a sentence with it out loud."

6. **Today's 10 isn't really "for your level" at P1** — `#en-today` as Mia: spelling "necessary"; picture composition with "the sky had turned the colour of a bruise"; "Describe the moment just before a race starts"; Stronger Word asks for "petrified". Dictation word 1 for P1 is "temperature". **Fix:** filter every Today's 10 source, games and dictation lists by `level`. Add P1 spelling lists (said, because, friend, there, they).

7. **The model answers and explanations use grammar words a child doesn't know** — Today's 10 "Why: …so use the past perfect"; essay pop-ups and quiz labels "Figurative language", "Connectors", "Idioms & good phrases"; studio "check your work against the rubric". **Fix:** use kid wording, for example "Why: The concert started *before* I got there, so we write **had started**." Rename the tags for P1–P4: Figurative language → "Picture words (like…, as…as…)", Connectors → "Joining words", Idioms & good phrases → "Golden phrases", Five senses → "See, hear, smell, taste, touch". Replace "rubric" with "checklist".

8. **The essay Quick check is too abstract for P1** — `#en-essays` essay → Quick check: "Which kind of good writing is each coloured phrase?" with three jargon buttons. When the answer is right the button turns green, with no star and no "Well done". **Fix:** for P1–P2, ask "What does this phrase help you do?" with picture options 👀 "see it" / 💬 "someone talks" / 😊 "a feeling" / 🔗 "joins ideas". On a correct answer show "Yes! ⭐" and animate the star counter.

9. **Quotes are doubled in the Quick check** — zh essay "机器人同学小铁" Quick check shows `““阿杰，开心是什么感觉？我的资料里找不到。””` and `““哐当””`. The code wraps a phrase in “ ” even when it already has quotation marks. **Fix:** strip leading and trailing “”"" before wrapping, or don't wrap `mark.d` dialogue phrases. Check EN dialogue marks too.

10. **The tap-a-phrase pop-up doesn't show the phrase and repeats its title** — essay `article.essay mark` → `.mpop`: "Show, don't tell / Show, don't tell: actions, faces and bodies…". The box covers the next two lines of the story, and Escape doesn't close it. **Fix:** make the pop-up title the tapped phrase in bold ("smiled so widely that his eyes almost disappeared"), with a small tag line under it ("Show, don't tell — shows a feeling with the face or body"). Close it on Escape and on a tap outside, and position it below the phrase so it doesn't hide the line being read.

11. **Climax and dialogue tables hide the good column** — `#en-climax` "Flat climax or tense climax?" (also tables on `#en-firstwords`, `#en-dialogue`, `#zh-chuxue`, `#zh-gaochao`). At 390 the table is 437px wide inside a sideways scroller. The struck-through FLAT column takes half the width and the TENSE column (the one to copy) is cut off mid-word ("The cake began to sl…"). Children don't know to swipe sideways. **Fix:** below 600px, stack each row as a card: grey "Instead of: ~~I dropped the cake.~~" then bold "Try: The plate tilted…". Never scroll a table sideways.

12. **Back from an essay leaves the library** — opening an essay keeps the hash `#en-essays`, so the phone/browser Back gesture goes to Home and loses the child's place 1,500px down the list. The same happens with games (`#en-games` while a game is open). **Fix:** give each essay and game its own hash (`#en-essays/en-kindness-03`, `#en-games/idiom`) and restore the scroll position when returning to the list.

13. **There are 22 topic pills before the first essay** — `#en-essays` / `#zh-essays`. On a phone the child scrolls about 1.5 screens of pills (plus intro, progress bar and search) before seeing any story. 132 cards then follow in one list. **Fix:** put the pills in one horizontally scrolling row (or a "Choose a topic ▾" button). Show 3 "Picked for you" essays first (by level, and by interest, e.g. Animals & pets / Music & performing for Mia, Science & discovery for Jun), then page the list 20 at a time.

14. **The phone header takes 40% of every first screen** — every route at 390. "COMPOSITION NOTEBOOK / English 华文 / Write It Well / Starter bar / 40 more stars to Explorer…" uses about 345px before any content, on every page. **Fix:** on phones, after first load, shrink it to one 56px row: logo · EN/华文 · A−/A+ · ★. Show the big title only on `#*-home`.

15. **Studio isn't adjusted for P1** — `#en-studio` as Mia: timer 35:00, "aim for at least 150" words. Phrase helper suggests "Years from now, I know Aisha will still be the first person I tell my good news." and "The notes of encouragement in my desk had been from Wei Ming all along." **Fix:** for P1–P2, default to 15 min and "aim for 40–60 words (about 5 sentences)". Fill the Phrase helper from `firstwords`. Rename the "How to use the timer" box to "How to write in 15 minutes: 1 Think 2 Write 3 Check".

16. **Games start with Idiom Match** — `#en-games` / `#zh-games`: Idiom Match (成语配对) is first. For a 7-year-old, "a storm in a teacup" and "have a sweet tooth" mean nothing. **Fix:** order by level. For P1–P2 show Feelings Match and Sense Sort first, and label Idiom Match "P3+". Add a picture/emoji to each feelings card.

17. **The feelings picker has 50 identical tiny faces and the heading says 24** — `#en-feelings` "24 feelings to explore" shows 50 chips. The 20px faces all look the same, and the list includes Insulted / Betrayed / Wronged / Rejected / Nostalgia for P1. Tapping a feeling shows its words *below* all 50 chips, so the child sees nothing change. **Fix:** change the heading to "50 feelings to explore". Show the 8 basic feelings (happy, sad, angry, scared, excited, proud, worried, surprised) as big coloured face buttons first, with "More feelings ▾" for the rest. After a tap, scroll to the chosen feeling's card.

18. **The feelings page is 84,000px long (about 98 phone screens)** — `#en-feelings` lists all 52 "More ways to show…" sections at once, with no table of contents. Jun likes banks, but he can't find "excitement" again. **Fix:** collapse each "More ways to show X" into a `<details>` (closed by default) and add a sticky "Jump to feeling ▾" select. Apply the same to `#en-home` (26,800px) and `#zh-home`.

19. **The P1 bank is hard to find** — `#en-home` "Explore every word bank": "First words for young writers (P1–P2)" is card 28 of 50 (`#zh-home`: 低年级好词好句 is card 28). The same goes for the interest banks Jun would love ("Science, robots and discovery", "Music, dance and the stage" are near the end). **Fix:** when the learner is P1–P2, pin First words to the top as "Start here, Mia! ✏️". Add a "Banks you might like" row (Animals, Performing for Mia; Science & robots, Music, Sports & games for Jun).

20. **The "Listen" buttons and number dots are too small for small fingers** — "▶ Listen" 83×30, Today's 10 question dots 30×30, quiz page numbers 30×30, the library "read" checkbox 13×13, studio checkboxes 20×20, `a.srcl` source link 14px tall. **Fix:** make every tap target at least 44×44 (pad the dots to 40px with 4px gaps and make the checkbox 24px with a 44px label hit area).

21. **Small all-caps labels are hard for a slow reader** — the eyebrow labels "WORD OF THE DAY", "KINDNESS & HELPING · P1–P2 · 197 WORDS", "SENTENCE 1 OF 5", "MODEL ANSWER" are 12px uppercase with letter-spacing (158 such 12px nodes on the library page). **Fix:** use at least 14px sentence case ("Word of the day"). Drop "197 words" from cards for P1–P2 and show a reading time instead ("2-minute read").

22. **The ▶ button with no label next to "I'm ready – hide it"** — `#en-memo`. Mia doesn't know the square ▶ means "read it to me". **Fix:** label it "▶ Hear it" / "▶ 听一听".

23. **The Lessons drawer has no close button** — `☰ Lessons` opens a full-height list of about 100 items. Escape doesn't close it, there's no ✕, and while it's open the bottom-nav "Learn" tap is blocked. *Child:* "How do I get out?" **Fix:** add a "✕ Close" button at the top right of the drawer. Close it on Escape, on a tap outside, and on any bottom-nav tap.

24. **The intro in the Dialogue lines bank is teacher-talk** — `#en-talk` starts with "Speech punctuation in four rules: (1)…", and "Reflections and endings that don't preach" says "Endings that lecture (…) lose marks". A 9-year-old doesn't know "preach" or "lecture" in this sense. **Fix:** rename it "Endings that don't sound like a lesson", with the blurb "Show what you learnt — don't just say 'I learnt my lesson.'"

25. **The tables of contents use the ¶ symbol** — Plot map rows "¶1 The corridor outside…". Children don't know ¶. **Fix:** use "Para 1" / "第1段".

26. **The Plot map opens off-screen** — essay → "Plot map": the map appears below the tag legend and the button scrolls the page up a little, so the map is out of view and the child thinks nothing happened. **Fix:** after toggling, scroll it into view with `scrollIntoView({block:'start'})`.

27. **The Plot map's labels for P1 essays don't match the story** — "Mr Tan's Thirsty Plants": "Climax ¶5 Every morning before school, I filled my green watering can." This is calm, not a climax, which confuses the "story mountain" idea. **Fix:** check the plot labels on P1–P2 essays, and call ¶5 here "Problem" or "Build-up". For P1–P2 use simpler stage names: Beginning / Problem / What I did / Ending.

28. **"Hide highlights" looks like the main button** — essay toolbar: "Hide highlights" is solid blue (primary), while "Read along" is outlined. Mia taps the big blue button first and all the colours disappear. **Fix:** make "▶ Read along" the solid primary button and "Hide colours" an outline button. Rename it "Hide colours" / "隐藏颜色".

29. **The first-run screen asks for "Primary level"** — the "Who's practising?" overlay defaults to P3, and the label "Primary level" is fine for a parent. But a P1 child who taps "Add" without changing it gets P3–P4 content everywhere. **Fix:** make the level buttons big (P1…P6, with no preselection) and require a tap before Add. Add the line "Ask a grown-up if you're not sure."

30. **The A+ button doesn't enlarge the intro paragraphs** — A+ raises `--fz` (chips 14.4 → 18px), but `#main p` stays at 17px. **Fix:** set paragraph sizes in rem/`calc(var(--fz)*…)`.

## P2 — nice to have / delight

31. **A sad P1 Chinese example** — `#zh-chuxue` 难过 card: "我的小鱼死了，我伤心极了。" An animal-loving 7-year-old may be upset by this. **Fix:** "我的气球飞走了，我伤心极了。"

32. **The Impatient face looks angry** — Home "Feeling of the day: Impatient" shows gritted teeth and frown lines, the same as Angry. **Fix:** draw a tapping-foot or looking-at-clock face, or use an emoji.

33. **Interest banks are good but hidden** — "Science, robots and discovery", "Music, dance and the stage", "Sports, games and Sports Day" exist, and essays like "Our Classmate B7", "Checkmate at the Void Deck", "机器人同学小铁" and "小兵变皇后" are exactly what Jun wants. Let the learner pick 2–3 interests at sign-up ("I like: 🐶 animals 🎭 performing 🎵 music ♟️ chess 🤖 robots 🔬 science") and use them for Essay of the day, Picked-for-you and spinner choices.

34. **"Find a word" ranks results badly** — `#en-find` "music" → first hit is "Feeling unwell, clinics… The dentist: soft music playing from a speaker"; "robot" → first hit is "Character and appearance". **Fix:** rank bank titles and headings that contain the term first (e.g. "Music, dance and the stage").

35. **Spinner prompts can be too hard for P1** — `#en-spinner`: "Twist: the 'villain' was trying to help all along"; zh "意外：原来'坏人'一直在帮忙". **Fix:** for P1–P2, offer simpler twists ("it was the dog all along!", "原来是小猫干的！") and fewer wheels (Who / Where / Problem).

36. **The spinner is a list of cards, not a wheel** — kids expect spinning. Add a 1-second slot-machine flicker animation on each card and a "ding" sound. That alone would delight both children.

37. **Saving a word shows a toast that covers chips** — "Saved to your word book" sits over the next card's chips for about 2s, and "word book" is never explained. **Fix:** show a small toast at the top and a "📒 3" counter on the Guest/Mia button. Make the first-time toast say "Saved! Find it in My word book (tap your name)."

38. **Tapping a word chip doesn't read it aloud** — on P1 banks, Mia wants to hear the word. **Fix:** at P1–P2, tapping a chip speaks it and saves it; long-press only saves.

39. **Today's 10 doesn't celebrate** — after a correct answer the dot becomes ★ but there is no sound or animation. **Fix:** add a confetti burst and "3 in a row! 🔥" messages. For children this age, visible rewards and streaks are the main reason to come back.

40. **Dark lines in the Studio textarea don't line up with the text** — `#en-studio` notebook lines sit about 4px below the baseline, so the text looks "crossed out". **Fix:** match `line-height` to the background-size of the ruled lines.

41. **The "abc" icon is glued to the text in the drawer** — Lessons drawer shows "abcSpelling lists". **Fix:** use an icon element or add a space.

42. **"Starter → Explorer" levels aren't explained** — header: "40 more stars to Explorer · Earn a star today to start a streak". Children like ranks but don't know how to get stars. **Fix:** make the badge tappable to show "Get stars by: reading an essay ⭐, playing a game ⭐, Today's 10 ⭐".

43. **1280 desktop shows "I was very scared → My legs turned to jelly…" in the hero, but phones don't** — this is the best "aha" moment on the site. **Fix:** show it on phone Home too (it can replace the large title).

44. **Picture stories at P1: good** — the four-panel pictures are clear and friendly, and "Our Little Garden" and "The Forgotten Goldfish" suit Mia. Keep them, and consider putting "Picture of the day" *above* "My learning path" for P1, because it's the most inviting thing on Today's page.

45. **Things that work well (keep)** — the First words bank (short ladders, "Show, don't tell" body chips like "I hugged my teddy bear."). The library defaults to the learner's level. "Tap again to clear" protects Studio writing. Memory-card Idiom Match is fun for P3+. "Nice try! The answer is…" feedback is kind. The essays are local and relatable (void deck, kaya sandwich, Ah Ma). No JS errors and no page-level horizontal scroll at 390 or 1280.
