# Write It Well — illustration kit spec

The site teaches Singapore primary pupils (ages 7–12) composition writing. All pictures are ORIGINAL vector art drawn in code (SVG strings built by JS), because the site is one self-contained HTML file (no external images allowed). Never copy or imitate any known character, brand or artwork.

Exact vocabulary (names for backgrounds, poses, props, etc.) is in `art-vocab.json` in this folder. Every name listed there MUST be supported by the kit; content authors may ONLY use those names.

## Art style (shared by everything)
- Flat, friendly picture-book look. Rounded shapes, soft corners, gentle 2.5px outlines in ink `#2B2D42` (round joins/caps). No gradients needed (if used, ids must be unique per SVG).
- Characters: cute chibi-ish proportions (head about 1/3 of body height) so faces read clearly at small sizes. Big readable expressions: eyebrows + eyes + mouth, plus blush/tears/sweat as needed.
- Palette (warm, Singapore-sunny): sky `#BFE3F5`, grass `#9ED48B`, floor wood `#E9C99A`, tiles `#E6E1D6`, wall cream `#F6EFDF`, HDB wall `#F2E2C4` with accent stripes `#E58F65`, ink `#2B2D42`, red `#E5534B`, orange `#F2994A`, yellow `#F6C343`, green `#4CAF7A`, teal `#2BA6A0`, blue `#3E7CD6`, navy `#24407A`, purple `#8A6BD1`, pink `#F28DB2`, white `#FFFFFF`, grey `#9AA3B5`, brown `#8B5E3C`, black `#2B2D42`. Skin: light `#F7D9C4`, tan `#E8B994`, brown `#C68B5E`, dark `#8D5A3B`.
- Diversity: Singapore is multiracial — skin tones and hair options include `tudung` (headscarf covering hair, neat and respectful) for girls/women.
- Pictures are language-neutral: NO text, letters or numbers inside scenes (a signboard is just coloured shapes; a clock has hands but no numerals).
- Each scene has its own opaque background, so it looks the same in light and dark page themes. Wrap in a rounded rect frame.

## JS API (file: art.js)
```js
window.ART = Object.assign(window.ART || {}, {
  scene(spec, opts) -> string   // '<svg viewBox="0 0 400 300" ...>' full scene
  face(key, opts) -> string     // '<svg viewBox="0 0 120 120">' round face only, key from faceKeys; opts {skin}
  BG, WHO, POSE, FACE, PROP, FX // arrays of supported names (must equal art-vocab.json)
});
```
`opts` for scene: `{label: "accessible description"}` -> `role="img" aria-label`.
Unknown names must never throw: skip the element (and `console.warn` once).

### Scene spec
```js
{
  bg: "voiddeck",             // required, from bg
  time: "day",                // optional: day | evening | night (tints sky/lighting; indoor scenes add a dark window at night)
  weather: "rain",            // optional, outdoor backgrounds only: sun | cloud | rain | storm | wind
  actors: [{
    who: "boy",               // boy | girl | man | woman | grandpa | grandma | teacher | toddler
    x: 120,                   // horizontal centre, 0..400
    y: 250,                   // optional feet baseline; default = ground 250 (sitting on a chair/bench: kit handles)
    s: 1,                     // optional scale (default 1; child ~125px tall, adult ~170px at s=1)
    flip: false,              // true = facing left (default faces right)
    pose: "walk",             // from pose
    face: "happy",            // from face
    hold: "wallet",           // optional prop drawn in the hand(s)
    skin: "tan", hair: "ponytail", top: "red", bottom: "navy", uniform: false   // optional; uniform = white shirt + navy shorts/skirt
  }],
  props: [{ k: "puddle", x: 200, y: 250, s: 1, flip: false, rot: 0 }],   // y = bottom of the prop; default ground 250
  fx: [{ k: "exclaim", x: 150, y: 80, s: 1, prop: "cake" }]               // effects; "thought" draws a thought bubble with optional prop picture inside
}
```
Ground baseline is y = 250 in every background. Indoor backgrounds: wall above, floor below 250. Leave the middle of the scene uncluttered so actors and props read clearly.

### Backgrounds (bg)
classroom (whiteboard, desks row at back), voiddeck (HDB block pillars, tiled floor, letterboxes, stone table), hawker (stalls, tables, stools), playground (slide, swings, rubber floor), park (trees, path, pond), living (sofa, TV shape, window), kitchen (counter, stove, fridge), bedroom (bed, desk, window), street (road, pavement, HDB blocks behind), busstop (shelter, bench, road), mrt (train interior: seats, poles, windows), beach (sea, sand, palm), field (school field, goal post, track), library (shelves), market (wet market stalls with produce), hall (school hall stage with curtains), zoo (enclosure fence, trees, giraffe-ish silhouette in distance), clinic (waiting chairs, counter), garden (flowers, hedge), corridor (HDB corridor with doors, railing).

### Faces (face key on actors)
neutral, happy, laughing, sad, crying (tears), scared (wide eyes, wobbly mouth, sweat), angry (brows down, red), surprised (O mouth), worried, proud (closed happy eyes, chin up), shy (blush, side glance), thinking, guilty (looking down), relieved (closed eyes, sigh smile), determined, sleepy, hurt (wince).

### face(key) for word banks (faceKeys)
28 distinct, clearly different emotion faces matching the English emotion names: happy, excited (sparkle eyes, huge grin), proud, grateful (soft smile, hands-free, heart cheek), relieved, surprised, shocked (very wide eyes, pale), confused (one brow up, squiggle mouth), curious, determined, hopeful, calm, worried, nervous (sweat, wavy mouth), scared, sad, lonely (small sad, looking down), disappointed, frustrated, regretful, guilty, embarrassed (strong blush), jealous (side eye, pout, faint green tint), angry, moved (teary smile), anxious, wronged (pout, teary, trembling lip), shy.
