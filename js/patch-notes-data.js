// Keep newest patch first in this array.
// Update `version` each patch so the popup appears once for returning users.
window.AstralDexPatchNotes = [
  {
    version: "v0.2.1.0",
    date: "2026-05-25",
    title: "La Musica - Pokemon Astral Emerald 0.2.1.0",
    sections: [
      {
        heading: "Overview",
        items: [
          "On a new version of Expansion.",
          "Game progression now goes further (up to Union Cave)."
        ]
      },
      {
        heading: "AI Bug Fixes (Thanks Midnight)",
        items: [
          "Revamped AI logic on guaranteed stat drop damaging moves.",
          "Make speed control positive effect care about Speed.",
          "Fix back-to-back Protect bug.",
          "Fix post-KO switch-in party order bug (not tested).",
          "Fix damaging moves that can cause non-volatile status to no longer get random score increases."
        ]
      },
      {
        heading: "AI",
        items: [
          "Added a special case for Meganium. When Meganium is holding its Mega Stone, its base form sees Mega Sol, meaning it can click Solar Beam where beforehand it would not."
        ]
      },
      {
        heading: "Pokemon Changes",
        items: [
          "All ZA Megas now have sprites (except Garchomp-Z).",
          "Buffed all elemental monkeys from total BST 495 to 515.",
          "Mega Scovillain's hidden ability is now Spicy Spray.",
          "Petilil has a 50% chance to hold Sun Stone and a 5% chance to hold Shiny Stone.",
          "Solgaleo now has Intimidate instead of Pressure.",
          "Lunala now has Illuminate instead of Pressure.",
          "Lurantis now has Sharpness instead of Leaf Guard."
        ]
      },
      {
        heading: "Updated Encounter Table",
        items: [
          "Added Route 134.",
          "Added Route 112.",
          "Added Fiery Path.",
          "Added Union Cave."
        ]
      },
      {
        heading: "Move Changes",
        items: [
          "Snap Trap: 60 BP -> 80 BP.",
          "Magnet Bomb: 60 BP -> 95 BP.",
          "Venom Drain now has a custom animation.",
          "Volt Volley now has a custom animation.",
          "Scale Chomp now has a custom animation.",
          "Thief and Covet now have their original effects back, but the item is not kept after battle.",
          "New move: Iron Cleave, 80 BP slicing move with a high crit ratio and 20% chance to lower Defense."
        ]
      },
      {
        heading: "Updated Learnsets",
        items: [
          "Glalie can now learn Explosion and Self-Destruct via TM.",
          "Swellow can learn Overheat, Flame Charge, Chilling Water, Rock Slide, Brick Break, Temper Flare, Stomping Tantrum, Icy Wind, Nature Power, Trailblaze, and Covet.",
          "Clefable learns Hurricane at level 70 and Encore at level 86.",
          "Pignite and Emboar can now learn Rock Blast.",
          "Croconaw can now learn Icicle Spear and Scale Shot.",
          "Arboliva learns Giga Drain at level 60 (was 45) and Seed Flare at level 69 (was 63).",
          "Ferrothorn learns Worry Seed at level 1.",
          "Talonflame learns Acrobatics at level 1.",
          "Updated Cosmog line learnset.",
          "Updated Espurr line learnset.",
          "Updated Charcadet line learnset.",
          "Coalossal learns Meteor Beam at level 82.",
          "Updated elemental monkeys line learnset.",
          "Updated Shelmet/Karrablast line learnset.",
          "Updated Rufflet line learnset.",
          "Updated Swablu line learnset.",
          "Updated Jangmo-o line learnset.",
          "Updated Guzzlord learnset.",
          "Updated Nihilego learnset.",
          "Updated Buzzwole learnset.",
          "Updated Pheromosa learnset.",
          "Updated Xurkitree learnset.",
          "Updated Celesteela learnset.",
          "Updated Kartana learnset.",
          "Updated Stakataka learnset.",
          "Updated Blacephalon learnset.",
          "Updated Komala learnset.",
          "Updated Fomantis line learnset.",
          "Updated Capsakid line learnset.",
          "Updated Inkay line learnset.",
          "Updated Bramblin line learnset.",
          "Updated Hoothoot learnset.",
          "Updated Taillow line learnset.",
          "Updated Sentret line learnset.",
          "Updated Remoraid line learnset.",
          "Updated Torkoal line learnset.",
          "Updated Druddigon learnset.",
          "Updated Cacnea line learnset.",
          "Updated Poipole line learnset.",
          "Updated Skarmory learnset.",
          "Added Bullet Punch access to Meowth-Galar, Perrserker, Sandshrew-Alola, Golisopod, Togedemaru, Primeape, Gallade, Lopunny, Scrafty, Aipom, and Ambipom."
        ]
      },
      {
        heading: "Trainers",
        items: [
          "Fisherman Ivan's Gyarados is now a Magikarp.",
          "Brock's Anorith now has Aerial Ace instead of Cut.",
          "Roxanne's Metang is now a Beldum.",
          "Fixed Museum Grunt 1 not having a Gyarados.",
          "Removed Hyper Potions on Petalburg Gym trainers (was unintentional).",
          "Norman Singles Terapagos and Drampa now reflect their double battle nature.",
          "Norman Singles Drampa now has Shock Wave instead of Thunder and Dragon Breath instead of Fire Blast.",
          "Added missing Expert Timothy team and AI flag.",
          "Fixed incorrect ability on Psychic Alix Solrock.",
          "Updated Route 111 trainers.",
          "Updated Route 112 trainers."
        ]
      },
      {
        heading: "New Features",
        items: [
          "Hidden Grottos now have their own encounter table and are scattered around the map.",
          "Every Hidden Grotto is pre-determined and cannot be changed until a new save starts.",
          "There is a 5% chance when entering a Hidden Grotto that the Pokemon will be angry.",
          "Angry Hidden Grotto Pokemon have an omni-boost and special moves not normally in their learnset.",
          "Hidden Grotto shiny odds are 1/100.",
          "Added a new Quick Menu/Utilities slot called Radio Player for rotating or selecting music.",
          "Added new battle backgrounds, including day/night variants.",
          "Added expanded bag slots."
        ]
      },
      {
        heading: "Misc",
        items: [
          "Added music variations from generations 1, 4, and 5 across many game moments; tracks are interchangeable in the Radio Player.",
          "Littleroot Town theme changed to Sandgem Town with day/night variants.",
          "Birch's Lab theme changed to HG Lab Theme.",
          "Route 101 theme changed to RG Route 1 theme.",
          "Route 102 theme changed to HG Route 29 theme.",
          "Petalburg City theme changed to HG Goldenrod theme.",
          "Route 104 theme changed to BW Route 4 theme (including shared routes).",
          "Petalburg Forest theme changed to DP Eterna Forest theme.",
          "Route 110/117/111 theme changed to HG Route 34.",
          "Route 118 theme changed to DP Route 210 with day/night variants.",
          "Added Deoxys cry when pressing Start/A on the title screen.",
          "Reduced Delibird deliveries from 8 to 4.",
          "Game Corner TMs changed to hold Pokemon with 3 batches.",
          "Fixed Day/Night cycle not saving.",
          "Fixed wrong item in Petalburg Woods (now Rare Candy).",
          "Fixed Rustboro softlock.",
          "Added Moon Stone to Rustboro Mart post Gym 1.",
          "Dead Pokemon do not get auto-healed in gyms.",
          "Girl in Petalburg Woods now gives 5 Berry Juices instead of 2.",
          "Added Wailmer blockage on Route 109 to prevent skipping mandatory trainers; it clears after beating the last Route 107 trainers.",
          "Fixed missing data on the Focus Punch TM.",
          "Fixed missing collision tiles in Meteor Underpass.",
          "Fixed GC Batch 1 not being a choice.",
          "Replaced Earth Power tutor move with Air Slash.",
          "Swift is now a TM.",
          "Swapped Expert Belt for Twisted Spoon in Abandoned Ship.",
          "Littleroot Town, Route 101, Oldale Town, Route 103, and Route 102 now have snow.",
          "Removed Route 104 <-> Petalburg direct connection; access Route 104 via the escalator in Petalburg Pokemon Center to prevent visual bugs.",
          "Removed Escape Rope from Granite Cave.",
          "Added Escape Rope in Quick Menu Utilities.",
          "Added Astral back sprites for May and Brendan."
        ]
      },
      {
        heading: "Calc/Dex",
        items: [
          "Fixed Simipour typing from Water to Water/Psychic.",
          "Fixed Rillaboom typing from Normal to Grass/Normal.",
          "Fixed Punishment not accounting for other stat boosts.",
          "Frag Sheet updated with more detail and split dropdowns showing Pokemon you've killed.",
          "Fixed Secret Power data from 70 BP to 85 BP.",
          "Dragging a pre-evo onto an evolved form in the same line now merges frags.",
          "Added named save states for Frags to review previous runs.",
          "Added backup save states for Frags as a fallback.",
          "Added item checkbox to treat Pokemon as not holding an item.",
          "Right-click field option now supports locking the field.",
          "Added sprite toggles for form switching.",
          "Added transform button for Ditto.",
          "Frags border now has medal colors for top kills (gold/silver/bronze).",
          "Added a simplified calc layout option.",
          "Highlighting percentages now supports quick side-based calculations.",
          "Search box can now filter a mon's moves and ability.",
          "Fixed Mega Stone availability display.",
          "Updated notes for guaranteed doubles in Starfall Cave, Fiery Path, and Dewford Town.",
          "Added encounter list search bar.",
          "Added dynamic percentages when you have a dupe on a route.",
          "Added Missed and Delay buttons in the encounter sheet.",
          "Condensed the large encounter dropdown.",
          "Added Game Corner."
        ]
      }
    ]
  },
  {
    version: "v0.2.0.0",
    date: "2026-04-17",
    title: "The Real Beta - Pokemon Astral Emerald 0.2.0.0",
    sections: [
      {
        heading: "Overview",
        items: [
          "On a new version of Expansion ( , ).",
          "There might be undocumented changes since a lot has changed.",
          "Custom AI has been added. AI doc is being worked on.",
          "Credit: @Midnight on Discord (report AI questions/bugs to him)."
        ]
      },
      {
        heading: "Updated Abilities",
        items: [
          "Tepig/Pignite Slot 2: Thick Fat -> Iron Fist",
          "Ponyta line Slot 2: Flash Fire -> Striker",
          "Aipom line Slot 2: Ball Fetch/Long Reach -> Skill Link",
          "Unown Slot 1: Levitate -> Wonder Guard",
          "Mawile Slot 1: Hyper Cutter -> Sheer Force",
          "Incineroar Slot 2: None -> Intimidate",
          "Vikavolt Slot 2: None -> Speed Boost",
          "Mantine Slot 2: None -> Sheer Force"
        ]
      },
      {
        heading: "Updated Encounter Table",
        items: [
          "New area: Petalburg Grotto",
          "Removed area: Dark Forest",
          "Basically all encounters have been revamped",
          "New area: Meteor Underpass"
        ]
      },
      {
        heading: "Move Changes",
        items: [
          "Stomp: Normal -> Ground",
          "Bind: 20 BP -> 60 BP",
          "Wrap: 20 BP -> 60 BP",
          "Infestation: 20 BP -> 60 BP",
          "Snap Trap: 20 BP -> 60 BP",
          "Sand Tomb: 20 BP -> 60 BP",
          "Fire Spin: 20 BP -> 60 BP",
          "Clamp: 35 BP -> 60 BP",
          "Whirlpool: 35 BP -> 60 BP",
          "Double-Edge: 120 BP -> 130 BP",
          "Triple Kick: 15 BP -> 20 BP",
          "Frustration: Normal -> Dark",
          "Uproar is now a physical Hyper Voice clone",
          "Needle Arm: 70 BP -> 95 BP",
          "Silver Wind: 60 BP, 10% omni-boost -> 70 BP, 15% omni-boost",
          "Hyper Beam/Giga Impact cannot be used twice in a row and no longer require recharge",
          "Stone Edge: 85 accuracy -> 90 accuracy",
          "Steamroller: 65 BP -> 90 BP",
          "Tar Shot now prevents escaping",
          "Ice Spinner no longer removes terrain and now has a 10% chance to boost Speed",
          "Rollout: 30 BP -> 40 BP",
          "Ice Ball: 30 BP -> 40 BP",
          "Twister: 40 BP -> 60 BP, traps foes, keeps original effects except flinch chance",
          "Smelling Salt: 70 BP -> 100 BP",
          "Sucker Punch: 70 BP -> 80 BP",
          "Sky Attack is one turn when Tailwind is up",
          "Dizzy Punch: Normal 70 BP -> Fairy 75 BP",
          "Tri Attack is now 30 BP and always hits 3 times",
          "Attract and Captivate now work on all genders",
          "Aromatic Mist is now a special 'Coaching'",
          "100% Speed drop Glaciate brought back",
          "Fake Out PP: now 5",
          "Encore PP: now 1"
        ]
      },
      {
        heading: "Updated Moves Buffed in Pokemon Champions",
        items: [
          "Trop Kick: 70 BP -> 85 BP",
          "Infernal Parade was buffed to match Hex, but since it is a signature move it was set to 70 BP",
          "Psyshield Bash: 70 BP -> 90 BP",
          "Spirit Shackle: 80 BP -> 90 BP",
          "First Impression: 90 BP -> 100 BP",
          "Grav Apple: 80 BP -> 90 BP",
          "Apple Acid: 80 BP -> 90 BP",
          "Mountain Gale: 100 BP -> 120 BP",
          "Fire Lash: 80 BP -> 90 BP",
          "Bone Rush: 25 BP -> 30 BP",
          "Night Daze: 85 BP -> 90 BP",
          "Beak Blast: 100 BP -> 120 BP",
          "Revelation Dance: 90 BP -> 100 BP",
          "Hyper Drill: 100 BP -> 120 BP",
          "Triple Dive: 30 BP -> 35 BP",
          "Dragon Hammer: 90 BP -> 100 BP",
          "Snipe Shot: 80 BP -> 85 BP",
          "Slam: 75 BP -> 85 BP",
          "Toxic Threads now drops Speed by 2 stages",
          "Moonblast SpAtk drop is 10% in Champions; instead, PP was nerfed to 10"
        ]
      },
      {
        heading: "Pokemon Changes",
        items: [
          "Grookey is no longer a starter and is replaced by Chikorita",
          "Wailord: +20 Atk, +20 SpAtk, +65 SpDef, -59 Spe",
          "Buizel line: Water -> Water/Normal",
          "Petilil/Lilligant: Grass/Fairy -> Grass",
          "Chinchou now evolves at level 22 (was 21)",
          "Cubone now evolves at level 24 (was 28)",
          "Mega Feraligatr gets Dragonize instead of Strong Jaw",
          "Mega Meganium gets Mega Sol",
          "Veluza gets signature ability 'Surge Cutter' (Swift Swim + Sharpness)",
          "Protean/Libero for player uses Gen 9 behavior; AI uses prior behavior",
          "Unseen Fist/Piercing Drill nerfs apply only to player; AI behaves like old Unseen Fist"
        ]
      },
      {
        heading: "Updated Learnsets",
        items: [
          "Skiploom learns Acrobatics on evolution",
          "Hisuian Lilligant learns Trop Kick",
          "Emboar learns V-create at level 100",
          "Sizzlipede line updated",
          "Heliolisk line updated",
          "Clefable now learns Hurricane and Air Slash",
          "Klink line learns Ice Spinner, Earth Power, Overheat, Temper Flare, Stomping Tantrum, Stone Edge, Rock Blast, Trailblaze, Zen Headbutt",
          "Falinks learns Solar Blade, Power Whip, Lash Out, Superpower",
          "Tatsugiri learns Thunderbolt, Thunder, Flamethrower, Fire Blast, Ice Beam, Blizzard, Power Gem, Fling, Hyper Voice, Vacuum Wave"
        ]
      },
      {
        heading: "Evolution Changes",
        items: [
          "Cubone -> Alolan Marowak: level in Mt. Pyre -> use Fire Stone",
          "Ducklett -> Swanna: level 21 -> level 26",
          "All starter middle evolutions now at level 17"
        ]
      },
      {
        heading: "Trainers",
        items: [
          "Pretty much all trainers have been revamped"
        ]
      },
      {
        heading: "Misc",
        items: [
          "Added Quick Access Menu (porta-PC, healing, day/night toggle, Poke Rider, built-in encounter table, tutor moves). Accessible when obtaining starter and by pressing L",
          "Added PreStatus and PreDamage in Pokemon party menu",
          "Added built-in battle info versus trainers (stat buffs/debuffs, terrain/screen/tailwind turns, 9th damage rolls). If a Pokemon has Illusion, you still cannot tell if it is the Illusion mon",
          "Running Shoes available immediately",
          "Removed Match Calls",
          "Added new starting statuses: Magma Storm, Leech Seed, Gravity, Aurora Veil, Arena Trap, Shadow Tag",
          "Added Give Party button for berries to auto-set six selected berries to party",
          "Wild Double Battles: 10% -> 5%",
          "New mugshot colors: Red, Orange, Purple, White, Black",
          "Gym leader caps have been adjusted",
          "Brock trainer class is now Kanto Leader",
          "Elesa trainer class is now Unova Leader",
          "Jasmine trainer class is now Johto Leader",
          "Cannon moves are boosted by Mega Launcher",
          "Berry Juices are consumables, meaning you do not get them back",
          "Right after nicknaming your starter Pokemon, you are prompted to change its nature"
        ]
      },
      {
        heading: "Calc/Dex",
        items: [
          "Added + and - buttons to calc for quick stat stage changes (credit to Emerald Kaizo calc)",
          "Highlighted the 8th damage roll",
          "Added colored faster/speed tie/slower numbers",
          "Added 1.3x boost on draining moves when equipping Big Root",
          "No longer need to manually unselect weather/terrain; now automatic",
          "Added Trick Room button",
          "Trainer names are now searchable in calc",
          "Added Pokedex button",
          "Added Frag Sheet button",
          "Added Settings button (includes starters by rival fight, move colors, type colors)",
          "Right-clicking enemy mons opens a mark-as-dead menu",
          "Added checkbox for Electromorphosis",
          "Calc now shows PP and Accuracy; accuracy updates dynamically from Fog, Hustle, and Bright Powder",
          "Added held item rarities in dex for wild mons",
          "Can now filter a Pokemon in encounters tab to see locations",
          "Levels are now shown in encounters tab",
          "Pokemon that do not have moves from previous evo now showcase",
          "Added note on mons with 3 perfect IVs on dex page",
          "Typing evolution items in search now shows Pokemon that evolve with that item",
          "Move pages now show if a move is a spread move",
          "Whenever there is a new patch, a popup appears on the dex to show what is new"
        ]
      }
    ]
  }
];
