# Write It Well — picture composition sets

Pupils in Singapore often write a story from a set of 3–4 pictures. You are writing DATA for such picture sets. The pictures are drawn by an illustration kit from a scene description, so you describe each panel as a scene using ONLY the names in `art-vocab.json` (read `ART-SPEC.md` for what each field means and how positions work: scene is 400 wide x 300 tall, ground baseline y = 250, actors' x is their centre).

## File format (plain JS, no backticks)
```js
window.PICSETS = window.PICSETS || [];
window.PICSETS.push({
  id: "ps-wallet",              // unique, lowercase, prefix "ps-"
  level: "B",                    // "A" = P1–P2 (simple), "B" = P3–P4, "C" = P5–P6
  theme: "honesty",              // one word, English
  panels: [                      // 3 or 4 panels, in story order
    { scene: { bg: "hawker", time: "day", actors: [ { who: "boy", x: 140, pose: "walk", face: "happy", skin: "tan", hair: "short", top: "green", bottom: "navy" } ], props: [ { k: "wallet", x: 260 } ], fx: [] },
      en: { q: "Guiding question for this picture (Who? Where? What is happening? How do they feel?)", model: "One or two model sentences describing this picture vividly, past tense." },
      zh: { q: "这幅图的引导问题", model: "一两句生动的参考句子。" } }
  ],
  en: { title: "Story title", plot: "A short paragraph (3–5 sentences) summarising a good story from these pictures, including feelings and a lesson.", words: ["8–12 useful words/phrases"], twist: "One idea to make the story more original." },
  zh: { title: "题目", plot: "3–5句故事梗概，包括心情和感悟。", words: ["8–12个好词好句"], twist: "让故事更有新意的一个点子。" }
});
```
Use double-quoted strings; curly quotes “ ” in English and Chinese punctuation in Chinese. No emoji, no HTML.

## Rules for good picture sets
- The pictures alone must tell a clear sequence: setting/start → problem → turning point/action → ending/feeling. A child should be able to put shuffled panels in order.
- KEEP CHARACTERS CONSISTENT across panels: the same person keeps the same who/skin/hair/top/bottom/uniform in every panel.
- Show feelings clearly with `face` and `fx` (tears, sweat, exclaim, question, hearts, sparkle, thought bubbles with a prop inside).
- Compose clearly: at most 4 actors and 5 props per panel; keep actors apart (x at least ~70 apart) and inside 40..360; put props where they make sense (held items via `hold`).
- Everyday Singapore life, child-safe: no violence, no serious injury, no weapons, no frightening content. Minor accidents (a fall, a spill, a broken vase) are fine.
- Scenes must make sense: weather only outdoors; night uses time "night".
- English: British spelling, past tense models. Chinese: simplified characters, natural, age-appropriate.
- Validate when done: `node validate-pics.js <yourfile.js>` (run from this folder) and fix all errors.
