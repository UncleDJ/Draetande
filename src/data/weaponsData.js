// ── Standard 5e Weapons ──────────────────────────────────────────────────────
// category: 'simple' | 'martial' (for proficiency matching)
// kind: 'melee' | 'ranged'
// properties: array of strings - 'finesse', 'versatile', 'heavy', 'light', 'reach', 'thrown', 'two-handed', 'ammunition', 'loading', 'special'
// versatileDamage: damage when used two-handed (if versatile)
// range: for ranged/thrown weapons

export const WEAPONS = [
  // Simple Melee
  { name: 'Club',            category:'simple', kind:'melee',  damage:'1d4',  damageType:'bludgeoning', properties:['light'] },
  { name: 'Dagger',          category:'simple', kind:'melee',  damage:'1d4',  damageType:'piercing',    properties:['finesse','light','thrown'], range:'20/60' },
  { name: 'Greatclub',       category:'simple', kind:'melee',  damage:'1d8',  damageType:'bludgeoning', properties:['two-handed'] },
  { name: 'Handaxe',         category:'simple', kind:'melee',  damage:'1d6',  damageType:'slashing',    properties:['light','thrown'], range:'20/60' },
  { name: 'Javelin',         category:'simple', kind:'melee',  damage:'1d6',  damageType:'piercing',    properties:['thrown'], range:'30/120' },
  { name: 'Light Hammer',    category:'simple', kind:'melee',  damage:'1d4',  damageType:'bludgeoning', properties:['light','thrown'], range:'20/60' },
  { name: 'Mace',             category:'simple', kind:'melee',  damage:'1d6',  damageType:'bludgeoning', properties:[] },
  { name: 'Quarterstaff',    category:'simple', kind:'melee',  damage:'1d6',  damageType:'bludgeoning', properties:['versatile'], versatileDamage:'1d8' },
  { name: 'Sickle',          category:'simple', kind:'melee',  damage:'1d4',  damageType:'slashing',    properties:['light'] },
  { name: 'Spear',           category:'simple', kind:'melee',  damage:'1d6',  damageType:'piercing',    properties:['thrown','versatile'], versatileDamage:'1d8', range:'20/60' },
  // Simple Ranged
  { name: 'Light Crossbow',  category:'simple', kind:'ranged', damage:'1d8',  damageType:'piercing',    properties:['ammunition','loading','two-handed'], range:'80/320' },
  { name: 'Dart',            category:'simple', kind:'ranged', damage:'1d4',  damageType:'piercing',    properties:['finesse','thrown'], range:'20/60' },
  { name: 'Shortbow',        category:'simple', kind:'ranged', damage:'1d6',  damageType:'piercing',    properties:['ammunition','two-handed'], range:'80/320' },
  { name: 'Sling',           category:'simple', kind:'ranged', damage:'1d4',  damageType:'bludgeoning', properties:['ammunition'], range:'30/120' },
  // Martial Melee
  { name: 'Battleaxe',       category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10' },
  { name: 'Flail',           category:'martial', kind:'melee', damage:'1d8',  damageType:'bludgeoning', properties:[] },
  { name: 'Glaive',          category:'martial', kind:'melee', damage:'1d10', damageType:'slashing',    properties:['heavy','reach','two-handed'] },
  { name: 'Greataxe',        category:'martial', kind:'melee', damage:'1d12', damageType:'slashing',    properties:['heavy','two-handed'] },
  { name: 'Greatsword',      category:'martial', kind:'melee', damage:'2d6',  damageType:'slashing',    properties:['heavy','two-handed'] },
  { name: 'Halberd',         category:'martial', kind:'melee', damage:'1d10', damageType:'slashing',    properties:['heavy','reach','two-handed'] },
  { name: 'Lance',           category:'martial', kind:'melee', damage:'1d12', damageType:'piercing',    properties:['reach','special'] },
  { name: 'Longsword',       category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10' },
  { name: 'Maul',            category:'martial', kind:'melee', damage:'2d6',  damageType:'bludgeoning', properties:['heavy','two-handed'] },
  { name: 'Morningstar',     category:'martial', kind:'melee', damage:'1d8',  damageType:'piercing',    properties:[] },
  { name: 'Pike',            category:'martial', kind:'melee', damage:'1d10', damageType:'piercing',    properties:['heavy','reach','two-handed'] },
  { name: 'Rapier',          category:'martial', kind:'melee', damage:'1d8',  damageType:'piercing',    properties:['finesse'] },
  { name: 'Scimitar',        category:'martial', kind:'melee', damage:'1d6',  damageType:'slashing',    properties:['finesse','light'] },
  { name: 'Shortsword',      category:'martial', kind:'melee', damage:'1d6',  damageType:'piercing',    properties:['finesse','light'] },
  { name: 'Trident',         category:'martial', kind:'melee', damage:'1d6',  damageType:'piercing',    properties:['thrown','versatile'], versatileDamage:'1d8', range:'20/60' },
  { name: 'War Pick',        category:'martial', kind:'melee', damage:'1d8',  damageType:'piercing',    properties:[] },
  { name: 'Warhammer',       category:'martial', kind:'melee', damage:'1d8',  damageType:'bludgeoning', properties:['versatile'], versatileDamage:'1d10' },
  { name: 'Whip',            category:'martial', kind:'melee', damage:'1d4',  damageType:'slashing',    properties:['finesse','reach'] },
  // Martial Ranged
  { name: 'Blowgun',         category:'martial', kind:'ranged', damage:'1',    damageType:'piercing',    properties:['ammunition','loading'], range:'25/100' },
  { name: 'Hand Crossbow',   category:'martial', kind:'ranged', damage:'1d6',  damageType:'piercing',    properties:['ammunition','light','loading'], range:'30/120' },
  { name: 'Heavy Crossbow',  category:'martial', kind:'ranged', damage:'1d10', damageType:'piercing',    properties:['ammunition','heavy','loading','two-handed'], range:'100/400' },
  { name: 'Longbow',         category:'martial', kind:'ranged', damage:'1d8',  damageType:'piercing',    properties:['ammunition','heavy','two-handed'], range:'150/600' },
  { name: 'Net',             category:'martial', kind:'ranged', damage:'',     damageType:'',            properties:['special','thrown'], range:'5/15' },

  // ── Common Magic Weapons ─────────────────────────────────────────────────
  { name: '+1 Dagger',       category:'simple', kind:'melee',  damage:'1d4',  damageType:'piercing',    properties:['finesse','light','thrown'], range:'20/60', atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Shortsword',   category:'martial', kind:'melee', damage:'1d6',  damageType:'piercing',    properties:['finesse','light'], atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Longsword',    category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10', atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Rapier',       category:'martial', kind:'melee', damage:'1d8',  damageType:'piercing',    properties:['finesse'], atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Greatsword',   category:'martial', kind:'melee', damage:'2d6',  damageType:'slashing',    properties:['heavy','two-handed'], atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Battleaxe',    category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10', atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Warhammer',    category:'martial', kind:'melee', damage:'1d8',  damageType:'bludgeoning', properties:['versatile'], versatileDamage:'1d10', atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Longbow',      category:'martial', kind:'ranged', damage:'1d8',  damageType:'piercing',    properties:['ammunition','heavy','two-handed'], range:'150/600', atkMod:1, dmgMod:1, magic:true },
  { name: '+1 Shortbow',     category:'simple', kind:'ranged', damage:'1d6',  damageType:'piercing',    properties:['ammunition','two-handed'], range:'80/320', atkMod:1, dmgMod:1, magic:true },
  { name: '+2 Dagger',       category:'simple', kind:'melee',  damage:'1d4',  damageType:'piercing',    properties:['finesse','light','thrown'], range:'20/60', atkMod:2, dmgMod:2, magic:true },
  { name: '+2 Longsword',    category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10', atkMod:2, dmgMod:2, magic:true },
  { name: '+2 Greatsword',   category:'martial', kind:'melee', damage:'2d6',  damageType:'slashing',    properties:['heavy','two-handed'], atkMod:2, dmgMod:2, magic:true },
  { name: '+3 Longsword',    category:'martial', kind:'melee', damage:'1d8',  damageType:'slashing',    properties:['versatile'], versatileDamage:'1d10', atkMod:3, dmgMod:3, magic:true },
  { name: 'Flame Tongue (Longsword)', category:'martial', kind:'melee', damage:'1d8', damageType:'slashing', properties:['versatile'], versatileDamage:'1d10', extraDamage:'2d6', extraDamageType:'fire', magic:true, note:'Extra 2d6 fire when ignited' },
  { name: 'Frost Brand (Longsword)',  category:'martial', kind:'melee', damage:'1d8', damageType:'slashing', properties:['versatile'], versatileDamage:'1d10', extraDamage:'1d6', extraDamageType:'cold', magic:true, note:'Extra 1d6 cold' },
  { name: 'Vorpal Sword',    category:'martial', kind:'melee', damage:'2d6',  damageType:'slashing',    properties:['heavy','two-handed'], atkMod:3, dmgMod:3, magic:true, note:'Beheads on crit (nat 20)' },
  { name: 'Sun Blade',       category:'martial', kind:'melee', damage:'1d8',  damageType:'radiant',     properties:['finesse','versatile'], versatileDamage:'1d10', atkMod:1, dmgMod:1, magic:true, note:'Radiant damage, acts as light source' },
  { name: 'Holy Avenger (Longsword)', category:'martial', kind:'melee', damage:'1d8', damageType:'slashing', properties:['versatile'], versatileDamage:'1d10', atkMod:2, dmgMod:2, extraDamage:'2d10', extraDamageType:'radiant', magic:true, note:'+2d10 radiant vs fiends/undead' },
  { name: '+1 Hand Crossbow',  category:'martial', kind:'ranged', damage:'1d6', damageType:'piercing', properties:['ammunition','light','loading'], range:'30/120', atkMod:1, dmgMod:1, magic:true },
  { name: 'Unarmed Strike',  category:'simple', kind:'melee', damage:'1',    damageType:'bludgeoning', properties:[], note:'1 + STR mod (or per class feature)' },
];

export const WEAPON_NAMES = WEAPONS.map(w => w.name).sort();

// ── Weapon proficiency categories ────────────────────────────────────────────
export const WEAPON_PROFICIENCIES = [
  'Simple Weapons',
  'Martial Weapons',
  // Specific weapon proficiencies (for classes/races that grant only specific weapons)
  ...WEAPONS.filter(w => !w.magic).map(w => w.name),
];

// ── Armor proficiencies ────────────────────────────────────────────────────────
export const ARMOR_PROFICIENCIES = [
  'Light Armor', 'Medium Armor', 'Heavy Armor', 'Shields',
];

// ── Tool proficiencies ─────────────────────────────────────────────────────────
export const TOOL_PROFICIENCIES = [
  "Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies",
  "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools",
  "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools",
  "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies",
  "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools",
  "Woodcarver's Tools",
  "Disguise Kit", "Forgery Kit", "Herbalism Kit", "Navigator's Tools",
  "Poisoner's Kit", "Thieves' Tools",
  "Bagpipes", "Drum", "Dulcimer", "Flute", "Lute", "Lyre", "Horn",
  "Pan Flute", "Shawm", "Viol",
  "Dice Set", "Playing Card Set",
  "Land Vehicles", "Water Vehicles",
];

// ── Languages ──────────────────────────────────────────────────────────────────
export const LANGUAGES = [
  // Standard
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin',
  'Halfling', 'Orc',
  // Exotic
  'Abyssal', 'Celestial', 'Draconic', 'Deep Speech',
  'Infernal', 'Primordial', 'Sylvan', 'Undercommon',
  // Regional / monstrous
  'Aquan', 'Auran', 'Ignan', 'Terran', 'Druidic', "Thieves' Cant",
  'Aarakocra', 'Gith', 'Sphinx', "Tabaxi", 'Vegepygmy',
];

// ── Helper: get a weapon by name ────────────────────────────────────────────────
export function getWeapon(name) {
  return WEAPONS.find(w => w.name === name);
}

// ── Helper: determine which ability mod a weapon uses ───────────────────────────
// Returns the suggested ability ('STR' or 'DEX') and whether finesse allows choice
export function suggestWeaponAbility(weapon, strMod, dexMod) {
  if (!weapon) return { ability: 'STR', canChoose: false };
  if (weapon.kind === 'ranged' && !weapon.properties?.includes('thrown')) {
    return { ability: 'DEX', canChoose: false };
  }
  if (weapon.properties?.includes('finesse')) {
    return { ability: dexMod > strMod ? 'DEX' : 'STR', canChoose: true };
  }
  if (weapon.kind === 'ranged' || (weapon.properties?.includes('thrown') && weapon.kind === 'ranged')) {
    return { ability: 'DEX', canChoose: false };
  }
  return { ability: 'STR', canChoose: false };
}

// ── Helper: check if character is proficient with a weapon ──────────────────────
export function isWeaponProficient(weapon, weaponProfs = []) {
  if (!weapon) return false;
  if (weaponProfs.includes('Simple Weapons') && weapon.category === 'simple') return true;
  if (weaponProfs.includes('Martial Weapons') && weapon.category === 'martial') return true;
  // Check for specific weapon proficiency (strip +N magic prefix for matching)
  const baseName = weapon.name.replace(/^\+\d+\s/, '').replace(/\s*\([^)]*\)/, '');
  return weaponProfs.some(p => p === weapon.name || p === baseName || weapon.name.includes(p));
}

// ── Default custom weapon template ──────────────────────────────────────────────
export function defaultCustomWeapon() {
  return {
    name: '',
    damage: '1d6',
    damageType: 'slashing',
    category: 'martial',
    kind: 'melee',
    properties: [],
    atkMod: 0,    // flat bonus to attack roll
    dmgMod: 0,    // flat bonus to damage
    useStrMod: true,
    useDexMod: false,
    addProfBonus: true,
    extraDamage: '',
    extraDamageType: '',
    note: '',
  };
}

export const DAMAGE_TYPES = [
  'acid','bludgeoning','cold','fire','force','lightning','necrotic',
  'piercing','poison','psychic','radiant','slashing','thunder',
];
