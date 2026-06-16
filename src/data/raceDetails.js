// Race / subrace trait reference. Keyed by race name -> { link, traits:[{name, summary}] }
// Concise mechanical paraphrases in our own words, with SRD links for full text.

const SRD = 'https://dnd5e.wikidot.com';
const L = `${SRD}/lineage`;

export const RACE_DETAILS = {
  'Dragonborn': { link:`${SRD}/dragonborn`, traits:[
    { name:'Ability Scores', summary:'+2 STR, +1 CHA.' },
    { name:'Draconic Ancestry', summary:'Choose a dragon type, setting your breath weapon shape and damage type.' },
    { name:'Breath Weapon', summary:'Exhale destructive energy in a line or cone (DEX or CON save); damage scales with level. Recharges on a rest.' },
    { name:'Damage Resistance', summary:'Resistance to the damage type tied to your ancestry.' },
  ]},
  'Dwarf': { link:`${SRD}/dwarf`, traits:[
    { name:'Ability Scores', summary:'+2 CON (subrace adds more).' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as if bright, and darkness as dim (greyscale).' },
    { name:'Dwarven Resilience', summary:'Advantage on saves vs poison and resistance to poison damage.' },
    { name:'Dwarven Combat Training', summary:'Proficiency with battleaxe, handaxe, light hammer, and warhammer.' },
    { name:'Stonecunning', summary:'Treat History checks about stonework as proficient with double proficiency bonus.' },
  ]},
  'Hill Dwarf': { link:`${SRD}/dwarf`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +1 WIS.' },
    { name:'Dwarven Toughness', summary:'+1 max HP per level.' },
  ]},
  'Mountain Dwarf': { link:`${SRD}/dwarf`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +2 STR.' },
    { name:'Dwarven Armor Training', summary:'Proficiency with light and medium armor.' },
  ]},
  'Elf': { link:`${SRD}/elf`, traits:[
    { name:'Ability Scores', summary:'+2 DEX (subrace adds more).' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Keen Senses', summary:'Proficiency in Perception.' },
    { name:'Fey Ancestry', summary:'Advantage vs being charmed; magic can\'t put you to sleep.' },
    { name:'Trance', summary:'Meditate 4 hours instead of sleeping 8 for a long rest.' },
  ]},
  'High Elf': { link:`${SRD}/elf`, traits:[
    { name:'Ability Scores', summary:'+2 DEX, +1 INT.' },
    { name:'Elf Weapon Training', summary:'Proficiency with longsword, shortsword, shortbow, and longbow.' },
    { name:'Cantrip', summary:'Know one wizard cantrip (INT is your casting ability).' },
    { name:'Extra Language', summary:'Learn one additional language.' },
  ]},
  'Wood Elf': { link:`${SRD}/elf`, traits:[
    { name:'Ability Scores', summary:'+2 DEX, +1 WIS.' },
    { name:'Elf Weapon Training', summary:'Proficiency with longsword, shortsword, shortbow, and longbow.' },
    { name:'Fleet of Foot', summary:'Base walking speed increases to 35 ft.' },
    { name:'Mask of the Wild', summary:'Can attempt to hide even when only lightly obscured by natural phenomena.' },
  ]},
  'Drow (Dark Elf)': { link:`${SRD}/elf`, traits:[
    { name:'Ability Scores', summary:'+2 DEX, +1 CHA.' },
    { name:'Superior Darkvision', summary:'Darkvision out to 120 ft.' },
    { name:'Sunlight Sensitivity', summary:'Disadvantage on attacks and Perception (sight) in direct sunlight.' },
    { name:'Drow Magic', summary:'Know Dancing Lights; gain Faerie Fire at 3rd and Darkness at 5th (CHA-based, 1/day each).' },
    { name:'Drow Weapon Training', summary:'Proficiency with rapiers, shortswords, and hand crossbows.' },
  ]},
  'Gnome': { link:`${SRD}/gnome`, traits:[
    { name:'Ability Scores', summary:'+2 INT (subrace adds more).' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Gnome Cunning', summary:'Advantage on INT, WIS, and CHA saves against magic.' },
  ]},
  'Forest Gnome': { link:`${SRD}/gnome`, traits:[
    { name:'Ability Scores', summary:'+2 INT, +1 DEX.' },
    { name:'Natural Illusionist', summary:'Know the Minor Illusion cantrip (INT-based).' },
    { name:'Speak with Small Beasts', summary:'Communicate simple ideas with Small or smaller beasts.' },
  ]},
  'Rock Gnome': { link:`${SRD}/gnome`, traits:[
    { name:'Ability Scores', summary:'+2 INT, +1 CON.' },
    { name:'Artificer\'s Lore', summary:'Add double proficiency to History checks about magic/alchemical/tech items.' },
    { name:'Tinker', summary:'Proficiency with tinker\'s tools; build tiny clockwork devices.' },
  ]},
  'Half-Elf': { link:`${SRD}/half-elf`, traits:[
    { name:'Ability Scores', summary:'+2 CHA, and +1 to two other abilities of your choice.' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Fey Ancestry', summary:'Advantage vs charm; magic can\'t put you to sleep.' },
    { name:'Skill Versatility', summary:'Proficiency in two skills of your choice.' },
  ]},
  'Half-Orc': { link:`${SRD}/half-orc`, traits:[
    { name:'Ability Scores', summary:'+2 STR, +1 CON.' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Menacing', summary:'Proficiency in Intimidation.' },
    { name:'Relentless Endurance', summary:'When reduced to 0 HP (not killed), drop to 1 instead, once per long rest.' },
    { name:'Savage Attacks', summary:'On a melee weapon crit, roll one extra weapon damage die.' },
  ]},
  'Halfling': { link:`${SRD}/halfling`, traits:[
    { name:'Ability Scores', summary:'+2 DEX (subrace adds more).' },
    { name:'Lucky', summary:'When you roll a 1 on a d20 for an attack, check, or save, reroll and use the new roll.' },
    { name:'Brave', summary:'Advantage on saves against being frightened.' },
    { name:'Halfling Nimbleness', summary:'Move through the space of any creature larger than you.' },
  ]},
  'Lightfoot Halfling': { link:`${SRD}/halfling`, traits:[
    { name:'Ability Scores', summary:'+2 DEX, +1 CHA.' },
    { name:'Naturally Stealthy', summary:'Can hide behind a creature at least one size larger.' },
  ]},
  'Stout Halfling': { link:`${SRD}/halfling`, traits:[
    { name:'Ability Scores', summary:'+2 DEX, +1 CON.' },
    { name:'Stout Resilience', summary:'Advantage vs poison saves and resistance to poison damage.' },
  ]},
  'Human': { link:`${SRD}/human`, traits:[
    { name:'Ability Scores', summary:'+1 to all six ability scores (standard human).' },
  ]},
  'Human (Variant)': { link:`${SRD}/human`, traits:[
    { name:'Ability Scores', summary:'+1 to two abilities of your choice.' },
    { name:'Skill', summary:'Proficiency in one skill of your choice.' },
    { name:'Feat', summary:'Gain one feat of your choice at 1st level.' },
  ]},
  'Tiefling': { link:`${SRD}/tiefling`, traits:[
    { name:'Ability Scores', summary:'+2 CHA, +1 INT.' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Hellish Resistance', summary:'Resistance to fire damage.' },
    { name:'Infernal Legacy', summary:'Know Thaumaturgy; gain Hellish Rebuke at 3rd and Darkness at 5th (CHA-based, 1/day each).' },
  ]},
  'Genasi, Fire': { link:`${SRD}/genasi`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +1 INT.' },
    { name:'Darkvision', summary:'See in dim light within 60 ft as bright, darkness as dim.' },
    { name:'Fire Resistance', summary:'Resistance to fire damage.' },
    { name:'Reach to the Blaze', summary:'Know Produce Flame; gain Burning Hands at 3rd level (CON-based, 1/day).' },
  ]},
  'Genasi, Water': { link:`${SRD}/genasi`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +1 WIS.' },
    { name:'Acid Resistance', summary:'Resistance to acid damage.' },
    { name:'Amphibious', summary:'Breathe both air and water.' },
    { name:'Swim', summary:'Swimming speed of 30 ft.' },
    { name:'Call to the Wave', summary:'Know Shape Water; gain Create or Destroy Water at 3rd level (CON-based, 1/day).' },
  ]},
  'Genasi, Air': { link:`${SRD}/genasi`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +1 DEX.' },
    { name:'Unending Breath', summary:'You can hold your breath indefinitely while not incapacitated.' },
    { name:'Mingle with the Wind', summary:'Gain Levitate at 3rd level (CON-based, 1/day).' },
  ]},
  'Genasi, Earth': { link:`${SRD}/genasi`, traits:[
    { name:'Ability Scores', summary:'+2 CON, +1 STR.' },
    { name:'Earth Walk', summary:'Move across difficult terrain made of earth or stone without penalty.' },
    { name:'Merge with Stone', summary:'Gain Pass without Trace at 3rd level (CON-based, 1/day).' },
  ]},
};
