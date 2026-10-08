window.CONTENT_PARTS = window.CONTENT_PARTS || [];
window.CONTENT_PARTS.push({ lang: "en", units: [

{ id: "en-speech", group: "Word banks", order: 70, cat: "actions",
  title: "Ways of speaking",
  intro: "“Said” is a useful word, but a story full of it sounds flat. Browse these words to show HOW your characters speak: their mood, their volume and what they are trying to do.",
  blocks: [
    { type: "text", html: "Every speech verb carries a feeling. <b>“Come here,” she whispered</b> and <b>“Come here,” she snapped</b> use the same words, but they paint two very different pictures. Read the lists slowly and notice which feeling each word carries." },
    { type: "chips", title: "Feelings in the voice", groups: [
      { title: "Happy and excited", words: ["chirped", "beamed", "laughed", "giggled", "chuckled", "cheered", "gushed", "sang out", "trilled", "whooped", "chortled", "enthused"], ex: "“We won! We actually won!” Aisha whooped, leaping off the bench.", note: "“Beamed” and “laughed” describe a face or a sound, so keep the speech short and cheerful." },
      { title: "Angry", words: ["snapped", "snarled", "growled", "barked", "roared", "thundered", "fumed", "hissed", "spat", "seethed", "bellowed", "raged", "retorted", "stormed"], ex: "“Who left the tap running?” Dad thundered from the bathroom.", note: "“Hissed” works best with words that have an s sound in them." },
      { title: "Sad", words: ["sobbed", "wept", "sniffled", "whimpered", "wailed", "moaned", "choked", "blubbered", "sighed", "lamented"], ex: "“He was the best dog in the world,” Mei Ling sobbed into her pillow." },
      { title: "Scared or nervous", words: ["stammered", "stuttered", "quavered", "squeaked", "shrieked", "screamed", "yelped", "faltered", "croaked", "panted"], ex: "“I-I didn’t mean to break it,” Jun Hao stammered, staring at the broken vase.", note: "A small dash or repeated letter shows a stammer. Do not overdo it." },
      { title: "Surprised", words: ["gasped", "exclaimed", "spluttered", "blurted", "marvelled", "squealed"], ex: "“You baked this yourself?” Grandma marvelled, turning the cake round on its plate." },
      { title: "Kind and calming", words: ["soothed", "comforted", "reassured", "encouraged", "consoled", "cooed", "praised", "promised", "offered", "assured"], ex: "“Take your time. Nobody’s laughing at you,” Mrs Tan reassured me." }
    ] },
    { type: "chips", title: "Quiet and loud", groups: [
      { title: "Quiet or secret", words: ["whispered", "murmured", "mumbled", "muttered", "breathed", "mouthed", "said under her breath", "said softly", "crooned", "hummed"], ex: "“Don’t move,” Priya breathed. “There’s a snake by your foot.”", note: "“Mouthed” means moving the lips with no sound at all." },
      { title: "Loud", words: ["shouted", "yelled", "hollered", "called out", "cried out", "boomed", "bawled", "screeched", "announced", "proclaimed"], ex: "“Lunch is ready!” Mum hollered up the stairs." }
    ] },
    { type: "chips", title: "Talking together", groups: [
      { title: "Asking", words: ["asked", "enquired", "questioned", "wondered", "queried", "demanded", "quizzed", "probed", "pressed", "challenged"], ex: "“So where were you at ten o’clock, exactly?” Mum pressed, raising an eyebrow.", note: "“Demanded” is a rude or angry way of asking." },
      { title: "Answering", words: ["replied", "answered", "responded", "agreed", "confirmed", "admitted", "confessed", "conceded", "acknowledged", "added"], ex: "“Yes, it was me,” Wei Ming admitted, his ears turning pink." },
      { title: "Explaining and telling", words: ["explained", "described", "informed", "instructed", "reminded", "pointed out", "suggested", "advised", "warned", "reasoned", "continued", "went on"], ex: "“If we leave now,” Dad reasoned, “we can beat the traffic on the expressway.”" },
      { title: "Joining in and thinking aloud", words: ["interrupted", "cut in", "butted in", "chimed in", "piped up", "hesitated", "paused", "pondered", "mused", "guessed"], ex: "“Me too!” my little brother piped up from the back seat." }
    ] },
    { type: "chips", title: "Attitude words", groups: [
      { title: "Complaining", words: ["complained", "grumbled", "whined", "groaned", "grouched", "protested", "objected", "griped", "sulked", "huffed", "bleated"], ex: "“Why do I always have to take out the rubbish?” Ryan grumbled." },
      { title: "Teasing", words: ["teased", "joked", "quipped", "taunted", "mocked", "jeered", "scoffed", "sneered", "sniggered", "smirked"], ex: "“Nice shot. Want me to get the ball out of the drain for you?” Marcus sneered.", note: "Teasing words can be friendly (joked, quipped) or unkind (taunted, jeered)." },
      { title: "Pleading", words: ["pleaded", "begged", "implored", "urged", "coaxed", "wheedled", "cajoled", "appealed", "persuaded"], ex: "“Please, just five more minutes,” I begged, clutching the controller." },
      { title: "Bossy and firm", words: ["ordered", "commanded", "directed", "insisted", "declared", "stated"], ex: "“Everyone line up in twos. Now,” the coach ordered." },
      { title: "Showing off", words: ["boasted", "bragged", "crowed", "gloated"], ex: "“I finished the whole test in ten minutes,” Ethan bragged to anyone who would listen." }
    ] },
    { type: "chips", title: "Adverbs that colour speech", groups: [
      { title: "Warm and happy", words: ["softly", "gently", "warmly", "cheerfully", "brightly", "eagerly", "proudly"], ex: "“Welcome to the team,” the captain said warmly, shaking my hand." },
      { title: "Cold and cross", words: ["angrily", "coldly", "sharply", "fiercely", "icily", "through gritted teeth"], ex: "“Fine,” she said icily, and turned her back on me." },
      { title: "Sad and wistful", words: ["sadly", "tearfully", "glumly", "miserably", "wistfully"], ex: "“I wish Grandpa could see this,” Mum said wistfully." },
      { title: "Unsure", words: ["nervously", "shakily", "timidly", "hesitantly", "anxiously"], ex: "“Is it... is it my turn?” Priya asked timidly." },
      { title: "Calm and serious", words: ["firmly", "calmly", "sternly", "patiently", "matter-of-factly"], ex: "“No food in the library. Rules are rules,” the librarian said firmly." },
      { title: "Cheeky", words: ["slyly", "cheekily", "sarcastically", "playfully", "mischievously"], ex: "“Who, me?” Jun Hao asked cheekily, hiding the water pistol behind his back.", note: "Use one adverb at most per speech tag. A strong verb often needs none." }
    ] },
    { type: "chips", title: "Action tags: let the reader SEE the speaker", groups: [
      { title: "Sad and tearful", words: ["she said, wiping her eyes", "he sighed, staring out of the window", "she whispered, hugging the old teddy bear", "he mumbled, kicking at the floor"], ex: "“It’s not fair,” she said, wiping her eyes with the back of her hand." },
      { title: "Angry", words: ["she snapped, slamming the drawer shut", "he said, jabbing a finger at me", "she replied, folding her arms", "he growled, crumpling the letter"], ex: "“I told you not to touch it,” he growled, crumpling the letter into a ball." },
      { title: "Nervous or scared", words: ["he stammered, twisting the hem of his shirt", "she whispered, glancing over her shoulder", "he said, his voice cracking", "she asked, gripping the railing"], ex: "“Did you hear that?” she whispered, glancing over her shoulder." },
      { title: "Happy and excited", words: ["she laughed, clutching her stomach", "he cheered, holding up the trophy", "she squealed, bouncing on her toes", "he called, waving from the gate"], ex: "“Look what I got!” he cheered, holding up the trophy for everyone to see." },
      { title: "Caring", words: ["she whispered, squeezing my hand", "he said, ruffling my hair", "she said, kneeling beside me", "he murmured, tucking the blanket round me"], ex: "“You were very brave today,” Grandma said, kneeling beside me." },
      { title: "Busy or bored", words: ["he said, not looking up from his phone", "she muttered, stirring the pot", "he yawned, rubbing his eyes", "she said, tapping her pen on the table"], ex: "“Mm-hmm,” Dad said, not looking up from his phone. I knew he had not heard a word." }
    ] },
    { type: "table", title: "Plain to vivid", head: ["Plain", "Vivid"], weakCol: 0, rows: [
      ["“Go away,” she said.", "“Go away!” she snapped, slamming her bedroom door."],
      ["“I’m scared,” he said.", "“C-can we go back now?” he quavered, clinging to my arm."],
      ["“We won,” they said.", "“We won!” the whole team whooped, throwing their caps into the air."],
      ["“Can I go?” I said.", "“Please, Mum, just this once,” I pleaded, clasping my hands together."],
      ["“It’s okay,” Mum said.", "“Shh, it’s okay,” Mum soothed, stroking my hair."],
      ["“You’re slow,” he said.", "“Hurry up, snail,” he teased, jogging backwards in front of me."]
    ] },
    { type: "tip", html: "<b>Do not overdo it:</b> If every line of dialogue has a fancy verb, the reader gets tired. Use “said” and “asked” for ordinary lines, and save the powerful verbs for moments of strong feeling. Sometimes the best tag is an action with no speech verb at all." },
    { type: "mcq", title: "Pick the best speech verb", intro: "Choose the word that fits the mood of the sentence.", items: [
      { q: "“The baby’s finally asleep,” Mei Ling ___, tiptoeing out of the room.", o: ["bellowed", "whispered", "cheered"], a: 1, e: "She does not want to wake the baby, so she speaks very quietly." },
      { q: "“I came first in the whole level!” Ahmad ___.", o: ["whooped", "whimpered", "grumbled"], a: 0, e: "“Whooped” is a loud, happy shout of joy." },
      { q: "“Why do I always have to wash the dishes?” Ryan ___.", o: ["chirped", "marvelled", "grumbled"], a: 2, e: "He is complaining, so “grumbled” fits best." },
      { q: "“Please let me keep the kitten,” Priya ___, her eyes shining with hope.", o: ["sneered", "pleaded", "retorted"], a: 1, e: "She is begging for something she wants very much." },
      { q: "“I-I didn’t see anything,” the boy ___.", o: ["stammered", "boasted", "announced"], a: 0, e: "The broken “I-I” shows he is nervous, so “stammered” matches." },
      { q: "“Me too!” my sister ___ from the back of the car.", o: ["lamented", "seethed", "piped up"], a: 2, e: "“Piped up” means joining a conversation suddenly, often in a small, bright voice." },
      { q: "“You call that a goal?” the older boy ___.", o: ["consoled", "jeered", "soothed"], a: 1, e: "He is mocking someone unkindly, so “jeered” is right." },
      { q: "“Don’t worry, the doctor’s very gentle,” Mum ___ me.", o: ["reassured", "snarled at", "taunted"], a: 0, e: "Mum is calming a worried child, so “reassured” fits." }
    ] }
  ] },

{ id: "en-faces", group: "Word banks", order: 71, cat: "people",
  title: "Faces and expressions",
  intro: "A face can tell the whole story without a single word. Browse these phrases for eyes, eyebrows, mouths, smiles, blushes and tears, so your reader can SEE what your characters feel.",
  blocks: [
    { type: "text", html: "Instead of telling the reader <b>“Jun Hao was angry”</b>, zoom in on his face: <b>his eyes narrowed and his jaw clenched</b>. The reader works out the feeling, and that makes your writing far more exciting to read." },
    { type: "chips", title: "Eyes", groups: [
      { title: "Happy eyes", words: ["eyes sparkled", "eyes twinkled", "eyes lit up", "eyes shone", "eyes crinkled at the corners", "eyes glowed with pride"], ex: "When Dad saw my report book, his eyes crinkled at the corners and he pulled me into a hug." },
      { title: "Sad eyes", words: ["eyes glistened", "eyes brimmed with tears", "eyes were red and puffy", "eyes dulled", "gazed at the floor", "eyes lost their sparkle", "eyes looked glassy"], ex: "Aisha’s eyes brimmed with tears as the bus carrying her best friend pulled away." },
      { title: "Angry eyes", words: ["eyes narrowed", "eyes blazed", "eyes flashed", "eyes smouldered", "eyes burned", "eyes turned cold", "glared without blinking"], ex: "The coach’s eyes narrowed when he saw the broken window." },
      { title: "Scared or surprised eyes", words: ["eyes widened", "eyes grew as round as saucers", "eyes darted", "eyes bulged", "eyes were fixed on", "stared without blinking", "eyes flickered to the door"], ex: "My brother’s eyes grew as round as saucers when the lights went out." },
      { title: "Tired or bored eyes", words: ["eyelids drooped", "heavy-lidded", "eyes glazed over", "rubbed her eyes", "blinked sleepily", "dark circles under his eyes"], ex: "By the third page of the long notice, my eyes had glazed over." },
      { title: "Cheeky eyes", words: ["eyes danced with mischief", "a glint in her eye", "a cheeky glint", "eyes gleamed", "shifty eyes"], ex: "There was a cheeky glint in Ryan’s eye, and I knew he was planning a prank." }
    ] },
    { type: "chips", title: "Eyebrows and forehead", groups: [
      { title: "Eyebrows and brow", words: ["raised an eyebrow", "eyebrows shot up", "eyebrows knitted together", "furrowed his brow", "eyebrows drew together", "arched an eyebrow", "brows lifted in hope", "wrinkled her forehead", "frowned so hard her eyebrows almost met"], ex: "Mrs Lim raised an eyebrow when I said the dog had eaten my homework.", note: "Eyebrows shooting up show surprise. Eyebrows knitting together show worry, confusion or anger." }
    ] },
    { type: "chips", title: "Mouth and lips", groups: [
      { title: "Mouth and lips", words: ["lips trembled", "bit her lip", "pressed her lips into a thin line", "pursed his lips", "jaw dropped", "mouth fell open", "gaped", "chewed the inside of her cheek", "lips curled in disgust", "lower lip wobbled", "pouted", "clenched his jaw", "gritted her teeth", "mouth went dry", "licked his dry lips"], ex: "My little sister’s lower lip wobbled, and I knew a storm of tears was coming.", note: "Pressed lips and a clenched jaw show someone holding feelings in." }
    ] },
    { type: "chips", title: "Smiles and frowns", groups: [
      { title: "Smiles", words: ["beamed", "grinned from ear to ear", "a shy smile", "a lopsided grin", "a toothy grin", "a warm smile", "a faint smile", "a knowing smile", "a sly smile", "a forced smile", "a sheepish grin", "a wobbly smile", "smiled through her tears", "a smile tugged at the corners of her mouth", "a slow smile spread across his face", "flashed a smile", "smirked"], ex: "A slow smile spread across Grandpa’s face as he unwrapped the photo frame.", note: "Not every smile is happy. A forced smile hides sadness, and a sly smile hides a plan." },
      { title: "Frowns and scowls", words: ["frowned", "scowled", "a deep frown", "glowered", "a sulky pout", "grimaced", "winced", "wrinkled her nose", "a puzzled frown", "a worried frown", "a sour face", "face clouded over", "a stony face"], ex: "Wei Ming winced as the nurse cleaned the cut on his knee." }
    ] },
    { type: "chips", title: "Face colour and tears", groups: [
      { title: "Face colour", words: ["cheeks flushed", "turned beetroot red", "blushed to the roots of her hair", "cheeks burned", "face turned as red as a chilli", "went pale", "turned as white as a sheet", "the colour drained from his face", "face turned ashen", "cheeks glowed pink", "face turned green", "rosy cheeks", "face flushed with excitement", "went red in the face with anger"], ex: "When the teacher read my secret note aloud, I turned beetroot red.", note: "Red can mean shy, embarrassed, angry or excited. Pale usually means shock or fear. Green means feeling sick." },
      { title: "Tears", words: ["tears welled up", "tears stung her eyes", "a lone tear rolled down", "tears streamed down", "blinked back tears", "fought back tears", "burst into tears", "tears of joy", "wept silently", "tears dripped off her chin", "wiped her tears with the back of her hand", "sniffed", "eyes misted over", "tear-stained cheeks", "cried her heart out"], ex: "I blinked back tears, determined not to cry in front of the whole class." }
    ] },
    { type: "chips", title: "Looks and glances", groups: [
      { title: "Ways of looking", words: ["glanced", "peeked", "peered", "stared", "gazed", "gawked", "squinted", "glared", "shot a look", "exchanged glances", "a sideways glance", "stole a glance", "a pleading look", "a puzzled look", "a dirty look", "a withering look", "a knowing look", "avoided my eyes", "looked away", "locked eyes with", "rolled her eyes", "winked", "a blank stare", "a puppy-dog look"], ex: "Priya and I exchanged glances. We were both thinking the same thing.", note: "“Glanced” is quick, “stared” is long, and “gazed” is long and dreamy." }
    ] },
    { type: "chips", title: "The whole face, by feeling", groups: [
      { title: "Happy", words: ["face lit up", "face broke into a smile", "a glowing face", "radiant", "all smiles", "a beaming face"], ex: "Grandma’s face lit up the moment we walked through the door." },
      { title: "Sad", words: ["face fell", "a long face", "face crumpled", "downcast", "a gloomy face", "crestfallen"], ex: "When the teacher said the outing was cancelled, Jun Hao’s face fell." },
      { title: "Angry", words: ["a face like thunder", "face darkened", "face twisted with rage", "red-faced", "nostrils flared", "a vein throbbed in his temple"], ex: "Dad came home with a face like thunder, and we all went very quiet." },
      { title: "Scared", words: ["face froze", "horror-struck", "terror written across her face", "a look of panic", "wide-eyed", "a petrified expression"], ex: "There was terror written across her face as the lift jerked to a stop." },
      { title: "Surprised or puzzled", words: ["astonished", "dumbfounded", "taken aback", "a baffled expression", "puzzled", "a look of disbelief"], ex: "I stared at my test score with a look of disbelief. Full marks?" },
      { title: "Calm and brave", words: ["composed", "a steady gaze", "a poker face", "a determined look", "set her jaw", "chin held high"], ex: "Aisha set her jaw and stepped up to the starting line." },
      { title: "Disgusted", words: ["screwed up her face", "made a face", "turned up his nose", "a look of disgust", "stuck out his tongue", "gagged"], ex: "My brother screwed up his face as he swallowed the bitter medicine." }
    ] },
    { type: "table", title: "Tell it, then show it", head: ["Telling", "Showing with the face"], weakCol: 0, rows: [
      ["Mei Ling was sad.", "Mei Ling’s lower lip wobbled, and a lone tear rolled down her cheek."],
      ["Ahmad was angry.", "Ahmad’s face darkened. His eyes narrowed into slits and he clenched his jaw."],
      ["I was scared.", "The colour drained from my face, and my eyes darted to the door."],
      ["Grandpa was proud of me.", "Grandpa’s eyes glowed with pride, and a slow smile spread across his face."],
      ["Priya was embarrassed.", "Priya blushed to the roots of her hair and stared hard at her shoes."]
    ] },
    { type: "tip", html: "<b>One or two details are enough:</b> Do not describe the eyes, eyebrows, mouth and cheeks all at once. Pick the one or two details that show the feeling most clearly, then move on with the story." },
    { type: "mcq", title: "What is the face saying?", intro: "Read each description and choose the feeling it shows.", items: [
      { q: "Her eyebrows shot up and her mouth fell open.", o: ["bored", "surprised", "sleepy"], a: 1, e: "Raised eyebrows and an open mouth are signs of surprise." },
      { q: "He pressed his lips into a thin line and his eyes turned cold.", o: ["joyful", "shy", "angry"], a: 2, e: "Tight lips and cold eyes show anger being held in." },
      { q: "She blushed and gave a sheepish grin.", o: ["embarrassed", "terrified", "furious"], a: 0, e: "A blush with a sheepish grin shows embarrassment." },
      { q: "The colour drained from his face and his eyes darted to the door.", o: ["proud", "frightened", "excited"], a: 1, e: "Going pale and looking for a way out are signs of fear." },
      { q: "Her eyelids drooped and she blinked slowly.", o: ["tired", "angry", "cheeky"], a: 0, e: "Drooping eyelids show tiredness." },
      { q: "His eyes danced with mischief and he smirked.", o: ["heartbroken", "scared", "up to something"], a: 2, e: "A mischievous look and a smirk suggest he is planning a trick." }
    ] }
  ] },

{ id: "en-body", group: "Word banks", order: 72, cat: "people",
  title: "Body language",
  intro: "Our hands, shoulders, feet, breath and heartbeat all give away how we feel. Browse these phrases, sorted by feeling, to show emotions through the whole body.",
  blocks: [
    { type: "text", html: "When you are nervous, you might fiddle with your pencil. When you are proud, you stand taller. Writers watch real people and borrow these small movements. Each list below mixes <b>hands and arms, shoulders and posture, legs and feet, breathing, heartbeat and voice</b>." },
    { type: "chips", title: "Worried feelings", groups: [
      { title: "Nervous", words: ["fiddled with her pencil case", "chewed his fingernails", "twisted the hem of her shirt", "drummed his fingers on the desk", "tapped her foot restlessly", "shifted from one foot to the other", "wiped his sweaty palms on his shorts", "cracked his knuckles", "paced up and down the corridor", "swallowed hard", "took a shaky breath", "her stomach churned", "butterflies fluttered in his stomach", "her voice came out thin and wobbly", "kept checking the clock"], ex: "Outside the principal’s office, Wei Ming wiped his sweaty palms on his shorts and swallowed hard." },
      { title: "Scared", words: ["froze on the spot", "her legs turned to jelly", "his knees knocked together", "a shiver ran down her spine", "the hairs on his arms stood on end", "goosebumps crept up her arms", "clutched her bag to her chest", "backed away slowly", "flattened himself against the wall", "her heart hammered against her ribs", "his heart was in his throat", "held her breath", "breathed in short, sharp gasps", "a cold sweat broke out on his forehead", "her voice died in her throat"], ex: "A shiver ran down my spine. I held my breath and flattened myself against the cold wall.", note: "Fear makes the body freeze, shake or try to escape." },
      { title: "Shy or embarrassed", words: ["hid behind his mother", "stared at her shoes", "shuffled her feet", "hunched her shoulders", "tucked her hair behind her ear", "rubbed the back of his neck", "hid her face in her hands", "edged towards the back of the line", "mumbled into his collar", "wished the ground would swallow her up", "crossed and uncrossed her legs", "played with her fingers", "spoke in a voice smaller than a mouse’s", "peeked out from behind the curtain", "slipped into the last seat"], ex: "The new boy edged towards the back of the line and stared at his shoes." }
    ] },
    { type: "chips", title: "Hot feelings", groups: [
      { title: "Angry", words: ["clenched his fists", "balled her hands into fists", "stamped her foot", "slammed the door", "jabbed a finger at", "folded her arms tightly", "planted her hands on her hips", "stormed out of the room", "marched up to", "shook with rage", "his chest heaved", "breathed hard through his nose", "his heart pounded with fury", "his voice rose to a roar", "her words came out hot and fast"], ex: "Mum planted her hands on her hips and stared at the muddy footprints on her clean floor." },
      { title: "Impatient or bored", words: ["tapped her pen against the table", "sighed loudly", "rested her chin in her hand", "slumped over the desk", "swung his legs under the chair", "rolled a pencil back and forth", "doodled in the margin", "checked his watch every minute", "stretched and yawned", "jiggled his knee", "craned his neck to see the front of the queue", "huffed and puffed", "leaned back on two legs of the chair", "twiddled his thumbs", "groaned under her breath"], ex: "Stuck in the long queue at the hawker centre, my brother huffed and puffed and craned his neck to see the front." }
    ] },
    { type: "chips", title: "Bright feelings", groups: [
      { title: "Happy or excited", words: ["jumped for joy", "punched the air", "clapped her hands", "danced around the living room", "skipped down the corridor", "bounced on her toes", "hugged her friend tightly", "spun round and round", "threw his arms in the air", "gave a thumbs-up", "high-fived everyone in sight", "her heart soared", "laughed until her sides ached", "his voice bubbled with excitement", "could hardly sit still"], ex: "When the results were announced, Aisha punched the air and high-fived everyone in sight." },
      { title: "Proud or confident", words: ["stood tall", "puffed out his chest", "held her head high", "squared his shoulders", "strode to the front", "walked with a spring in her step", "lifted the trophy above his head", "gave a firm handshake", "looked the judges in the eye", "straightened her collar", "stood with feet planted firmly", "spoke in a clear, steady voice", "took a deep, calm breath", "swelled with pride", "walked onto the stage without a wobble"], ex: "Priya squared her shoulders, took a deep, calm breath and strode to the front of the hall." },
      { title: "Relieved", words: ["let out a long breath", "sank into a chair", "her shoulders sagged with relief", "his whole body relaxed", "slumped against the wall", "wiped her forehead", "breathed a sigh of relief", "her heart slowed down", "a weight lifted off his shoulders", "loosened his grip", "unclenched her hands", "laughed shakily", "leaned back and stretched", "his legs went weak with relief", "threw her arms round Mum"], ex: "When the vet said Lucky would be fine, I sank into a chair and let out a long breath." }
    ] },
    { type: "chips", title: "Heavy feelings", groups: [
      { title: "Sad", words: ["hung her head", "his shoulders drooped", "trudged home", "dragged his feet", "curled up in bed", "hugged her knees", "buried her face in her pillow", "sat alone on the bench", "her shoulders shook with silent sobs", "her chest felt tight", "a lump rose in his throat", "heaved a heavy sigh", "her voice cracked", "spoke barely above a whisper", "stared out of the window for hours"], ex: "Jun Hao trudged home from the bus stop, dragging his feet all the way to the lift." },
      { title: "Disappointed", words: ["slumped in her seat", "kicked at a pebble", "shoved his hands in his pockets", "walked off the field with his head down", "dropped her bag on the floor with a thud", "turned away", "scuffed his shoes on the ground", "her heart sank", "his heart dropped like a stone", "let out a low groan", "her voice went flat", "crumpled the test paper", "sat staring at the scoreboard", "stuffed the letter into his bag", "said nothing all the way home"], ex: "Ahmad shoved his hands in his pockets and walked off the field with his head down." },
      { title: "Tired", words: ["dragged herself out of bed", "yawned widely", "stumbled up the stairs", "his legs felt like lead", "her arms ached", "flopped onto the sofa", "could barely keep his head up", "nodded off on the MRT", "slumped against the bus window", "rubbed his stiff neck", "shuffled to the bathroom", "panted heavily", "his feet throbbed", "leaned on the railing", "spoke in a slow, sleepy voice"], ex: "After the cross-country run, I flopped onto the sofa. My legs felt like lead." }
    ] },
    { type: "chips", title: "Sudden feelings", groups: [
      { title: "Surprised or shocked", words: ["jumped back", "stopped dead in her tracks", "nearly dropped the tray", "clapped a hand over her mouth", "staggered backwards", "his hand flew to his chest", "whirled round", "stood rooted to the spot", "her breath caught in her throat", "his heart skipped a beat", "spun on her heel", "the spoon slipped from his fingers", "jolted upright", "flinched", "did a double take"], ex: "Mum clapped a hand over her mouth when she saw the surprise party in the void deck." }
    ] },
    { type: "table", title: "Tell it, then show it", head: ["Telling", "Showing with the body"], weakCol: 0, rows: [
      ["I was nervous before my speech.", "I twisted the hem of my shirt and kept checking the clock. My stomach churned."],
      ["Dad was angry.", "Dad’s chest heaved. He jabbed a finger at the broken window."],
      ["Mei Ling was proud.", "Mei Ling held her head high and walked onto the stage without a wobble."],
      ["We were relieved.", "We all let out a long breath, and our shoulders sagged with relief."],
      ["He was tired.", "He dragged himself up the stairs, his feet throbbing with every step."]
    ] },
    { type: "tip", html: "<b>Mix the body and the face:</b> One body action plus one face detail is a strong combination. <i>Her heart hammered against her ribs, and the colour drained from her face.</i> Two details, one clear feeling." },
    { type: "mcq", title: "Read the body", intro: "What feeling does each body-language clue show?", items: [
      { q: "He puffed out his chest and strode to the front.", o: ["confident", "ashamed", "exhausted"], a: 0, e: "A puffed-out chest and a strong walk show confidence." },
      { q: "She hunched her shoulders and slipped into the last seat.", o: ["furious", "shy", "excited"], a: 1, e: "Making herself small and choosing the last seat shows shyness." },
      { q: "His legs turned to jelly and goosebumps crept up his arms.", o: ["bored", "proud", "terrified"], a: 2, e: "Weak legs and goosebumps are signs of fear." },
      { q: "She jiggled her knee and checked her watch every minute.", o: ["impatient", "relieved", "sad"], a: 0, e: "Restless movements and watching the time show impatience." },
      { q: "His shoulders sagged with relief and he sank into a chair.", o: ["angry", "relieved", "nervous"], a: 1, e: "The tension leaves his body all at once, which shows relief." },
      { q: "She buried her face in her pillow and her shoulders shook.", o: ["sleepy", "proud", "heartbroken"], a: 2, e: "Hiding her face and silent sobs show deep sadness." }
    ] }
  ] },

{ id: "en-charbank", group: "Word banks", order: 73, cat: "people",
  title: "Character and appearance",
  intro: "Here are over a hundred words to describe what a person is LIKE, each with a simple meaning and an action that proves it, plus phrases to describe how people LOOK, sound and move.",
  blocks: [
    { type: "text", html: "A good character description has two parts: <b>the outside</b> (how a person looks, sounds and moves) and <b>the inside</b> (what kind of person they are). For the inside, never just name the trait. Show it with something the person does. The third column in each table gives you an idea." },
    { type: "table", title: "Positive traits: kind and caring", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["kind", "good and gentle to others", "sharing her snack with a classmate who forgot his"],
      ["caring", "looks after people and wants them to be well", "bringing Grandma a cup of warm water when she coughs"],
      ["generous", "happy to give time, money or things", "putting all his pocket money into the charity box"],
      ["thoughtful", "thinks about what others need", "giving up her seat on the bus to an elderly auntie"],
      ["considerate", "careful not to upset or trouble others", "turning down the TV so the baby can sleep"],
      ["compassionate", "feels other people’s pain and wants to help", "staying with a lost, crying toddler until his mother arrived"],
      ["gentle", "soft and careful, never rough", "lifting the injured bird in cupped hands"],
      ["helpful", "always ready to lend a hand", "staying back to help the teacher carry the books"],
      ["loyal", "stands by friends no matter what", "refusing to laugh when others make fun of his best friend"],
      ["forgiving", "does not hold a grudge", "inviting the boy who teased her to her birthday party"],
      ["selfless", "puts others before herself", "giving up his place in the queue to a mother with a crying toddler"],
      ["warm-hearted", "friendly and loving", "greeting the cleaner by name every morning with a smile"]
    ] },
    { type: "table", title: "Positive traits: brave and determined", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["brave", "faces fear and does it anyway", "walking into the dark storeroom to fetch the torch"],
      ["courageous", "very brave, especially when it matters", "telling the teacher about the bully even though she was scared"],
      ["daring", "willing to try risky or bold things", "being the first to jump into the deep end of the pool"],
      ["determined", "does not give up on a goal", "practising her piano piece every night until it was perfect"],
      ["persistent", "keeps trying again and again", "asking his parents every week until they agreed to the swimming lessons"],
      ["resilient", "bounces back after problems", "getting up after a fall and finishing the race with a bleeding knee"],
      ["confident", "believes in himself", "volunteering to give the speech at assembly"],
      ["bold", "not afraid to speak up or stand out", "raising her hand to disagree with the whole class"],
      ["adventurous", "loves new and exciting experiences", "trying durian for the first time without holding his nose"],
      ["independent", "does things without needing help", "packing her own school bag and ironing her own uniform"],
      ["ambitious", "has big goals and works towards them", "planning to become the first doctor in her family"]
    ] },
    { type: "table", title: "Positive traits: honest and responsible", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["honest", "tells the truth", "owning up to breaking the classroom fan"],
      ["responsible", "takes care of duties without being reminded", "feeding the class goldfish every morning"],
      ["reliable", "you can count on him", "always handing in the group project on time"],
      ["trustworthy", "can be trusted with secrets or things", "keeping her friend’s secret even when others begged to know"],
      ["sincere", "means what he says", "apologising in person, not just with a quick text"],
      ["punctual", "always on time", "arriving at the MRT station ten minutes early"],
      ["hardworking", "puts in a lot of effort", "doing extra maths practice after dinner"],
      ["diligent", "careful and steady in work", "checking every answer twice before handing in the paper"],
      ["disciplined", "controls himself to do what is right", "finishing homework before switching on the games console"],
      ["fair", "treats everyone equally", "making sure every player gets a turn in the game"],
      ["humble", "does not show off", "thanking the team instead of talking about her own goal"],
      ["mature", "sensible, acts older than his age", "calmly calling for help when his brother fell, instead of panicking"]
    ] },
    { type: "table", title: "Positive traits: clever and curious", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["intelligent", "learns and understands quickly", "solving the tricky puzzle before anyone else"],
      ["curious", "wants to find out about things", "asking the zookeeper question after question"],
      ["creative", "full of new ideas", "turning old milk cartons into a robot costume"],
      ["imaginative", "can picture things that are not real", "inventing a whole kingdom under her bed"],
      ["resourceful", "finds clever ways to solve problems", "using a hair clip to fix the broken zip"],
      ["observant", "notices small details", "spotting that the cat’s collar was missing"],
      ["wise", "makes good choices and gives good advice", "telling me to sleep on it before making a big decision"],
      ["quick-witted", "thinks and answers fast", "coming up with a funny reply in a split second"],
      ["inventive", "good at making new things", "building a pulley to lift his toys to the top bunk"],
      ["knowledgeable", "knows a lot", "naming every planet in order from memory"]
    ] },
    { type: "table", title: "Positive traits: cheerful and friendly", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["cheerful", "happy and bright", "humming as she wiped the tables after recess"],
      ["friendly", "easy to talk to", "inviting the new girl to join the skipping game"],
      ["optimistic", "expects good things to happen", "saying “We’ll win next time” after losing the match"],
      ["enthusiastic", "full of eager excitement", "being first to sign up for every CCA activity"],
      ["easy-going", "relaxed, not easily upset", "shrugging and laughing when the rain spoilt the picnic"],
      ["sociable", "enjoys being with people", "chatting with everyone at the void deck party"],
      ["witty", "funny in a clever way", "making the whole class laugh with one quick joke"],
      ["good-humoured", "stays cheerful even when things go wrong", "joking about his muddy shoes instead of complaining"],
      ["polite", "has good manners", "saying “thank you, Uncle” to the drinks stall owner"],
      ["patient", "can wait calmly", "explaining the sum to his sister for the fifth time without sighing"],
      ["grateful", "thankful for what she has", "writing a thank-you card for the school bus driver"]
    ] },
    { type: "table", title: "Negative traits: unkind", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["selfish", "thinks only of herself", "taking the biggest slice of cake without asking"],
      ["mean", "unkind on purpose", "hiding a classmate’s shoes after PE"],
      ["spiteful", "wants to hurt someone who upset him", "tearing up a classmate’s drawing because it won the prize"],
      ["bossy", "always tells others what to do", "deciding every rule of the game and shouting at anyone who disagreed"],
      ["rude", "has bad manners", "talking loudly on the phone in the library"],
      ["inconsiderate", "does not think about others", "leaving her tray on the hawker centre table for someone else to clear"],
      ["jealous", "upset when others have what he wants", "sulking when his friend got a new bicycle"],
      ["greedy", "wants more than her fair share", "grabbing three goodie bags when everyone was meant to take one"],
      ["arrogant", "thinks he is better than others", "refusing to pass the ball because he was “the best player”"],
      ["boastful", "brags about herself", "telling everyone about her expensive watch again and again"],
      ["snobbish", "looks down on people", "turning up his nose at the kopitiam food"]
    ] },
    { type: "table", title: "Negative traits: troublesome", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["mischievous", "likes playing harmless tricks", "putting a plastic spider in his sister’s cereal"],
      ["naughty", "does not behave", "drawing on the walls with Mum’s lipstick"],
      ["disobedient", "does not follow rules or instructions", "swimming past the red flag after the lifeguard warned him"],
      ["sneaky", "does things secretly", "eating sweets under the table during class"],
      ["dishonest", "does not tell the truth", "blaming the cat for the broken vase"],
      ["cheeky", "rude in a funny or bold way", "pulling faces behind the teacher’s back"],
      ["rebellious", "fights against rules", "wearing bright red sports shoes to school just to break the rules"],
      ["irresponsible", "does not take care of duties", "forgetting to feed the hamster for two days"],
      ["careless", "does not pay attention", "leaving the gate open so the dog ran out"],
      ["reckless", "does dangerous things without thinking", "cycling down the slope with no hands"],
      ["quarrelsome", "always starting arguments", "arguing about who had the bigger glass of Milo"]
    ] },
    { type: "table", title: "Negative traits: hard to be around", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["grumpy", "often in a bad mood", "grunting instead of saying good morning"],
      ["moody", "feelings change quickly", "laughing one minute and slamming doors the next"],
      ["short-tempered", "gets angry very quickly", "shouting the moment someone bumped her desk"],
      ["impatient", "hates waiting", "pressing the lift button again and again"],
      ["stubborn", "will not change his mind", "refusing to wear a raincoat even in a thunderstorm"],
      ["lazy", "avoids work or effort", "pretending to be asleep when it was his turn to wash the dishes"],
      ["fussy", "very hard to please", "picking every single spring onion out of her noodles"],
      ["nosy", "too interested in other people’s business", "peeking at her sister’s diary"],
      ["clumsy", "often trips or drops things", "knocking over the paint water three times in one lesson"],
      ["forgetful", "often forgets things", "leaving his water bottle on the bus every week"],
      ["pessimistic", "expects bad things to happen", "saying “We’ll definitely lose” before the match even started"]
    ] },
    { type: "table", title: "Negative traits: weak spots", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["cowardly", "runs away from danger or trouble", "hiding in the toilet when his friend needed help"],
      ["gullible", "believes anything", "believing that the moon was made of kaya"],
      ["vain", "too proud of her looks", "checking her reflection in every window she passed"],
      ["sulky", "quiet and grumpy when she does not get her way", "refusing to speak to anyone after losing the game"],
      ["sly", "tricky and secretive", "pretending to help but quietly taking the credit"],
      ["unreliable", "you cannot count on him", "promising to bring the ball and turning up without it, again"],
      ["ungrateful", "not thankful", "complaining about the birthday present Grandma knitted"],
      ["gossipy", "loves spreading stories about others", "whispering secrets about classmates during recess"],
      ["sloppy", "messy and careless in work", "handing in homework with Milo stains and missing pages"],
      ["overconfident", "too sure of himself", "not studying because he was “sure” the test would be easy"]
    ] },
    { type: "table", title: "Neutral traits: neither good nor bad", head: ["Word", "Meaning", "Shown by…"], rows: [
      ["quiet", "does not talk much", "listening carefully while the others chatted"],
      ["shy", "uneasy with new people", "hiding behind Mum when the visitors arrived"],
      ["timid", "easily frightened", "jumping at every clap of thunder"],
      ["talkative", "loves to talk", "chatting nonstop all the way home on the bus"],
      ["reserved", "keeps feelings to himself", "smiling politely but saying little about his weekend"],
      ["serious", "does not joke much", "reading the instructions twice before starting"],
      ["cautious", "careful to avoid danger", "testing the water with one toe before getting in"],
      ["sensitive", "feels things deeply", "crying at the end of a sad film"],
      ["competitive", "loves to win", "racing his brother even to the lift"],
      ["energetic", "full of energy", "running laps round the field before the race even started"],
      ["dreamy", "often lost in thoughts", "staring out of the window and missing her name being called"],
      ["practical", "sensible and down-to-earth", "packing a raincoat and plasters for the class outing"],
      ["sporty", "loves sport and exercise", "spending every recess kicking a ball"],
      ["bookish", "loves reading", "reading under the blanket with a torch"],
      ["artistic", "good at art and creative things", "sketching the hawkers while waiting for her food"],
      ["playful", "loves to have fun", "turning the dull car ride into a guessing game"],
      ["strict", "makes people follow rules", "checking every pupil’s nails and hair on Monday"],
      ["outspoken", "says what she thinks", "telling the canteen vendor that the price was unfair"],
      ["old-fashioned", "likes the ways of the past", "writing letters by hand instead of sending messages"],
      ["sentimental", "treasures memories", "keeping every birthday card she ever received"],
      ["carefree", "has no worries", "singing loudly while cycling along the park connector"],
      ["proud", "pleased with herself or her family (can be good or too much)", "showing off her brother’s medal to the whole street"],
      ["excitable", "gets excited very easily", "squealing and jumping at every piece of good news"],
      ["tidy", "likes things neat and in order", "lining up his pencils from longest to shortest"]
    ] },
    { type: "chips", title: "Appearance: how people look", groups: [
      { title: "Height and build", words: ["as tall as a lamp post", "towered over everyone", "a head shorter than his classmates", "small for her age", "tiny and birdlike", "long-legged", "shoulders as wide as a doorway", "muscular arms", "as thin as a stick", "a round belly", "well-built", "slightly built", "athletic", "stooped with age", "a slight frame", "strong and solid"], ex: "Uncle Rahman was so tall that he towered over everyone at the bus stop." },
      { title: "Hair", words: ["jet-black hair", "hair as white as cotton wool", "salt-and-pepper hair", "a shiny bald head", "a neat bun", "pigtails tied with red ribbons", "a bowl haircut", "a buzz cut", "wavy hair that bounced", "a fringe that hid her eyebrows", "hair sticking up in tufts", "slicked-back hair", "a tangle of curls", "a neatly pinned tudung", "hair streaked with grey"], ex: "Every morning, my little sister’s hair stuck up in tufts like a startled bird." },
      { title: "Face features", words: ["freckles sprinkled across her nose", "a button nose", "a long, straight nose", "high cheekbones", "a square jaw", "thick-rimmed spectacles", "deep-set eyes", "long eyelashes", "a mole above his lip", "a scar on his chin", "chubby cheeks", "laughter lines around his eyes"], ex: "Grandpa had laughter lines around his eyes from seventy years of smiling.", note: "For expressions (smiles, frowns, blushes), see the Faces and expressions unit." },
      { title: "Clothes and accessories", words: ["a spotless white uniform", "a tie that was always crooked", "socks pulled up to her knees", "a baggy jersey", "a floral dress", "a batik shirt", "a sari in bright orange", "a smart blazer", "a sweaty PE T-shirt", "flip-flops that slapped on the floor", "mud-caked football boots", "a raincoat two sizes too big", "a crisp white shirt and black trousers", "a frayed cap", "a gold watch that glinted", "a backpack covered with keychains"], ex: "Ben arrived in mud-caked football boots, his tie as crooked as ever." }
    ] },
    { type: "chips", title: "Appearance: age, voice and movement", groups: [
      { title: "Age", words: ["a toddler with chubby legs", "a gap-toothed six-year-old", "a gangly teenager", "a young mother pushing a pram", "a middle-aged man", "an elderly lady", "a wrinkled old uncle", "a grey-haired grandfather", "spotted, wrinkled hands", "walked with a cane", "a newborn baby", "a fresh-faced trainee teacher", "in her twenties", "well into his eighties"], ex: "A gap-toothed six-year-old tugged at my sleeve and asked if I was lost." },
      { title: "Voice", words: ["a deep, rumbling voice", "a voice like warm honey", "a crackly voice like an old radio", "a high, piping voice", "a hoarse whisper", "a clear, bell-like voice", "a nasal voice", "a raspy voice", "a loud, cheerful voice that filled the room", "a slow, drawling voice", "a sharp, clipped voice", "a lilting accent", "a breathy voice", "a voice as rough as sandpaper"], ex: "The storyteller spoke in a voice like warm honey, and the whole library fell silent." },
      { title: "Ways of moving", words: ["bounded up the stairs", "sauntered", "ambled", "marched briskly", "scurried", "lumbered", "trotted", "tottered", "sprang to his feet", "slouched along", "zipped through the crowd", "moved as lightly as a cat"], ex: "Mr Koh ambled along the corridor, greeting every pupil he passed." }
    ] },
    { type: "cards", title: "Put it together: three quick character sketches", items: [
      { tag: "Kind", title: "Auntie Siti, the drinks stall owner", text: "Appearance plus a kind action.", ex: "Auntie Siti was a tiny, birdlike woman with a neatly pinned tudung and laughter lines around her eyes. Whenever a child counted out coins and came up short, she would wink and say, “Next time, okay?”" },
      { tag: "Boastful", title: "Marcus, the class star", text: "Appearance plus a showing-off action.", ex: "Marcus towered over everyone in a spotless white uniform. He never walked into class. He swaggered, flashing his gold watch so that it glinted under the lights." },
      { tag: "Shy", title: "Wen Xin, the new girl", text: "Appearance plus a shy action.", ex: "Wen Xin was small for her age, with a fringe that hid her eyebrows. On her first day, she slipped into the last seat and spoke in a voice smaller than a mouse’s." }
    ] },
    { type: "mcq", title: "Which trait is shown?", intro: "Read what the person does and choose the trait it proves.", items: [
      { q: "Jun Hao walked back to the shop to return the extra change.", o: ["honest", "stubborn", "dreamy"], a: 0, e: "Returning money that is not his shows honesty." },
      { q: "Priya picked every single spring onion out of her noodles.", o: ["generous", "fussy", "brave"], a: 1, e: "Being very hard to please about food shows she is fussy." },
      { q: "After falling, Ahmad got up and finished the race with a bleeding knee.", o: ["lazy", "careless", "resilient"], a: 2, e: "Bouncing back and carrying on shows resilience." },
      { q: "Mei Ling used a hair clip to fix her broken zip.", o: ["resourceful", "vain", "gullible"], a: 0, e: "Finding a clever solution with what she had shows she is resourceful." },
      { q: "Ryan believed his cousin when she said the moon was made of kaya.", o: ["wise", "gullible", "outspoken"], a: 1, e: "Believing something obviously untrue shows he is gullible." },
      { q: "Wei Ming kept his friend’s secret even when the others begged him.", o: ["sneaky", "nosy", "trustworthy"], a: 2, e: "Keeping a secret safe shows he can be trusted." }
    ] }
  ] }

] });
