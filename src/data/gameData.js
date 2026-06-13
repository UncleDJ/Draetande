// ── Classes ───────────────────────────────────────────────────────────────────
export const CLASSES = {
  Artificer:  { hd: 8,  spellAbility: 'Intelligence', hasPrepare: true,  isHalfCaster: false, spellStart: 1 },
  Barbarian:  { hd: 12, spellAbility: null,            hasPrepare: false, isHalfCaster: false, spellStart: 0 },
  Bard:       { hd: 8,  spellAbility: 'Charisma',     hasPrepare: false, isHalfCaster: false, spellStart: 1 },
  Cleric:     { hd: 8,  spellAbility: 'Wisdom',       hasPrepare: true,  isHalfCaster: false, spellStart: 1 },
  Druid:      { hd: 8,  spellAbility: 'Wisdom',       hasPrepare: true,  isHalfCaster: false, spellStart: 1 },
  Fighter:    { hd: 10, spellAbility: 'Intelligence', hasPrepare: false, isHalfCaster: false, spellStart: 3, subclassSpell: 'Eldritch Knight' },
  Monk:       { hd: 8,  spellAbility: null,            hasPrepare: false, isHalfCaster: false, spellStart: 0 },
  Paladin:    { hd: 10, spellAbility: 'Charisma',     hasPrepare: true,  isHalfCaster: true,  spellStart: 2 },
  Ranger:     { hd: 10, spellAbility: 'Wisdom',       hasPrepare: false, isHalfCaster: true,  spellStart: 2 },
  Rogue:      { hd: 8,  spellAbility: 'Intelligence', hasPrepare: false, isHalfCaster: false, spellStart: 3, subclassSpell: 'Arcane Trickster' },
  Sorcerer:   { hd: 6,  spellAbility: 'Charisma',     hasPrepare: false, isHalfCaster: false, spellStart: 1 },
  Warlock:    { hd: 8,  spellAbility: 'Charisma',     hasPrepare: false, isHalfCaster: false, spellStart: 1, isPactMagic: true },
  Wizard:     { hd: 6,  spellAbility: 'Intelligence', hasPrepare: true,  isHalfCaster: false, spellStart: 1 },
};

export const CLASS_NAMES = Object.keys(CLASSES).sort();

// ── Spell slots per class per level ───────────────────────────────────────────
// Format: [cantrips, s1, s2, s3, s4, s5, s6, s7, s8, s9]
const S = (arr) => arr;
export const SPELL_SLOTS = {
  Bard: {
    1:  S([2,2,0,0,0,0,0,0,0,0]),
    2:  S([2,3,0,0,0,0,0,0,0,0]),
    3:  S([2,4,2,0,0,0,0,0,0,0]),
    4:  S([3,4,3,0,0,0,0,0,0,0]),
    5:  S([3,4,3,2,0,0,0,0,0,0]),
    6:  S([3,4,3,3,0,0,0,0,0,0]),
    7:  S([3,4,3,3,1,0,0,0,0,0]),
    8:  S([3,4,3,3,2,0,0,0,0,0]),
    9:  S([3,4,3,3,3,1,0,0,0,0]),
    10: S([4,4,3,3,3,2,0,0,0,0]),
    11: S([4,4,3,3,3,2,1,0,0,0]),
    12: S([4,4,3,3,3,2,1,0,0,0]),
    13: S([4,4,3,3,3,2,1,1,0,0]),
    14: S([4,4,3,3,3,2,1,1,0,0]),
    15: S([4,4,3,3,3,2,1,1,1,0]),
    16: S([4,4,3,3,3,2,1,1,1,0]),
    17: S([4,4,3,3,3,2,1,1,1,1]),
    18: S([4,4,3,3,3,3,1,1,1,1]),
    19: S([4,4,3,3,3,3,2,1,1,1]),
    20: S([4,4,3,3,3,3,2,2,1,1]),
  },
  Cleric: {
    1:  S([3,2,0,0,0,0,0,0,0,0]),
    2:  S([3,3,0,0,0,0,0,0,0,0]),
    3:  S([3,4,2,0,0,0,0,0,0,0]),
    4:  S([4,4,3,0,0,0,0,0,0,0]),
    5:  S([4,4,3,2,0,0,0,0,0,0]),
    6:  S([4,4,3,3,0,0,0,0,0,0]),
    7:  S([4,4,3,3,1,0,0,0,0,0]),
    8:  S([4,4,3,3,2,0,0,0,0,0]),
    9:  S([4,4,3,3,3,1,0,0,0,0]),
    10: S([5,4,3,3,3,2,0,0,0,0]),
    11: S([5,4,3,3,3,2,1,0,0,0]),
    12: S([5,4,3,3,3,2,1,0,0,0]),
    13: S([5,4,3,3,3,2,1,1,0,0]),
    14: S([5,4,3,3,3,2,1,1,0,0]),
    15: S([5,4,3,3,3,2,1,1,1,0]),
    16: S([5,4,3,3,3,2,1,1,1,0]),
    17: S([5,4,3,3,3,2,1,1,1,1]),
    18: S([5,4,3,3,3,3,1,1,1,1]),
    19: S([5,4,3,3,3,3,2,1,1,1]),
    20: S([5,4,3,3,3,3,2,2,1,1]),
  },
  Druid: {
    1:  S([2,2,0,0,0,0,0,0,0,0]),
    2:  S([2,3,0,0,0,0,0,0,0,0]),
    3:  S([2,4,2,0,0,0,0,0,0,0]),
    4:  S([3,4,3,0,0,0,0,0,0,0]),
    5:  S([3,4,3,2,0,0,0,0,0,0]),
    6:  S([3,4,3,3,0,0,0,0,0,0]),
    7:  S([3,4,3,3,1,0,0,0,0,0]),
    8:  S([3,4,3,3,2,0,0,0,0,0]),
    9:  S([3,4,3,3,3,1,0,0,0,0]),
    10: S([4,4,3,3,3,2,0,0,0,0]),
    11: S([4,4,3,3,3,2,1,0,0,0]),
    12: S([4,4,3,3,3,2,1,0,0,0]),
    13: S([4,4,3,3,3,2,1,1,0,0]),
    14: S([4,4,3,3,3,2,1,1,0,0]),
    15: S([4,4,3,3,3,2,1,1,1,0]),
    16: S([4,4,3,3,3,2,1,1,1,0]),
    17: S([4,4,3,3,3,2,1,1,1,1]),
    18: S([4,4,3,3,3,3,1,1,1,1]),
    19: S([4,4,3,3,3,3,2,1,1,1]),
    20: S([4,4,3,3,3,3,2,2,1,1]),
  },
  Sorcerer: {
    1:  S([4,2,0,0,0,0,0,0,0,0]),
    2:  S([4,3,0,0,0,0,0,0,0,0]),
    3:  S([4,4,2,0,0,0,0,0,0,0]),
    4:  S([5,4,3,0,0,0,0,0,0,0]),
    5:  S([5,4,3,2,0,0,0,0,0,0]),
    6:  S([5,4,3,3,0,0,0,0,0,0]),
    7:  S([5,4,3,3,1,0,0,0,0,0]),
    8:  S([5,4,3,3,2,0,0,0,0,0]),
    9:  S([5,4,3,3,3,1,0,0,0,0]),
    10: S([6,4,3,3,3,2,0,0,0,0]),
    11: S([6,4,3,3,3,2,1,0,0,0]),
    12: S([6,4,3,3,3,2,1,0,0,0]),
    13: S([6,4,3,3,3,2,1,1,0,0]),
    14: S([6,4,3,3,3,2,1,1,0,0]),
    15: S([6,4,3,3,3,2,1,1,1,0]),
    16: S([6,4,3,3,3,2,1,1,1,0]),
    17: S([6,4,3,3,3,2,1,1,1,1]),
    18: S([6,4,3,3,3,3,1,1,1,1]),
    19: S([6,4,3,3,3,3,2,1,1,1]),
    20: S([6,4,3,3,3,3,2,2,1,1]),
  },
  Wizard: {
    1:  S([3,2,0,0,0,0,0,0,0,0]),
    2:  S([3,3,0,0,0,0,0,0,0,0]),
    3:  S([3,4,2,0,0,0,0,0,0,0]),
    4:  S([4,4,3,0,0,0,0,0,0,0]),
    5:  S([4,4,3,2,0,0,0,0,0,0]),
    6:  S([4,4,3,3,0,0,0,0,0,0]),
    7:  S([4,4,3,3,1,0,0,0,0,0]),
    8:  S([4,4,3,3,2,0,0,0,0,0]),
    9:  S([4,4,3,3,3,1,0,0,0,0]),
    10: S([5,4,3,3,3,2,0,0,0,0]),
    11: S([5,4,3,3,3,2,1,0,0,0]),
    12: S([5,4,3,3,3,2,1,0,0,0]),
    13: S([5,4,3,3,3,2,1,1,0,0]),
    14: S([5,4,3,3,3,2,1,1,0,0]),
    15: S([5,4,3,3,3,2,1,1,1,0]),
    16: S([5,4,3,3,3,2,1,1,1,0]),
    17: S([5,4,3,3,3,2,1,1,1,1]),
    18: S([5,4,3,3,3,3,1,1,1,1]),
    19: S([5,4,3,3,3,3,2,1,1,1]),
    20: S([5,4,3,3,3,3,2,2,1,1]),
  },
  Artificer: {
    1:  S([2,2,0,0,0,0,0,0,0,0]),
    2:  S([2,2,0,0,0,0,0,0,0,0]),
    3:  S([2,3,0,0,0,0,0,0,0,0]),
    4:  S([2,3,0,0,0,0,0,0,0,0]),
    5:  S([2,4,2,0,0,0,0,0,0,0]),
    6:  S([2,4,2,0,0,0,0,0,0,0]),
    7:  S([2,4,3,0,0,0,0,0,0,0]),
    8:  S([2,4,3,0,0,0,0,0,0,0]),
    9:  S([2,4,3,2,0,0,0,0,0,0]),
    10: S([3,4,3,2,0,0,0,0,0,0]),
    11: S([3,4,3,3,0,0,0,0,0,0]),
    12: S([3,4,3,3,0,0,0,0,0,0]),
    13: S([3,4,3,3,1,0,0,0,0,0]),
    14: S([4,4,3,3,1,0,0,0,0,0]),
    15: S([4,4,3,3,2,0,0,0,0,0]),
    16: S([4,4,3,3,2,0,0,0,0,0]),
    17: S([4,4,3,3,3,1,0,0,0,0]),
    18: S([4,4,3,3,3,1,0,0,0,0]),
    19: S([4,4,3,3,3,2,0,0,0,0]),
    20: S([4,4,3,3,3,2,0,0,0,0]),
  },
  Paladin: {
    2:  S([0,2,0,0,0,0,0,0,0,0]),
    3:  S([0,3,0,0,0,0,0,0,0,0]),
    4:  S([0,3,0,0,0,0,0,0,0,0]),
    5:  S([0,4,2,0,0,0,0,0,0,0]),
    6:  S([0,4,2,0,0,0,0,0,0,0]),
    7:  S([0,4,3,0,0,0,0,0,0,0]),
    8:  S([0,4,3,0,0,0,0,0,0,0]),
    9:  S([0,4,3,2,0,0,0,0,0,0]),
    10: S([0,4,3,2,0,0,0,0,0,0]),
    11: S([0,4,3,3,0,0,0,0,0,0]),
    12: S([0,4,3,3,0,0,0,0,0,0]),
    13: S([0,4,3,3,1,0,0,0,0,0]),
    14: S([0,4,3,3,1,0,0,0,0,0]),
    15: S([0,4,3,3,2,0,0,0,0,0]),
    16: S([0,4,3,3,2,0,0,0,0,0]),
    17: S([0,4,3,3,3,1,0,0,0,0]),
    18: S([0,4,3,3,3,1,0,0,0,0]),
    19: S([0,4,3,3,3,2,0,0,0,0]),
    20: S([0,4,3,3,3,2,0,0,0,0]),
  },
  Ranger: {
    2:  S([0,2,0,0,0,0,0,0,0,0]),
    3:  S([0,3,0,0,0,0,0,0,0,0]),
    4:  S([0,3,0,0,0,0,0,0,0,0]),
    5:  S([0,4,2,0,0,0,0,0,0,0]),
    6:  S([0,4,2,0,0,0,0,0,0,0]),
    7:  S([0,4,3,0,0,0,0,0,0,0]),
    8:  S([0,4,3,0,0,0,0,0,0,0]),
    9:  S([0,4,3,2,0,0,0,0,0,0]),
    10: S([0,4,3,2,0,0,0,0,0,0]),
    11: S([0,4,3,3,0,0,0,0,0,0]),
    12: S([0,4,3,3,0,0,0,0,0,0]),
    13: S([0,4,3,3,1,0,0,0,0,0]),
    14: S([0,4,3,3,1,0,0,0,0,0]),
    15: S([0,4,3,3,2,0,0,0,0,0]),
    16: S([0,4,3,3,2,0,0,0,0,0]),
    17: S([0,4,3,3,3,1,0,0,0,0]),
    18: S([0,4,3,3,3,1,0,0,0,0]),
    19: S([0,4,3,3,3,2,0,0,0,0]),
    20: S([0,4,3,3,3,2,0,0,0,0]),
  },
  // Warlock - pact magic: count = slots, all at pact level
  Warlock: {
    1:  { pact: { count: 1, level: 1 }, cantrips: 2 },
    2:  { pact: { count: 2, level: 1 }, cantrips: 2 },
    3:  { pact: { count: 2, level: 2 }, cantrips: 2 },
    4:  { pact: { count: 2, level: 2 }, cantrips: 3 },
    5:  { pact: { count: 2, level: 3 }, cantrips: 3 },
    6:  { pact: { count: 2, level: 3 }, cantrips: 3 },
    7:  { pact: { count: 2, level: 4 }, cantrips: 3 },
    8:  { pact: { count: 2, level: 4 }, cantrips: 3 },
    9:  { pact: { count: 2, level: 5 }, cantrips: 3 },
    10: { pact: { count: 2, level: 5 }, cantrips: 4 },
    11: { pact: { count: 3, level: 5 }, cantrips: 4 },
    12: { pact: { count: 3, level: 5 }, cantrips: 4 },
    13: { pact: { count: 3, level: 5 }, cantrips: 4 },
    14: { pact: { count: 3, level: 5 }, cantrips: 4 },
    15: { pact: { count: 3, level: 5 }, cantrips: 4 },
    16: { pact: { count: 3, level: 5 }, cantrips: 4 },
    17: { pact: { count: 4, level: 5 }, cantrips: 4 },
    18: { pact: { count: 4, level: 5 }, cantrips: 4 },
    19: { pact: { count: 4, level: 5 }, cantrips: 4 },
    20: { pact: { count: 4, level: 5 }, cantrips: 4 },
  },
};

// Fallback for non-caster levels
export function getSpellSlots(className, level) {
  const classSlots = SPELL_SLOTS[className];
  if (!classSlots) return null;
  // Find the highest defined level <= current level
  for (let l = level; l >= 1; l--) {
    if (classSlots[l]) return classSlots[l];
  }
  return null;
}

// ── Class features by level ────────────────────────────────────────────────────
export const CLASS_FEATURES = {
  Barbarian: {
    1:  ['Rage (2/long rest, +2 dmg)', 'Unarmored Defense (10+DEX+CON)'],
    2:  ['Reckless Attack', 'Danger Sense'],
    3:  ['Primal Path (subclass)', 'Rage: 3/long rest'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Extra Attack', 'Fast Movement (+10 ft)'],
    6:  ['Path Feature', 'Rage: 4/long rest'],
    7:  ['Feral Instinct'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Brutal Critical (1 die)', 'Rage: +3 dmg'],
    10: ['Path Feature'],
    11: ['Relentless Rage'],
    12: ['ASI or Feat ⚠', 'Rage: 5/long rest'],
    13: ['Brutal Critical (2 dice)'],
    14: ['Path Feature'],
    15: ['Persistent Rage'],
    16: ['ASI or Feat ⚠', 'Rage: +4 dmg'],
    17: ['Brutal Critical (3 dice)', 'Rage: 6/long rest'],
    18: ['Indomitable Might'],
    19: ['ASI or Feat ⚠'],
    20: ['Primal Champion (+4 STR, +4 CON, max 24)'],
  },
  Bard: {
    1:  ['Spellcasting (Charisma)', 'Bardic Inspiration (d6, CHA mod/long rest)'],
    2:  ['Jack of All Trades', 'Song of Rest (d6)'],
    3:  ['Expertise (2 skills)', 'Bard College (subclass)'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Bardic Inspiration: d8', 'Font of Inspiration'],
    6:  ['College Feature', 'Countercharm'],
    7:  [],
    8:  ['ASI or Feat ⚠'],
    9:  ['Song of Rest: d8'],
    10: ['Bardic Inspiration: d10', 'Expertise (2 more)', 'Magical Secrets'],
    11: [],
    12: ['ASI or Feat ⚠'],
    13: ['Song of Rest: d10'],
    14: ['College Feature', 'Magical Secrets'],
    15: ['Bardic Inspiration: d12'],
    16: ['ASI or Feat ⚠'],
    17: ['Song of Rest: d12'],
    18: ['Magical Secrets'],
    19: ['ASI or Feat ⚠'],
    20: ['Superior Inspiration'],
  },
  Cleric: {
    1:  ['Spellcasting (Wisdom)', 'Divine Domain (subclass)'],
    2:  ['Channel Divinity: 1/rest', 'Turn Undead', 'Harness Divine Power'],
    3:  ['Domain Feature'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Destroy Undead CR½'],
    6:  ['Channel Divinity: 2/rest', 'Domain Feature'],
    7:  [],
    8:  ['ASI or Feat ⚠', 'Destroy Undead CR1', 'Domain Feature'],
    9:  [],
    10: ['Divine Intervention'],
    11: ['Destroy Undead CR2'],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Destroy Undead CR3', 'Domain Feature'],
    15: [],
    16: ['ASI or Feat ⚠'],
    17: ['Destroy Undead CR4', 'Domain Feature'],
    18: ['Channel Divinity: 3/rest'],
    19: ['ASI or Feat ⚠'],
    20: ['Divine Intervention (guaranteed)'],
  },
  Druid: {
    1:  ['Druidic language', 'Spellcasting (Wisdom)'],
    2:  ['Wild Shape (2/rest)', 'Druid Circle (subclass)'],
    3:  [],
    4:  ['ASI or Feat ⚠', 'Wild Shape improvement'],
    5:  [],
    6:  ['Circle Feature'],
    7:  [],
    8:  ['ASI or Feat ⚠', 'Wild Shape improvement'],
    9:  [],
    10: ['Circle Feature'],
    11: [],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Circle Feature'],
    15: [],
    16: ['ASI or Feat ⚠'],
    17: [],
    18: ['Timeless Body', 'Beast Spells'],
    19: ['ASI or Feat ⚠'],
    20: ['Archdruid (unlimited Wild Shape)'],
  },
  Fighter: {
    1:  ['Fighting Style', 'Second Wind (1d10+level, 1/rest)'],
    2:  ['Action Surge (1/rest)'],
    3:  ['Martial Archetype (subclass)'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Extra Attack'],
    6:  ['ASI or Feat ⚠'],
    7:  ['Archetype Feature'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Indomitable (1/long rest)'],
    10: ['Archetype Feature'],
    11: ['Extra Attack (2)'],
    12: ['ASI or Feat ⚠'],
    13: ['Indomitable (2 uses)'],
    14: ['ASI or Feat ⚠'],
    15: ['Archetype Feature'],
    16: ['ASI or Feat ⚠'],
    17: ['Action Surge (2/rest)', 'Indomitable (3 uses)'],
    18: ['Archetype Feature'],
    19: ['ASI or Feat ⚠'],
    20: ['Extra Attack (3)'],
  },
  Monk: {
    1:  ['Unarmored Defense (10+DEX+WIS)', 'Martial Arts'],
    2:  ['Ki Points (=level)', 'Flurry of Blows', 'Patient Defense', 'Step of the Wind', 'Unarmored Movement +10'],
    3:  ['Deflect Missiles', 'Monastic Tradition (subclass)'],
    4:  ['ASI or Feat ⚠', 'Slow Fall'],
    5:  ['Extra Attack', 'Stunning Strike'],
    6:  ['Ki-Empowered Strikes', 'Tradition Feature', 'Unarmored Movement +15'],
    7:  ['Evasion', 'Stillness of Mind'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Unarmored Movement +15 (wall run)'],
    10: ['Purity of Body', 'Unarmored Movement +20'],
    11: ['Tradition Feature'],
    12: ['ASI or Feat ⚠'],
    13: ['Tongue of the Sun and Moon'],
    14: ['Diamond Soul', 'Unarmored Movement +25'],
    15: ['Timeless Body'],
    16: ['ASI or Feat ⚠'],
    17: ['Tradition Feature'],
    18: ['Empty Body', 'Unarmored Movement +30'],
    19: ['ASI or Feat ⚠'],
    20: ['Perfect Self'],
  },
  Paladin: {
    1:  ['Divine Sense (1+CHA mod/long rest)', 'Lay on Hands (5×level HP pool)'],
    2:  ['Spellcasting (Charisma)', 'Divine Smite', 'Fighting Style'],
    3:  ['Sacred Oath (subclass)', 'Divine Health', 'Channel Divinity'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Extra Attack'],
    6:  ['Aura of Protection (CHA to saves, 10 ft)'],
    7:  ['Oath Feature'],
    8:  ['ASI or Feat ⚠'],
    9:  [],
    10: ['Aura of Courage (immune frightened, 10 ft)'],
    11: ['Improved Divine Smite (+1d8 radiant)'],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Cleansing Touch (CHA mod/long rest)'],
    15: ['Oath Feature'],
    16: ['ASI or Feat ⚠'],
    17: [],
    18: ['Aura improvements (30 ft)'],
    19: ['ASI or Feat ⚠'],
    20: ['Oath Capstone'],
  },
  Ranger: {
    1:  ['Favored Enemy', 'Natural Explorer'],
    2:  ['Spellcasting (Wisdom)', 'Fighting Style'],
    3:  ['Primeval Awareness', 'Ranger Archetype (subclass)'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Extra Attack'],
    6:  ['Favored Enemy improvement', 'Natural Explorer improvement'],
    7:  ['Archetype Feature'],
    8:  ['ASI or Feat ⚠', "Land's Stride"],
    9:  [],
    10: ['Hide in Plain Sight', 'Natural Explorer improvement'],
    11: ['Archetype Feature'],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Vanish', 'Favored Enemy improvement'],
    15: ['Archetype Feature'],
    16: ['ASI or Feat ⚠'],
    17: [],
    18: ['Feral Senses'],
    19: ['ASI or Feat ⚠'],
    20: ['Foe Slayer'],
  },
  Rogue: {
    1:  ['Expertise (2 skills)', 'Sneak Attack (1d6)', "Thieves' Cant"],
    2:  ['Cunning Action'],
    3:  ['Sneak Attack (2d6)', 'Roguish Archetype (subclass)'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Sneak Attack (3d6)', 'Uncanny Dodge'],
    6:  ['ASI or Feat ⚠', 'Expertise (2 more)'],
    7:  ['Sneak Attack (4d6)', 'Evasion'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Sneak Attack (5d6)'],
    10: ['ASI or Feat ⚠'],
    11: ['Sneak Attack (6d6)', 'Reliable Talent'],
    12: ['ASI or Feat ⚠'],
    13: ['Sneak Attack (7d6)'],
    14: ['Blindsense'],
    15: ['Sneak Attack (8d6)', 'Slippery Mind'],
    16: ['ASI or Feat ⚠'],
    17: ['Sneak Attack (9d6)'],
    18: ['Elusive'],
    19: ['ASI or Feat ⚠', 'Sneak Attack (10d6)'],
    20: ['Stroke of Luck (1/long rest)'],
  },
  Sorcerer: {
    1:  ['Spellcasting (Charisma)', 'Sorcerous Origin (subclass)'],
    2:  ['Font of Magic (Sorcery Points = level)'],
    3:  ['Metamagic (2 options)'],
    4:  ['ASI or Feat ⚠'],
    5:  [],
    6:  ['Origin Feature'],
    7:  [],
    8:  ['ASI or Feat ⚠'],
    9:  [],
    10: ['Metamagic (3rd option)'],
    11: [],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Origin Feature'],
    15: [],
    16: ['ASI or Feat ⚠'],
    17: ['Metamagic (4th option)'],
    18: ['Origin Feature'],
    19: ['ASI or Feat ⚠'],
    20: ['Sorcerous Restoration'],
  },
  Warlock: {
    1:  ['Pact Magic (Charisma)', 'Otherworldly Patron (subclass)'],
    2:  ['Eldritch Invocations (2)'],
    3:  ['Pact Boon'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Eldritch Invocations (3)'],
    6:  ['Patron Feature'],
    7:  ['Eldritch Invocations (4)'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Eldritch Invocations (5)'],
    10: ['Patron Feature'],
    11: ['Mystic Arcanum (6th)', 'Eldritch Invocations (6)'],
    12: ['ASI or Feat ⚠'],
    13: ['Mystic Arcanum (7th)'],
    14: ['Patron Feature'],
    15: ['Mystic Arcanum (8th)', 'Eldritch Invocations (7)'],
    16: ['ASI or Feat ⚠'],
    17: ['Mystic Arcanum (9th)'],
    18: ['Eldritch Invocations (8)'],
    19: ['ASI or Feat ⚠'],
    20: ['Eldritch Master'],
  },
  Wizard: {
    1:  ['Spellcasting (Intelligence)', 'Arcane Recovery'],
    2:  ['Arcane Tradition (subclass)'],
    3:  [],
    4:  ['ASI or Feat ⚠'],
    5:  [],
    6:  ['Tradition Feature'],
    7:  [],
    8:  ['ASI or Feat ⚠'],
    9:  [],
    10: ['Tradition Feature'],
    11: [],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Tradition Feature'],
    15: [],
    16: ['ASI or Feat ⚠'],
    17: [],
    18: ['Spell Mastery', 'Tradition Feature'],
    19: ['ASI or Feat ⚠'],
    20: ['Signature Spells'],
  },
  Artificer: {
    1:  ['Magical Tinkering', 'Spellcasting (Intelligence)'],
    2:  ['Infuse Item (4 infusions)'],
    3:  ['Artificer Specialist (subclass)', 'The Right Tool for the Job'],
    4:  ['ASI or Feat ⚠'],
    5:  ['Arcane Armament'],
    6:  ['Specialist Feature', 'Tool Expertise'],
    7:  ['Flash of Genius'],
    8:  ['ASI or Feat ⚠'],
    9:  ['Specialist Feature'],
    10: ['Magic Item Adept'],
    11: ['Spell-Storing Item'],
    12: ['ASI or Feat ⚠'],
    13: [],
    14: ['Magic Item Savant', 'Specialist Feature'],
    15: [],
    16: ['ASI or Feat ⚠'],
    17: ['Specialist Feature'],
    18: ['Magic Item Master'],
    19: ['ASI or Feat ⚠'],
    20: ['Soul of Artifice'],
  },
};

// ── Class resources ────────────────────────────────────────────────────────────
export function getClassResources(className, level, chaMod = 0, wisMod = 0) {
  const resources = [];
  switch (className) {
    case 'Barbarian': {
      const rages = level >= 17 ? 6 : level >= 12 ? 5 : level >= 6 ? 4 : level >= 3 ? 3 : 2;
      const dmg   = level >= 16 ? 4 : level >= 9 ? 3 : 2;
      resources.push({ name: 'Rage', max: rages, reset: 'Long Rest' });
      resources.push({ name: `Rage Damage Bonus`, max: dmg, reset: '—', note: `+${dmg} to damage` });
      break;
    }
    case 'Bard': {
      const insp = Math.max(1, chaMod);
      const die  = level >= 15 ? 'd12' : level >= 10 ? 'd10' : level >= 5 ? 'd8' : 'd6';
      resources.push({ name: `Bardic Inspiration (${die})`, max: insp, reset: 'Long Rest' });
      break;
    }
    case 'Cleric': {
      const cd = level >= 18 ? 3 : level >= 6 ? 2 : 1;
      resources.push({ name: 'Channel Divinity', max: cd, reset: 'Short Rest' });
      break;
    }
    case 'Druid':
      resources.push({ name: 'Wild Shape', max: 2, reset: 'Short Rest' });
      break;
    case 'Fighter': {
      const as = level >= 17 ? 2 : 1;
      resources.push({ name: 'Second Wind', max: 1, reset: 'Short Rest' });
      resources.push({ name: 'Action Surge', max: as, reset: 'Short Rest' });
      if (level >= 9) {
        const ind = level >= 17 ? 3 : level >= 13 ? 2 : 1;
        resources.push({ name: 'Indomitable', max: ind, reset: 'Long Rest' });
      }
      break;
    }
    case 'Monk':
      resources.push({ name: 'Ki Points', max: level, reset: 'Short Rest' });
      if (level >= 6) resources.push({ name: 'Wholeness of Body', max: 1, reset: 'Long Rest' });
      break;
    case 'Paladin': {
      const loh = level * 5;
      const cd  = level >= 3 ? 1 : 0;
      resources.push({ name: 'Lay on Hands Pool', max: loh, reset: 'Long Rest', note: `${loh} HP total` });
      if (cd) resources.push({ name: 'Channel Divinity', max: 1, reset: 'Short Rest' });
      if (level >= 14) {
        const ct = Math.max(1, chaMod);
        resources.push({ name: 'Cleansing Touch', max: ct, reset: 'Long Rest' });
      }
      break;
    }
    case 'Sorcerer':
      resources.push({ name: 'Sorcery Points', max: level, reset: 'Long Rest' });
      break;
    case 'Warlock': {
      const slots = SPELL_SLOTS.Warlock[level];
      if (slots) {
        resources.push({ name: `Pact Slots (lvl ${slots.pact.level})`, max: slots.pact.count, reset: 'Short Rest' });
      }
      const invoc = level >= 18 ? 8 : level >= 15 ? 7 : level >= 12 ? 6 : level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : 2;
      resources.push({ name: 'Invocations Known', max: invoc, reset: '—', note: `${invoc} invocations` });
      break;
    }
    case 'Wizard':
      resources.push({ name: 'Arcane Recovery', max: 1, reset: 'Long Rest', note: `Recover ${Math.ceil(level/2)} spell slot levels` });
      break;
    case 'Artificer': {
      const inf = level >= 18 ? 12 : level >= 14 ? 10 : level >= 10 ? 8 : level >= 6 ? 6 : 4;
      resources.push({ name: 'Infusions Known', max: inf, reset: '—', note: `${inf} infusions` });
      break;
    }
    default: break;
  }
  return resources;
}

// ── Proficiency bonus by level ─────────────────────────────────────────────────
export function getProfBonus(level) {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9)  return 4;
  if (level >= 5)  return 3;
  return 2;
}

// ── Ability modifier ───────────────────────────────────────────────────────────
export function getMod(score) {
  return Math.floor((score - 10) / 2);
}

export function fmtMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// ── XP thresholds ─────────────────────────────────────────────────────────────
export const XP_THRESHOLDS = [0,300,900,2700,6500,14000,23000,34000,48000,64000,
  85000,100000,120000,140000,165000,195000,225000,265000,305000,355000];

// ── Skills ────────────────────────────────────────────────────────────────────
export const SKILLS = [
  { name: 'Acrobatics',     ability: 'DEX' },
  { name: 'Animal Handling',ability: 'WIS' },
  { name: 'Arcana',         ability: 'INT' },
  { name: 'Athletics',      ability: 'STR' },
  { name: 'Deception',      ability: 'CHA' },
  { name: 'History',        ability: 'INT' },
  { name: 'Insight',        ability: 'WIS' },
  { name: 'Intimidation',   ability: 'CHA' },
  { name: 'Investigation',  ability: 'INT' },
  { name: 'Medicine',       ability: 'WIS' },
  { name: 'Nature',         ability: 'INT' },
  { name: 'Perception',     ability: 'WIS' },
  { name: 'Performance',    ability: 'CHA' },
  { name: 'Persuasion',     ability: 'CHA' },
  { name: 'Religion',       ability: 'INT' },
  { name: 'Sleight of Hand',ability: 'DEX' },
  { name: 'Stealth',        ability: 'DEX' },
  { name: 'Survival',       ability: 'WIS' },
];

// ── Races ─────────────────────────────────────────────────────────────────────
export const RACES = [
  { name: 'Dragonborn',         bonuses: { STR: 2, CHA: 1 }, speed: 30 },
  { name: 'Dwarf, Hill',        bonuses: { CON: 2, WIS: 1 }, speed: 25 },
  { name: 'Dwarf, Mountain',    bonuses: { CON: 2, STR: 2 }, speed: 25 },
  { name: 'Elf, Drow',          bonuses: { DEX: 2, CHA: 1 }, speed: 30 },
  { name: 'Elf, High',          bonuses: { DEX: 2, INT: 1 }, speed: 30 },
  { name: 'Elf, Wood',          bonuses: { DEX: 2, WIS: 1 }, speed: 35 },
  { name: 'Gnome, Forest',      bonuses: { INT: 2, DEX: 1 }, speed: 25 },
  { name: 'Gnome, Rock',        bonuses: { INT: 2, CON: 1 }, speed: 25 },
  { name: 'Half-Elf',           bonuses: { CHA: 2 },         speed: 30, note: '+1 to two others (choose)' },
  { name: 'Half-Orc',           bonuses: { STR: 2, CON: 1 }, speed: 30 },
  { name: 'Halfling, Lightfoot',bonuses: { DEX: 2, CHA: 1 }, speed: 25 },
  { name: 'Halfling, Stout',    bonuses: { DEX: 2, CON: 1 }, speed: 25 },
  { name: 'Human',              bonuses: { STR:1,DEX:1,CON:1,INT:1,WIS:1,CHA:1 }, speed: 30 },
  { name: 'Human, Variant',     bonuses: {},                  speed: 30, note: '+1 to two abilities (choose)' },
  { name: 'Tiefling',           bonuses: { CHA: 2, INT: 1 }, speed: 30 },
  { name: 'Aarakocra',          bonuses: { DEX: 2, WIS: 2 }, speed: 25, flySpeed: 50 },
  { name: 'Aasimar',            bonuses: { CHA: 2, WIS: 1 }, speed: 30 },
  { name: 'Firbolg',            bonuses: { WIS: 2, STR: 1 }, speed: 30 },
  { name: 'Genasi, Air',        bonuses: { CON: 2, DEX: 1 }, speed: 30 },
  { name: 'Genasi, Earth',      bonuses: { CON: 2, STR: 1 }, speed: 30 },
  { name: 'Genasi, Fire',       bonuses: { CON: 2, INT: 1 }, speed: 30 },
  { name: 'Genasi, Water',      bonuses: { CON: 2, WIS: 1 }, speed: 30 },
  { name: 'Goliath',            bonuses: { STR: 2, CON: 1 }, speed: 30 },
  { name: 'Kenku',              bonuses: { DEX: 2, WIS: 1 }, speed: 30 },
  { name: 'Lizardfolk',         bonuses: { CON: 2, WIS: 1 }, speed: 30 },
  { name: 'Tabaxi',             bonuses: { DEX: 2, CHA: 1 }, speed: 30 },
  { name: 'Tortle',             bonuses: { STR: 2, WIS: 1 }, speed: 30 },
  { name: 'Triton',             bonuses: { STR: 1, CON: 1, CHA: 1 }, speed: 30 },
  { name: 'Yuan-ti Pureblood',  bonuses: { CHA: 2, INT: 1 }, speed: 30 },
  { name: 'Bugbear',            bonuses: { STR: 2, DEX: 1 }, speed: 30 },
  { name: 'Goblin',             bonuses: { DEX: 2, CON: 1 }, speed: 30 },
  { name: 'Hobgoblin',          bonuses: { CON: 2, INT: 1 }, speed: 30 },
  { name: 'Kobold',             bonuses: { DEX: 2, INT: 1 }, speed: 30 },
  { name: 'Orc',                bonuses: { STR: 2, CON: 1 }, speed: 30 },
  { name: 'Custom Lineage',     bonuses: {},                  speed: 30, note: '+2 to one ability (choose)' },
];

export const RACE_NAMES = RACES.map(r => r.name).sort();

// ── Backgrounds ───────────────────────────────────────────────────────────────
export const BACKGROUNDS = [
  'Acolyte','Anthropologist','Archaeologist','Athlete','Charlatan','City Watch',
  'Clan Crafter','Cloistered Scholar','Courtier','Criminal','Entertainer',
  'Faceless','Faction Agent','Far Traveler','Feylost','Fisher','Folk Hero',
  'Gambler','Giant Foundling','Gladiator','Guild Artisan','Guild Merchant',
  'Haunted One','Hermit','House Agent','Inheritor','Investigator','Knight',
  'Knight of Solamnia','Marine','Mercenary Veteran','Noble','Outlander',
  'Pirate','Planar Philosopher','Rewarded','Rune Carver','Sage','Sailor',
  'Shipwright','Smuggler','Soldier','Spy','Urban Bounty Hunter','Urchin',
  'Uthgardt Tribe Member','Waterdhavian Noble','Wildspacer','Witchlight Hand',
];

// ── Alignments ────────────────────────────────────────────────────────────────
export const ALIGNMENTS = [
  'Lawful Good','Neutral Good','Chaotic Good',
  'Lawful Neutral','True Neutral','Chaotic Neutral',
  'Lawful Evil','Neutral Evil','Chaotic Evil','Unaligned',
];

// ── FR Deities ─────────────────────────────────────────────────────────────────
export const DEITIES = [
  'Ao','Asmodeus','Auril','Azuth','Bane','Beshaba','Bhaal','Chauntea',
  'Cyric','Deneir','Eldath','Gond','Helm','Ilmater','Jergal','Kelemvor',
  'Kossuth','Lathander','Leira','Lolth','Loviatar','Lurue','Malar','Mask',
  'Mielikki','Milil','Moradin','Myrkul','Mystra','Oghma','Red Knight',
  'Savras','Selûne','Shar','Silvanus','Sune','Talos','Tempus','Torm',
  'Tymora','Tyr','Umberlee','Valkur','Waukeen','Bahamut','Tiamat',
  'Corellon Larethian','Gruumsh','The Raven Queen','The Traveler',
  'None / Unaligned','Other (custom)',
];

// ── Coin types ─────────────────────────────────────────────────────────────────
export const COINS = ['CP','SP','EP','GP','PP'];

// ── Custom spell template ──────────────────────────────────────────────────────
export function defaultCustomSpell() {
  return {
    id: '',           // generated client-side (timestamp-based)
    name: '',
    level: 0,
    school: 'Evocation',
    time: '1 action',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    ritual: false,
    classes: [],
    damage: '',          // e.g. '3d6'
    damageType: '',
    savingThrow: '',     // e.g. 'DEX' or ''
    description: '',     // player's own description
  };
}

export const SPELL_SCHOOLS = [
  'Abjuration','Conjuration','Divination','Enchantment',
  'Evocation','Illusion','Necromancy','Transmutation',
];

export const CASTING_TIMES = [
  '1 action','1 bonus action','1 reaction','1 minute','10 minutes','1 hour','8 hours','Special',
];

export const SPELL_DURATIONS = [
  'Instantaneous','1 round','1 minute','10 minutes','1 hour',
  '8 hours','24 hours','Until dispelled','Concentration, up to 1 minute',
  'Concentration, up to 10 minutes','Concentration, up to 1 hour',
  'Concentration, up to 8 hours','Special',
];


export function defaultCharacter(userId, campaignId) {
  return {
    user_id: userId,
    campaign_id: campaignId,
    // Note: 'id' is omitted here - Supabase generates it on insert (gen_random_uuid())
    session_id: null,
    is_active: true,
    // Identity
    character_name: '',
    player_name: '',
    class_name: '',
    level: 1,
    race: '',
    background: '',
    alignment: '',
    deity: '',
    experience: 0,
    age: '',
    height: '',
    weight: '',
    // Ability scores (base rolls)
    str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
    // Saving throw proficiencies
    save_profs: [],
    // Skill proficiencies/expertise
    skill_profs: {},   // { 'Acrobatics': 'proficient' | 'expertise' }
    // Combat
    ac: 10,
    max_hp: 0,
    current_hp: 0,
    temp_hp: 0,
    // Resources (expended counts - maxes calculated from class)
    resources_used: {},
    // Spell slots expended
    slots_expended: [0,0,0,0,0,0,0,0,0],  // index 0=L1 ... 8=L9
    pact_slots_expended: 0,
    // Spells
    spells: {
      cantrips: [], l1: [], l2: [], l3: [], l4: [],
      l5: [], l6: [], l7: [], l8: [], l9: [],
    },
    // Text fields
    personality_traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    features_traits: '',
    equipment: '',
    other_profs: '',
    // Currency
    cp: 0, sp: 0, ep: 0, gp: 0, pp: 0,
    // Attacks - each: { weapon: name from WEAPONS or custom def, ability: 'STR'|'DEX'|null (override),
    //                    customWeapon: {...} if custom, notes: '' }
    attacks: [
      { weapon: '', ability: null, customWeapon: null, notes: '' },
      { weapon: '', ability: null, customWeapon: null, notes: '' },
      { weapon: '', ability: null, customWeapon: null, notes: '' },
    ],
    // Proficiencies
    weapon_profs: [],   // e.g. ['Simple Weapons','Martial Weapons','Shortsword']
    armor_profs: [],    // e.g. ['Light Armor','Medium Armor','Shields']
    tool_profs: [],     // e.g. ["Thieves' Tools"]
    languages: ['Common'],
    // Player notes (freeform, persistent)
    game_notes: '',
    // Notes (legacy field - kept for compatibility)
    notes: '',
  };
}
