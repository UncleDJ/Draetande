// Detailed class feature reference.
// Each feature: { name, level, summary (own words), link (SRD wiki) }
// Summaries are concise mechanical paraphrases, NOT verbatim rules text.
// Full official text is linked via `link` to dnd5e.wikidot.com.

const SRD = 'https://dnd5e.wikidot.com';

export const FEATURE_DETAILS = {
  Barbarian: {
    base: `${SRD}/barbarian`,
    features: [
      { level:1, name:'Rage', summary:'As a bonus action, enter a rage for up to 1 minute: bonus melee damage, advantage on STR checks/saves, and resistance to bludgeoning/piercing/slashing damage. Limited uses per long rest, scaling with level.', link:`${SRD}/barbarian` },
      { level:1, name:'Unarmored Defense', summary:'While not wearing armor, your AC equals 10 + DEX modifier + CON modifier. You can still use a shield.', link:`${SRD}/barbarian` },
      { level:2, name:'Reckless Attack', summary:'On your first attack of the turn you can attack recklessly: gain advantage on melee STR attack rolls this turn, but attacks against you have advantage until your next turn.', link:`${SRD}/barbarian` },
      { level:2, name:'Danger Sense', summary:'Advantage on DEX saving throws against effects you can see (traps, spells) as long as you are not blinded, deafened, or incapacitated.', link:`${SRD}/barbarian` },
      { level:3, name:'Primal Path', summary:'Choose a subclass (Berserker, Totem Warrior, etc.) that shapes your rage and grants features now and at 6th, 10th, and 14th level.', link:`${SRD}/barbarian` },
      { level:5, name:'Extra Attack', summary:'You can attack twice, instead of once, whenever you take the Attack action on your turn.', link:`${SRD}/barbarian` },
      { level:5, name:'Fast Movement', summary:'Your speed increases by 10 feet while you are not wearing heavy armor.', link:`${SRD}/barbarian` },
      { level:7, name:'Feral Instinct', summary:'Advantage on initiative rolls. If surprised, you can still act normally on your first turn if you enter your rage first.', link:`${SRD}/barbarian` },
      { level:9, name:'Brutal Critical', summary:'Roll one extra weapon damage die on a critical hit (increases to two dice at 13th, three at 17th).', link:`${SRD}/barbarian` },
      { level:11, name:'Relentless Rage', summary:'If you drop to 0 HP while raging and don\'t die outright, you can make a DC 10 CON save to drop to 1 HP instead. DC rises by 5 each time until you rest.', link:`${SRD}/barbarian` },
      { level:15, name:'Persistent Rage', summary:'Your rage ends early only if you fall unconscious or choose to end it — no longer ends from not attacking or taking damage.', link:`${SRD}/barbarian` },
      { level:18, name:'Indomitable Might', summary:'If your total for a STR check is less than your STR score, you can use your STR score in place of the total.', link:`${SRD}/barbarian` },
      { level:20, name:'Primal Champion', summary:'Your STR and CON scores each increase by 4, to a maximum of 24.', link:`${SRD}/barbarian` },
    ],
  },

  Fighter: {
    base: `${SRD}/fighter`,
    features: [
      { level:1, name:'Fighting Style', summary:'Adopt a combat specialty (Archery, Defense, Dueling, Great Weapon Fighting, Protection, Two-Weapon Fighting) granting a passive bonus.', link:`${SRD}/fighter` },
      { level:1, name:'Second Wind', summary:'Once per short or long rest, use a bonus action to regain 1d10 + fighter level HP.', link:`${SRD}/fighter` },
      { level:2, name:'Action Surge', summary:'Once per short or long rest, take one additional action on your turn (two uses at 17th level).', link:`${SRD}/fighter` },
      { level:3, name:'Martial Archetype', summary:'Choose a subclass (Champion, Battle Master, Eldritch Knight, etc.) granting features now and at 7th, 10th, 15th, and 18th level.', link:`${SRD}/fighter` },
      { level:5, name:'Extra Attack', summary:'Attack twice when you take the Attack action. Increases to three attacks at 11th level and four at 20th.', link:`${SRD}/fighter` },
      { level:9, name:'Indomitable', summary:'Reroll a failed saving throw once per long rest (two uses at 13th, three at 17th).', link:`${SRD}/fighter` },
    ],
  },

  Rogue: {
    base: `${SRD}/rogue`,
    features: [
      { level:1, name:'Expertise', summary:'Double your proficiency bonus for two chosen skill proficiencies (or one skill and thieves\' tools). Choose two more at 6th level.', link:`${SRD}/rogue` },
      { level:1, name:'Sneak Attack', summary:'Once per turn, deal extra damage to a target you hit with a finesse/ranged weapon if you have advantage, or an ally is adjacent to the target. Scales from 1d6 up to 10d6 at level 19.', link:`${SRD}/rogue` },
      { level:1, name:"Thieves' Cant", summary:'A secret coded language of dialect and symbols that lets you hide messages in seemingly normal conversation.', link:`${SRD}/rogue` },
      { level:2, name:'Cunning Action', summary:'Use a bonus action on each of your turns to Dash, Disengage, or Hide.', link:`${SRD}/rogue` },
      { level:3, name:'Roguish Archetype', summary:'Choose a subclass (Thief, Assassin, Arcane Trickster, etc.) granting features now and at 9th, 13th, and 17th level.', link:`${SRD}/rogue` },
      { level:5, name:'Uncanny Dodge', summary:'When an attacker you can see hits you, use your reaction to halve the attack\'s damage.', link:`${SRD}/rogue` },
      { level:7, name:'Evasion', summary:'When subjected to a DEX save for half damage, take no damage on a success and half on a failure.', link:`${SRD}/rogue` },
      { level:11, name:'Reliable Talent', summary:'When you make an ability check using a skill you\'re proficient in, treat any d20 roll of 9 or lower as a 10.', link:`${SRD}/rogue` },
      { level:14, name:'Blindsense', summary:'You\'re aware of the location of any hidden or invisible creature within 10 feet of you.', link:`${SRD}/rogue` },
      { level:15, name:'Slippery Mind', summary:'Gain proficiency in WIS saving throws.', link:`${SRD}/rogue` },
      { level:18, name:'Elusive', summary:'No attack roll has advantage against you while you aren\'t incapacitated.', link:`${SRD}/rogue` },
      { level:20, name:'Stroke of Luck', summary:'Once per short or long rest, turn a missed attack into a hit, or treat a failed ability check\'s d20 as a 20.', link:`${SRD}/rogue` },
    ],
  },

  Monk: {
    base: `${SRD}/monk`,
    features: [
      { level:1, name:'Unarmored Defense', summary:'While unarmored and not using a shield, your AC equals 10 + DEX modifier + WIS modifier.', link:`${SRD}/monk` },
      { level:1, name:'Martial Arts', summary:'Use DEX for unarmed strikes and monk weapons, roll a martial-arts die for damage (scales with level), and make one unarmed strike as a bonus action when you attack.', link:`${SRD}/monk` },
      { level:2, name:'Ki', summary:'Gain ki points (equal to monk level) to fuel Flurry of Blows, Patient Defense, and Step of the Wind. Regained on a short or long rest.', link:`${SRD}/monk` },
      { level:2, name:'Unarmored Movement', summary:'Your speed increases while unarmored (+10 ft, scaling up to +30 ft by level 18). Later lets you move along walls and water.', link:`${SRD}/monk` },
      { level:3, name:'Monastic Tradition', summary:'Choose a subclass (Open Hand, Shadow, Four Elements, etc.) granting features now and at 6th, 11th, and 17th level.', link:`${SRD}/monk` },
      { level:3, name:'Deflect Missiles', summary:'Use your reaction to reduce ranged-weapon damage against you; if reduced to 0 you can catch and throw the missile.', link:`${SRD}/monk` },
      { level:4, name:'Slow Fall', summary:'Use your reaction to reduce falling damage by 5 × your monk level.', link:`${SRD}/monk` },
      { level:5, name:'Extra Attack', summary:'Attack twice when you take the Attack action.', link:`${SRD}/monk` },
      { level:5, name:'Stunning Strike', summary:'Spend 1 ki when you hit with a melee attack to force a CON save or stun the target until your next turn.', link:`${SRD}/monk` },
      { level:6, name:'Ki-Empowered Strikes', summary:'Your unarmed strikes count as magical for overcoming resistance and immunity.', link:`${SRD}/monk` },
      { level:7, name:'Evasion', summary:'Take no damage on a successful DEX save for half damage, and half on a failure.', link:`${SRD}/monk` },
      { level:7, name:'Stillness of Mind', summary:'Use an action to end one effect causing you to be charmed or frightened.', link:`${SRD}/monk` },
      { level:10, name:'Purity of Body', summary:'Immune to disease and poison.', link:`${SRD}/monk` },
      { level:13, name:'Tongue of the Sun and Moon', summary:'You understand all spoken languages and can be understood by anyone who knows a language.', link:`${SRD}/monk` },
      { level:14, name:'Diamond Soul', summary:'Proficiency in all saving throws; spend 1 ki to reroll a failed save.', link:`${SRD}/monk` },
      { level:15, name:'Timeless Body', summary:'You no longer suffer the frailty of old age and can\'t be aged magically; you need no food or water.', link:`${SRD}/monk` },
      { level:18, name:'Empty Body', summary:'Spend 4 ki to become invisible for 1 minute; spend 8 ki to cast Astral Projection.', link:`${SRD}/monk` },
      { level:20, name:'Perfect Self', summary:'When you roll initiative with no ki points, you regain 4.', link:`${SRD}/monk` },
    ],
  },

  Paladin: {
    base: `${SRD}/paladin`,
    features: [
      { level:1, name:'Divine Sense', summary:'As an action, detect celestials, fiends, and undead within 60 feet, plus consecrated/desecrated places. Uses equal to 1 + CHA modifier per long rest.', link:`${SRD}/paladin` },
      { level:1, name:'Lay on Hands', summary:'A pool of healing equal to 5 × paladin level you can distribute by touch; can also cure disease or neutralize poison (5 points each).', link:`${SRD}/paladin` },
      { level:2, name:'Fighting Style', summary:'Choose a combat specialty such as Defense, Dueling, Great Weapon Fighting, or Protection.', link:`${SRD}/paladin` },
      { level:2, name:'Spellcasting', summary:'You gain paladin spell slots (CHA-based, half-caster progression) and prepare paladin spells.', link:`${SRD}/paladin` },
      { level:2, name:'Divine Smite', summary:'When you hit with a melee weapon, expend a spell slot to deal +2d8 radiant damage (more for higher slots, and vs undead/fiends).', link:`${SRD}/paladin` },
      { level:3, name:'Divine Health', summary:'Immune to disease.', link:`${SRD}/paladin` },
      { level:3, name:'Sacred Oath', summary:'Choose a subclass oath (Devotion, Ancients, Vengeance, etc.) granting Channel Divinity options and features now and at 7th, 15th, and 20th level.', link:`${SRD}/paladin` },
      { level:5, name:'Extra Attack', summary:'Attack twice when you take the Attack action.', link:`${SRD}/paladin` },
      { level:6, name:'Aura of Protection', summary:'You and friendly creatures within 10 feet add your CHA modifier to saving throws (range increases to 30 ft at 18th).', link:`${SRD}/paladin` },
      { level:10, name:'Aura of Courage', summary:'You and friendly creatures within 10 feet can\'t be frightened while you\'re conscious.', link:`${SRD}/paladin` },
      { level:11, name:'Improved Divine Smite', summary:'All your melee weapon hits deal an extra 1d8 radiant damage.', link:`${SRD}/paladin` },
      { level:14, name:'Cleansing Touch', summary:'Use an action to end one spell on yourself or a willing creature you touch. Uses equal to CHA modifier per long rest.', link:`${SRD}/paladin` },
    ],
  },

  Ranger: {
    base: `${SRD}/ranger`,
    features: [
      { level:1, name:'Favored Enemy', summary:'Choose a creature type you have advantage to track and recall lore about; learn a related language.', link:`${SRD}/ranger` },
      { level:1, name:'Natural Explorer', summary:'Choose a favored terrain where you gain travel and navigation benefits (difficult terrain doesn\'t slow your group, you\'re always alert, etc.).', link:`${SRD}/ranger` },
      { level:2, name:'Fighting Style', summary:'Choose a combat specialty: Archery, Defense, Dueling, or Two-Weapon Fighting.', link:`${SRD}/ranger` },
      { level:2, name:'Spellcasting', summary:'You gain ranger spell slots (WIS-based, half-caster progression) and learn ranger spells.', link:`${SRD}/ranger` },
      { level:3, name:'Ranger Archetype', summary:'Choose a subclass (Hunter, Beast Master, etc.) granting features now and at 7th, 11th, and 15th level.', link:`${SRD}/ranger` },
      { level:3, name:'Primeval Awareness', summary:'Spend a spell slot to sense whether certain creature types are present within several miles.', link:`${SRD}/ranger` },
      { level:5, name:'Extra Attack', summary:'Attack twice when you take the Attack action.', link:`${SRD}/ranger` },
      { level:8, name:"Land's Stride", summary:'Move through nonmagical difficult terrain without penalty and pass through plants without being slowed; advantage on saves vs magical plants.', link:`${SRD}/ranger` },
      { level:10, name:'Hide in Plain Sight', summary:'Spend 1 minute camouflaging yourself to gain +10 to Stealth checks while you remain still.', link:`${SRD}/ranger` },
      { level:14, name:'Vanish', summary:'Hide as a bonus action; you can\'t be tracked by nonmagical means unless you choose to leave a trail.', link:`${SRD}/ranger` },
      { level:18, name:'Feral Senses', summary:'You can fight invisible creatures without disadvantage and sense unseen creatures within 30 feet.', link:`${SRD}/ranger` },
      { level:20, name:'Foe Slayer', summary:'Once per turn, add your WIS modifier to an attack or damage roll against a favored enemy.', link:`${SRD}/ranger` },
    ],
  },

  Bard: {
    base: `${SRD}/bard`,
    features: [
      { level:1, name:'Spellcasting', summary:'A CHA-based full caster who knows a limited number of spells of any bard spell and casts using spell slots.', link:`${SRD}/bard` },
      { level:1, name:'Bardic Inspiration', summary:'As a bonus action, give a creature a Bardic Inspiration die (d6, scaling to d12) they can add to one ability check, attack, or save within 10 minutes. Uses equal to CHA modifier.', link:`${SRD}/bard` },
      { level:2, name:'Jack of All Trades', summary:'Add half your proficiency bonus (rounded down) to any ability check that doesn\'t already include it.', link:`${SRD}/bard` },
      { level:2, name:'Song of Rest', summary:'During a short rest, you and allies who hear your performance regain extra HP (1d6, scaling) when spending Hit Dice.', link:`${SRD}/bard` },
      { level:3, name:'Bard College', summary:'Choose a subclass (Lore, Valor, etc.) granting features now and at 6th and 14th level.', link:`${SRD}/bard` },
      { level:3, name:'Expertise', summary:'Double proficiency for two skills (two more at 10th level).', link:`${SRD}/bard` },
      { level:5, name:'Font of Inspiration', summary:'You regain all expended Bardic Inspiration on a short or long rest (previously only long).', link:`${SRD}/bard` },
      { level:6, name:'Countercharm', summary:'Use an action to grant yourself and nearby allies advantage on saves vs being frightened or charmed.', link:`${SRD}/bard` },
      { level:10, name:'Magical Secrets', summary:'Learn two spells from any class\'s spell list, treated as bard spells (again at 14th and 18th).', link:`${SRD}/bard` },
      { level:20, name:'Superior Inspiration', summary:'When you roll initiative with no Bardic Inspiration left, you regain one.', link:`${SRD}/bard` },
    ],
  },

  Cleric: {
    base: `${SRD}/cleric`,
    features: [
      { level:1, name:'Spellcasting', summary:'A WIS-based full caster who prepares spells from the entire cleric list each day.', link:`${SRD}/cleric` },
      { level:1, name:'Divine Domain', summary:'Choose a subclass domain (Life, Light, War, etc.) granting bonus spells and features now and at 2nd, 6th, 8th, and 17th level.', link:`${SRD}/cleric` },
      { level:2, name:'Channel Divinity', summary:'Channel divine energy for Turn Undead and a domain-specific effect. Uses scale with level (1 → 2 at 6th → 3 at 18th), recovered on a rest.', link:`${SRD}/cleric` },
      { level:5, name:'Destroy Undead', summary:'When you Turn Undead, weaker undead are destroyed outright instead of just turned (CR threshold rises with level).', link:`${SRD}/cleric` },
      { level:10, name:'Divine Intervention', summary:'Call on your deity for aid; roll d100 ≤ cleric level to succeed. Once successful, can\'t use again for 7 days.', link:`${SRD}/cleric` },
      { level:20, name:'Divine Intervention Improvement', summary:'Your Divine Intervention automatically succeeds, no roll required.', link:`${SRD}/cleric` },
    ],
  },

  Druid: {
    base: `${SRD}/druid`,
    features: [
      { level:1, name:'Druidic', summary:'You know Druidic, the secret language of druids, and can leave hidden messages others won\'t notice.', link:`${SRD}/druid` },
      { level:1, name:'Spellcasting', summary:'A WIS-based full caster who prepares spells from the entire druid list each day.', link:`${SRD}/druid` },
      { level:2, name:'Wild Shape', summary:'As an action, transform into a beast you\'ve seen (CR and movement limits by level) for a number of hours. Two uses per short/long rest.', link:`${SRD}/druid` },
      { level:2, name:'Druid Circle', summary:'Choose a subclass (Land, Moon, etc.) granting features now and at 6th, 10th, and 14th level.', link:`${SRD}/druid` },
      { level:18, name:'Timeless Body', summary:'You age more slowly — for every 10 years that pass, your body ages only 1 year.', link:`${SRD}/druid` },
      { level:18, name:'Beast Spells', summary:'You can cast many druid spells in Wild Shape form, using verbal/somatic components while transformed.', link:`${SRD}/druid` },
      { level:20, name:'Archdruid', summary:'Unlimited use of Wild Shape, and you can ignore verbal/somatic/material components of druid spells (without costly materials).', link:`${SRD}/druid` },
    ],
  },

  Sorcerer: {
    base: `${SRD}/sorcerer`,
    features: [
      { level:1, name:'Spellcasting', summary:'A CHA-based full caster who knows a limited set of sorcerer spells and casts with spell slots.', link:`${SRD}/sorcerer` },
      { level:1, name:'Sorcerous Origin', summary:'Choose a subclass (Draconic Bloodline, Wild Magic, etc.) granting features now and at 6th, 14th, and 18th level.', link:`${SRD}/sorcerer` },
      { level:2, name:'Font of Magic', summary:'Gain sorcery points (equal to level) you can convert to/from spell slots.', link:`${SRD}/sorcerer` },
      { level:3, name:'Metamagic', summary:'Learn ways to bend spells using sorcery points (Twin, Quicken, Subtle, Empower, etc.). Learn more at 10th and 17th level.', link:`${SRD}/sorcerer` },
      { level:20, name:'Sorcerous Restoration', summary:'Regain 4 sorcery points on a short rest.', link:`${SRD}/sorcerer` },
    ],
  },

  Warlock: {
    base: `${SRD}/warlock`,
    features: [
      { level:1, name:'Otherworldly Patron', summary:'Choose a subclass patron (Fiend, Archfey, Great Old One, etc.) granting features now and at 6th, 10th, and 14th level.', link:`${SRD}/warlock` },
      { level:1, name:'Pact Magic', summary:'A CHA-based caster with few but high-level spell slots that all recharge on a short rest.', link:`${SRD}/warlock` },
      { level:2, name:'Eldritch Invocations', summary:'Learn invocations — permanent magical abilities and enhancements. Number known grows with level and choices can be swapped on level-up.', link:`${SRD}/warlock` },
      { level:3, name:'Pact Boon', summary:'Choose a pact gift: Pact of the Chain (familiar), Blade (weapon), or Tome (extra cantrips).', link:`${SRD}/warlock` },
      { level:11, name:'Mystic Arcanum (6th)', summary:'Choose one 6th-level spell you can cast once per long rest without a spell slot (7th at 13th, 8th at 15th, 9th at 17th).', link:`${SRD}/warlock` },
      { level:20, name:'Eldritch Master', summary:'Spend 1 minute entreating your patron to regain all expended Pact Magic spell slots, once per long rest.', link:`${SRD}/warlock` },
    ],
  },

  Wizard: {
    base: `${SRD}/wizard`,
    features: [
      { level:1, name:'Spellcasting', summary:'An INT-based full caster who prepares spells from your spellbook each day and can ritual-cast spells in the book.', link:`${SRD}/wizard` },
      { level:1, name:'Arcane Recovery', summary:'Once per day on a short rest, recover spell slots totaling up to half your wizard level (no slot above 5th).', link:`${SRD}/wizard` },
      { level:2, name:'Arcane Tradition', summary:'Choose a subclass school (Evocation, Abjuration, etc.) granting features now and at 6th, 10th, and 14th level.', link:`${SRD}/wizard` },
      { level:18, name:'Spell Mastery', summary:'Choose a 1st- and 2nd-level spell you can cast at will without expending a slot.', link:`${SRD}/wizard` },
      { level:20, name:'Signature Spells', summary:'Choose two 3rd-level spells you always have prepared and can each cast once per short rest without a slot.', link:`${SRD}/wizard` },
    ],
  },

  Artificer: {
    base: `${SRD}/artificer`,
    features: [
      { level:1, name:'Magical Tinkering', summary:'Imbue tiny nonmagical objects with minor magical properties (light, a recorded message, a sound, etc.).', link:`${SRD}/artificer` },
      { level:1, name:'Spellcasting', summary:'An INT-based half-caster who prepares artificer spells and must use tools as spellcasting focuses.', link:`${SRD}/artificer` },
      { level:2, name:'Infuse Item', summary:'Learn infusions to imbue mundane items with magic (replicate magic items, enhance armor/weapons, etc.). Known and active infusions scale with level.', link:`${SRD}/artificer` },
      { level:3, name:'Artificer Specialist', summary:'Choose a subclass (Alchemist, Artillerist, Battle Smith, etc.) granting features now and at 5th, 9th, and 15th level.', link:`${SRD}/artificer` },
      { level:3, name:'The Right Tool for the Job', summary:'During a short or long rest, magically create one set of artisan\'s tools.', link:`${SRD}/artificer` },
      { level:6, name:'Tool Expertise', summary:'Double your proficiency bonus for any tool proficiencies.', link:`${SRD}/artificer` },
      { level:7, name:'Flash of Genius', summary:'When you or a nearby ally makes an ability check or save, use your reaction to add your INT modifier. Uses equal to INT modifier per long rest.', link:`${SRD}/artificer` },
      { level:10, name:'Magic Item Adept', summary:'Craft common/uncommon magic items faster and cheaper, and can attune to one extra item.', link:`${SRD}/artificer` },
      { level:11, name:'Spell-Storing Item', summary:'Store a 1st- or 2nd-level spell in an item that others can use a set number of times.', link:`${SRD}/artificer` },
      { level:14, name:'Magic Item Savant', summary:'Attune to up to five magic items and ignore all class/race/level/spell attunement requirements.', link:`${SRD}/artificer` },
      { level:18, name:'Magic Item Master', summary:'Attune to up to six magic items at once.', link:`${SRD}/artificer` },
      { level:20, name:'Soul of Artifice', summary:'Gain +1 to all saves per attuned item; can drop one item\'s magic to stay at 1 HP instead of dropping to 0.', link:`${SRD}/artificer` },
    ],
  },
};

