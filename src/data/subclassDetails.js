// Subclass feature reference. Keyed by class -> subclass name -> { link, features:[{level,name,summary,link}] }
// Summaries are concise mechanical paraphrases in our own words, NOT verbatim rules text.

const SRD = 'https://dnd5e.wikidot.com';

export const SUBCLASS_DETAILS = {
  Barbarian: {
    'Path of the Berserker': {
      link: `${SRD}/barbarian:path-of-the-berserker`,
      features: [
        { level:3, name:'Frenzy', summary:'While raging, you can frenzy to make a single melee weapon attack as a bonus action each turn. When the rage ends you suffer one level of exhaustion.', link:`${SRD}/barbarian:path-of-the-berserker` },
        { level:6, name:'Mindless Rage', summary:'You can\'t be charmed or frightened while raging; if already affected, the effect is suspended for the rage\'s duration.', link:`${SRD}/barbarian:path-of-the-berserker` },
        { level:10, name:'Intimidating Presence', summary:'Use an action to frighten a creature within 30 ft (WIS save). You can extend the fear each turn as an action.', link:`${SRD}/barbarian:path-of-the-berserker` },
        { level:14, name:'Retaliation', summary:'When a creature within 5 ft damages you, use your reaction to make a melee weapon attack against it.', link:`${SRD}/barbarian:path-of-the-berserker` },
      ],
    },
    'Path of the Totem Warrior': {
      link: `${SRD}/barbarian:path-of-the-totem-warrior`,
      features: [
        { level:3, name:'Spirit Seeker / Totem Spirit', summary:'Gain ritual casting of Beast Sense and Speak with Animals, and choose a totem animal (Bear, Eagle, Wolf, etc.) granting a benefit while raging — e.g. Bear gives resistance to all damage except psychic.', link:`${SRD}/barbarian:path-of-the-totem-warrior` },
        { level:6, name:'Aspect of the Beast', summary:'Gain a passive benefit from a chosen animal (e.g. Bear doubles carrying capacity, Eagle grants keen sight).', link:`${SRD}/barbarian:path-of-the-totem-warrior` },
        { level:10, name:'Spirit Walker', summary:'Cast Commune with Nature as a ritual; a spirit animal appears to answer.', link:`${SRD}/barbarian:path-of-the-totem-warrior` },
        { level:14, name:'Totemic Attunement', summary:'Gain a powerful combat benefit from a chosen animal (e.g. Bear forces nearby enemies to have disadvantage attacking others, Wolf lets you knock enemies prone).', link:`${SRD}/barbarian:path-of-the-totem-warrior` },
      ],
    },
  },

  Bard: {
    'College of Lore': {
      link: `${SRD}/bard:college-of-lore`,
      features: [
        { level:3, name:'Bonus Proficiencies', summary:'Gain proficiency in three skills of your choice.', link:`${SRD}/bard:college-of-lore` },
        { level:3, name:'Cutting Words', summary:'Use your reaction and a Bardic Inspiration die to subtract from an enemy\'s attack, ability check, or damage roll.', link:`${SRD}/bard:college-of-lore` },
        { level:6, name:'Additional Magical Secrets', summary:'Learn two spells from any class, which don\'t count against your spells known.', link:`${SRD}/bard:college-of-lore` },
        { level:14, name:'Peerless Skill', summary:'When you make an ability check, spend a Bardic Inspiration die to add it to the roll.', link:`${SRD}/bard:college-of-lore` },
      ],
    },
    'College of Valor': {
      link: `${SRD}/bard:college-of-valor`,
      features: [
        { level:3, name:'Bonus Proficiencies', summary:'Gain proficiency with medium armor, shields, and martial weapons.', link:`${SRD}/bard:college-of-valor` },
        { level:3, name:'Combat Inspiration', summary:'A creature with your Bardic Inspiration can add the die to a weapon\'s damage, or to AC against one attack.', link:`${SRD}/bard:college-of-valor` },
        { level:6, name:'Extra Attack', summary:'Attack twice when you take the Attack action.', link:`${SRD}/bard:college-of-valor` },
        { level:14, name:'Battle Magic', summary:'When you cast a bard spell with your action, you can make one weapon attack as a bonus action.', link:`${SRD}/bard:college-of-valor` },
      ],
    },
  },

  Cleric: {
    'Life Domain': {
      link: `${SRD}/cleric:life-domain`,
      features: [
        { level:1, name:'Bonus Proficiency & Disciple of Life', summary:'Gain heavy armor proficiency. Healing spells of 1st level or higher restore extra HP equal to 2 + the spell\'s level.', link:`${SRD}/cleric:life-domain` },
        { level:2, name:'Channel Divinity: Preserve Life', summary:'Restore HP equal to 5 × cleric level, divided among creatures within 30 ft, up to half each one\'s max.', link:`${SRD}/cleric:life-domain` },
        { level:6, name:'Blessed Healer', summary:'When you heal another creature with a spell, you also regain 2 + the spell\'s level in HP.', link:`${SRD}/cleric:life-domain` },
        { level:8, name:'Divine Strike', summary:'Once per turn, your weapon attacks deal an extra 1d8 radiant damage (2d8 at 14th).', link:`${SRD}/cleric:life-domain` },
        { level:17, name:'Supreme Healing', summary:'When you would roll healing dice, use the maximum value instead.', link:`${SRD}/cleric:life-domain` },
      ],
    },
    'Light Domain': {
      link: `${SRD}/cleric:light-domain`,
      features: [
        { level:1, name:'Bonus Cantrip & Warding Flare', summary:'Learn the Light cantrip. Use your reaction to impose disadvantage on an attack against you. Uses equal to WIS modifier per long rest.', link:`${SRD}/cleric:light-domain` },
        { level:2, name:'Channel Divinity: Radiance of the Dawn', summary:'Dispel magical darkness nearby and deal 2d10 + cleric level radiant damage to hostile creatures within 30 ft (CON save for half).', link:`${SRD}/cleric:light-domain` },
        { level:6, name:'Improved Flare', summary:'You can use Warding Flare to protect other creatures you can see that are attacked.', link:`${SRD}/cleric:light-domain` },
        { level:8, name:'Potent Spellcasting', summary:'Add your WIS modifier to damage from your cleric cantrips.', link:`${SRD}/cleric:light-domain` },
        { level:17, name:'Corona of Light', summary:'Emit bright light for 1 minute; enemies in it have disadvantage on saves vs spells that deal fire or radiant damage.', link:`${SRD}/cleric:light-domain` },
      ],
    },
    'War Domain': {
      link: `${SRD}/cleric:war-domain`,
      features: [
        { level:1, name:'Bonus Proficiencies & War Priest', summary:'Gain martial weapon and heavy armor proficiency. When you take the Attack action, make one weapon attack as a bonus action. Uses equal to WIS modifier per long rest.', link:`${SRD}/cleric:war-domain` },
        { level:2, name:'Channel Divinity: Guided Strike', summary:'Add +10 to an attack roll (yours, or another\'s as a reaction at 8th).', link:`${SRD}/cleric:war-domain` },
        { level:6, name:'Channel Divinity: War God\'s Blessing', summary:'Use your reaction and Channel Divinity to grant a nearby ally +10 to an attack roll.', link:`${SRD}/cleric:war-domain` },
        { level:8, name:'Divine Strike', summary:'Once per turn, weapon attacks deal an extra 1d8 damage of your weapon\'s type (2d8 at 14th).', link:`${SRD}/cleric:war-domain` },
        { level:17, name:'Avatar of Battle', summary:'Resistance to nonmagical bludgeoning, piercing, and slashing damage.', link:`${SRD}/cleric:war-domain` },
      ],
    },
  },

  Druid: {
    'Circle of the Land': {
      link: `${SRD}/druid:circle-of-the-land`,
      features: [
        { level:2, name:'Bonus Cantrip & Natural Recovery', summary:'Learn one extra druid cantrip. On a short rest once per day, recover spell slots totaling up to half your druid level.', link:`${SRD}/druid:circle-of-the-land` },
        { level:3, name:'Circle Spells', summary:'Gain always-prepared bonus spells based on your chosen land type (arctic, desert, forest, etc.) at 3rd, 5th, 7th, and 9th level.', link:`${SRD}/druid:circle-of-the-land` },
        { level:6, name:"Land's Stride", summary:'Move through nonmagical difficult terrain and plants freely; advantage on saves vs magical plant effects.', link:`${SRD}/druid:circle-of-the-land` },
        { level:10, name:"Nature's Ward", summary:'Immune to charm/fright from elementals and fey, and immune to poison and disease.', link:`${SRD}/druid:circle-of-the-land` },
        { level:14, name:"Nature's Sanctuary", summary:'Beasts and plants must make a WIS save to attack you (they can\'t on a fail).', link:`${SRD}/druid:circle-of-the-land` },
      ],
    },
    'Circle of the Moon': {
      link: `${SRD}/druid:circle-of-the-moon`,
      features: [
        { level:2, name:'Combat Wild Shape & Circle Forms', summary:'Wild Shape as a bonus action, spend spell slots to heal while transformed, and transform into beasts of CR 1 (higher with level).', link:`${SRD}/druid:circle-of-the-moon` },
        { level:6, name:'Primal Strike', summary:'Your beast-form attacks count as magical for overcoming resistance and immunity.', link:`${SRD}/druid:circle-of-the-moon` },
        { level:10, name:'Elemental Wild Shape', summary:'Spend two Wild Shape uses to transform into an air, earth, fire, or water elemental.', link:`${SRD}/druid:circle-of-the-moon` },
        { level:14, name:'Thousand Forms', summary:'Cast Alter Self at will.', link:`${SRD}/druid:circle-of-the-moon` },
      ],
    },
  },

  Fighter: {
    'Champion': {
      link: `${SRD}/fighter:champion`,
      features: [
        { level:3, name:'Improved Critical', summary:'Your weapon attacks score a critical hit on a roll of 19 or 20.', link:`${SRD}/fighter:champion` },
        { level:7, name:'Remarkable Athlete', summary:'Add half your proficiency bonus to STR/DEX/CON checks you\'re not proficient in, and your running long jump is longer.', link:`${SRD}/fighter:champion` },
        { level:10, name:'Additional Fighting Style', summary:'Choose a second Fighting Style.', link:`${SRD}/fighter:champion` },
        { level:15, name:'Superior Critical', summary:'Your weapon attacks crit on a roll of 18–20.', link:`${SRD}/fighter:champion` },
        { level:18, name:'Survivor', summary:'At the start of each turn, regain HP equal to 5 + CON modifier if you have less than half HP (and aren\'t at 0).', link:`${SRD}/fighter:champion` },
      ],
    },
    'Battle Master': {
      link: `${SRD}/fighter:battle-master`,
      features: [
        { level:3, name:'Combat Superiority', summary:'Learn maneuvers fueled by superiority dice (d8s) — e.g. trip, disarm, riposte. Gain dice that recharge on a rest, plus more maneuvers/dice with level.', link:`${SRD}/fighter:battle-master` },
        { level:3, name:'Student of War', summary:'Gain proficiency with one type of artisan\'s tools.', link:`${SRD}/fighter:battle-master` },
        { level:7, name:'Know Your Enemy', summary:'Study a creature for 1 minute to learn how its capabilities compare to yours.', link:`${SRD}/fighter:battle-master` },
        { level:10, name:'Improved Combat Superiority', summary:'Your superiority dice become d10s (d12s at 18th).', link:`${SRD}/fighter:battle-master` },
        { level:15, name:'Relentless', summary:'When you roll initiative with no superiority dice, regain one.', link:`${SRD}/fighter:battle-master` },
      ],
    },
    'Eldritch Knight': {
      link: `${SRD}/fighter:eldritch-knight`,
      features: [
        { level:3, name:'Spellcasting', summary:'Learn wizard spells (mostly abjuration/evocation), INT-based, third-caster progression.', link:`${SRD}/fighter:eldritch-knight` },
        { level:3, name:'Weapon Bond', summary:'Bond with up to two weapons; you can\'t be disarmed of them and can summon a bonded weapon to your hand.', link:`${SRD}/fighter:eldritch-knight` },
        { level:7, name:'War Magic', summary:'When you use your action to cast a cantrip, make one weapon attack as a bonus action.', link:`${SRD}/fighter:eldritch-knight` },
        { level:10, name:'Eldritch Strike', summary:'When you hit with a weapon, the target has disadvantage on its next save vs your spells before your next turn.', link:`${SRD}/fighter:eldritch-knight` },
        { level:15, name:'Arcane Charge', summary:'When you use Action Surge, you can teleport up to 30 ft first.', link:`${SRD}/fighter:eldritch-knight` },
        { level:18, name:'Improved War Magic', summary:'When you cast a spell with your action, make one weapon attack as a bonus action.', link:`${SRD}/fighter:eldritch-knight` },
      ],
    },
  },

  Monk: {
    'Way of the Open Hand': {
      link: `${SRD}/monk:way-of-the-open-hand`,
      features: [
        { level:3, name:'Open Hand Technique', summary:'When you hit with Flurry of Blows, you can knock the target prone, push it 15 ft, or deny it reactions (target\'s save).', link:`${SRD}/monk:way-of-the-open-hand` },
        { level:6, name:'Wholeness of Body', summary:'As an action, heal yourself for 3 × monk level HP, once per long rest.', link:`${SRD}/monk:way-of-the-open-hand` },
        { level:11, name:'Tranquility', summary:'At the end of a long rest, gain a Sanctuary effect until your next long rest.', link:`${SRD}/monk:way-of-the-open-hand` },
        { level:17, name:'Quivering Palm', summary:'Spend 3 ki on an unarmed hit to set lethal vibrations; later use an action to force a CON save (0 HP on fail, 10d10 on success).', link:`${SRD}/monk:way-of-the-open-hand` },
      ],
    },
    'Way of Shadow': {
      link: `${SRD}/monk:way-of-shadow`,
      features: [
        { level:3, name:'Shadow Arts', summary:'Spend ki to cast Darkness, Darkvision, Pass Without Trace, or Silence, and learn the Minor Illusion cantrip.', link:`${SRD}/monk:way-of-shadow` },
        { level:6, name:'Shadow Step', summary:'When in dim light or darkness, teleport up to 60 ft to another shadowed space as a bonus action, gaining advantage on your next melee attack.', link:`${SRD}/monk:way-of-shadow` },
        { level:11, name:'Cloak of Shadows', summary:'Become invisible in dim light or darkness until you attack, cast a spell, or enter light.', link:`${SRD}/monk:way-of-shadow` },
        { level:17, name:'Opportunist', summary:'When a creature within 5 ft is hit by an attack from someone other than you, use your reaction to make a melee attack against it.', link:`${SRD}/monk:way-of-shadow` },
      ],
    },
  },

  Paladin: {
    'Oath of Devotion': {
      link: `${SRD}/paladin:oath-of-devotion`,
      features: [
        { level:3, name:'Channel Divinity: Sacred Weapon / Turn the Unholy', summary:'Add CHA to weapon attacks and make it glow, or force fiends/undead to flee.', link:`${SRD}/paladin:oath-of-devotion` },
        { level:7, name:'Aura of Devotion', summary:'You and allies within 10 ft can\'t be charmed (30 ft at 18th).', link:`${SRD}/paladin:oath-of-devotion` },
        { level:15, name:'Purity of Spirit', summary:'You are always under the effects of Protection from Evil and Good.', link:`${SRD}/paladin:oath-of-devotion` },
        { level:20, name:'Holy Nimbus', summary:'Emanate sunlight that damages fiends/undead and gives you advantage on saves vs their spells.', link:`${SRD}/paladin:oath-of-devotion` },
      ],
    },
    'Oath of the Ancients': {
      link: `${SRD}/paladin:oath-of-the-ancients`,
      features: [
        { level:3, name:'Channel Divinity: Nature\'s Wrath / Turn the Faithless', summary:'Ensnare a creature with spectral vines, or turn fey and fiends.', link:`${SRD}/paladin:oath-of-the-ancients` },
        { level:7, name:'Aura of Warding', summary:'You and allies within 10 ft have resistance to damage from spells (30 ft at 18th).', link:`${SRD}/paladin:oath-of-the-ancients` },
        { level:15, name:'Undying Sentinel', summary:'When reduced to 0 HP (not killed outright), drop to 1 instead, once per long rest. You also don\'t age.', link:`${SRD}/paladin:oath-of-the-ancients` },
        { level:20, name:'Elder Champion', summary:'Transform to regain HP each turn, cast paladin spells faster, and force enemies to save with disadvantage vs your spells/Channel Divinity.', link:`${SRD}/paladin:oath-of-the-ancients` },
      ],
    },
    'Oath of Vengeance': {
      link: `${SRD}/paladin:oath-of-vengeance`,
      features: [
        { level:3, name:'Channel Divinity: Abjure Enemy / Vow of Enmity', summary:'Frighten and slow a foe, or gain advantage on attacks against one creature for 1 minute.', link:`${SRD}/paladin:oath-of-vengeance` },
        { level:7, name:'Relentless Avenger', summary:'When you hit with an opportunity attack, you can move up to half your speed without provoking.', link:`${SRD}/paladin:oath-of-vengeance` },
        { level:15, name:'Soul of Vengeance', summary:'Use your reaction to attack a creature under your Vow of Enmity when it attacks.', link:`${SRD}/paladin:oath-of-vengeance` },
        { level:20, name:'Avenging Angel', summary:'Sprout wings to fly and emanate a frightening aura.', link:`${SRD}/paladin:oath-of-vengeance` },
      ],
    },
  },

  Ranger: {
    'Hunter': {
      link: `${SRD}/ranger:hunter`,
      features: [
        { level:3, name:'Hunter\'s Prey', summary:'Choose Colossus Slayer (extra damage to hurt foes), Giant Killer (react against large+ attackers), or Horde Breaker (extra attack vs a second nearby foe).', link:`${SRD}/ranger:hunter` },
        { level:7, name:'Defensive Tactics', summary:'Choose Escape the Horde, Multiattack Defense, or Steel Will for better survivability.', link:`${SRD}/ranger:hunter` },
        { level:11, name:'Multiattack', summary:'Choose Volley (ranged AoE) or Whirlwind Attack (melee AoE).', link:`${SRD}/ranger:hunter` },
        { level:15, name:'Superior Hunter\'s Defense', summary:'Choose a powerful defensive reaction such as Evasion, Stand Against the Tide, or Uncanny Dodge.', link:`${SRD}/ranger:hunter` },
      ],
    },
    'Beast Master': {
      link: `${SRD}/ranger:beast-master`,
      features: [
        { level:3, name:'Ranger\'s Companion', summary:'Gain a trained beast companion (CR 1/4 or lower) that acts on your initiative and obeys your commands.', link:`${SRD}/ranger:beast-master` },
        { level:7, name:'Exceptional Training', summary:'Your companion can Dash, Disengage, Dodge, or Help as a bonus action, and its attacks count as magical.', link:`${SRD}/ranger:beast-master` },
        { level:11, name:'Bestial Fury', summary:'Your companion makes two attacks when it takes the Attack action.', link:`${SRD}/ranger:beast-master` },
        { level:15, name:'Share Spells', summary:'When you target yourself with a spell, you can also affect your companion if it\'s within 30 ft.', link:`${SRD}/ranger:beast-master` },
      ],
    },
  },


  Sorcerer: {
    'Draconic Bloodline': {
      link: `${SRD}/sorcerer:draconic-bloodline`,
      features: [
        { level:1, name:'Dragon Ancestor & Draconic Resilience', summary:'Choose a dragon type (sets a damage affinity). Your max HP increases by 1 per sorcerer level, and your unarmored AC becomes 13 + DEX.', link:`${SRD}/sorcerer:draconic-bloodline` },
        { level:6, name:'Elemental Affinity', summary:'Add CHA modifier to one damage roll of a spell matching your dragon\'s damage type; spend a sorcery point to gain resistance to it for an hour.', link:`${SRD}/sorcerer:draconic-bloodline` },
        { level:14, name:'Dragon Wings', summary:'Sprout wings to gain a flying speed equal to your walking speed.', link:`${SRD}/sorcerer:draconic-bloodline` },
        { level:18, name:'Draconic Presence', summary:'Spend 5 sorcery points to radiate an aura of awe or fear (30 ft) that charms or frightens enemies who fail a WIS save.', link:`${SRD}/sorcerer:draconic-bloodline` },
      ],
    },
    'Wild Magic': {
      link: `${SRD}/sorcerer:wild-magic`,
      features: [
        { level:1, name:'Wild Magic Surge & Tides of Chaos', summary:'Your spells may trigger a random magical surge. Once per long rest, gain advantage on a roll; the DM may then trigger a surge.', link:`${SRD}/sorcerer:wild-magic` },
        { level:6, name:'Bend Luck', summary:'Spend 2 sorcery points and use your reaction to add or subtract 1d4 from another creature\'s attack, ability check, or save.', link:`${SRD}/sorcerer:wild-magic` },
        { level:14, name:'Controlled Chaos', summary:'When you roll on the Wild Magic Surge table, roll twice and choose either result.', link:`${SRD}/sorcerer:wild-magic` },
        { level:18, name:'Spell Bombardment', summary:'When you roll max on a spell\'s damage die, roll that die again and add it.', link:`${SRD}/sorcerer:wild-magic` },
      ],
    },
  },

  Warlock: {
    'The Fiend': {
      link: `${SRD}/warlock:the-fiend`,
      features: [
        { level:1, name:'Dark One\'s Blessing', summary:'When you reduce a hostile creature to 0 HP, gain temporary HP equal to CHA modifier + warlock level.', link:`${SRD}/warlock:the-fiend` },
        { level:6, name:'Dark One\'s Own Luck', summary:'Add 1d10 to an ability check or save once per short/long rest.', link:`${SRD}/warlock:the-fiend` },
        { level:10, name:'Fiendish Resilience', summary:'After a rest, choose one damage type to resist (except magical/silvered weapons) until you choose again.', link:`${SRD}/warlock:the-fiend` },
        { level:14, name:'Hurl Through Hell', summary:'When you hit a creature, banish it through the lower planes for 10d10 psychic damage on its return.', link:`${SRD}/warlock:the-fiend` },
      ],
    },
    'The Archfey': {
      link: `${SRD}/warlock:the-archfey`,
      features: [
        { level:1, name:'Fey Presence', summary:'As an action, charm or frighten creatures in a 10-ft cube (WIS save), once per short/long rest.', link:`${SRD}/warlock:the-archfey` },
        { level:6, name:'Misty Escape', summary:'When you take damage, use your reaction to turn invisible and teleport 60 ft, once per short/long rest.', link:`${SRD}/warlock:the-archfey` },
        { level:10, name:'Beguiling Defenses', summary:'Immune to being charmed; reflect attempted charms back as psychic damage.', link:`${SRD}/warlock:the-archfey` },
        { level:14, name:'Dark Delirium', summary:'Wrap a creature in an illusory realm, charming or frightening it for up to 1 minute.', link:`${SRD}/warlock:the-archfey` },
      ],
    },
    'The Great Old One': {
      link: `${SRD}/warlock:the-great-old-one`,
      features: [
        { level:1, name:'Awakened Mind', summary:'Telepathically speak to any creature within 30 ft that shares a language with you.', link:`${SRD}/warlock:the-great-old-one` },
        { level:6, name:'Entropic Ward', summary:'When attacked, use your reaction to impose disadvantage; if it misses, your next attack vs it has advantage. Once per short/long rest.', link:`${SRD}/warlock:the-great-old-one` },
        { level:10, name:'Thought Shield', summary:'Resistance to psychic damage; when a creature deals psychic damage to you it takes the same amount.', link:`${SRD}/warlock:the-great-old-one` },
        { level:14, name:'Create Thrall', summary:'Touch an incapacitated creature to charm it indefinitely until the charm is broken.', link:`${SRD}/warlock:the-great-old-one` },
      ],
    },
  },

  Wizard: {
    'School of Evocation': {
      link: `${SRD}/wizard:school-of-evocation`,
      features: [
        { level:2, name:'Evocation Savant & Sculpt Spells', summary:'Copy evocation spells into your book faster/cheaper. When you cast an evocation that forces a save, allies in the area automatically succeed and take no damage.', link:`${SRD}/wizard:school-of-evocation` },
        { level:6, name:'Potent Cantrip', summary:'Creatures that succeed on saves against your cantrips still take half damage.', link:`${SRD}/wizard:school-of-evocation` },
        { level:10, name:'Empowered Evocation', summary:'Add your INT modifier to one damage roll of any evocation spell you cast.', link:`${SRD}/wizard:school-of-evocation` },
        { level:14, name:'Overchannel', summary:'Deal maximum damage with a spell of 5th level or lower; using it repeatedly between rests damages you.', link:`${SRD}/wizard:school-of-evocation` },
      ],
    },
    'School of Abjuration': {
      link: `${SRD}/wizard:school-of-abjuration`,
      features: [
        { level:2, name:'Abjuration Savant & Arcane Ward', summary:'Copy abjuration spells faster/cheaper. Casting an abjuration spell creates a protective ward (HP = 2x wizard level + INT) that absorbs damage to you.', link:`${SRD}/wizard:school-of-abjuration` },
        { level:6, name:'Projected Ward', summary:'Use your reaction to have your Arcane Ward absorb damage to a creature within 30 ft.', link:`${SRD}/wizard:school-of-abjuration` },
        { level:10, name:'Improved Abjuration', summary:'Add your proficiency bonus to ability checks made as part of abjuration spells (e.g. Counterspell, Dispel Magic).', link:`${SRD}/wizard:school-of-abjuration` },
        { level:14, name:'Spell Resistance', summary:'Advantage on saving throws vs spells, and resistance to spell damage.', link:`${SRD}/wizard:school-of-abjuration` },
      ],
    },
  },

  Artificer: {
    'Alchemist': {
      link: `${SRD}/artificer:alchemist`,
      features: [
        { level:3, name:'Tool Proficiency & Alchemist Spells', summary:'Gain alchemist\'s supplies proficiency and a set of always-prepared bonus spells.', link:`${SRD}/artificer:alchemist` },
        { level:5, name:'Experimental Elixir', summary:'Craft random (or chosen) magical elixirs after a long rest that heal or grant effects when drunk.', link:`${SRD}/artificer:alchemist` },
        { level:9, name:'Alchemical Savant', summary:'Add your INT modifier to one roll of any spell that restores HP or deals acid/fire/necrotic/poison damage.', link:`${SRD}/artificer:alchemist` },
        { level:15, name:'Restorative Reagents', summary:'Your elixirs also grant temp HP, and you can cast Greater Restoration without a material component a limited number of times.', link:`${SRD}/artificer:alchemist` },
      ],
    },
    'Battle Smith': {
      link: `${SRD}/artificer:battle-smith`,
      features: [
        { level:3, name:'Battle Ready & Steel Defender', summary:'Use INT for attacks with magic weapons; build a loyal mechanical Steel Defender companion that fights alongside you.', link:`${SRD}/artificer:battle-smith` },
        { level:5, name:'Extra Attack', summary:'Attack twice when you take the Attack action.', link:`${SRD}/artificer:battle-smith` },
        { level:9, name:'Arcane Jolt', summary:'When your magic weapon or Steel Defender hits, deal extra force damage or heal a nearby creature. Uses equal to INT modifier per long rest.', link:`${SRD}/artificer:battle-smith` },
        { level:15, name:'Improved Defender', summary:'Your Steel Defender gets a stronger Arcane Jolt, better AC, and a deflect-attack reaction.', link:`${SRD}/artificer:battle-smith` },
      ],
    },
  },
};
