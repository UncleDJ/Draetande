# Database Update — Run This in Supabase SQL Editor

Your `characters` table was created before this update. Run the SQL below
**once** in Supabase → SQL Editor → New query → Run.

This adds the new columns without touching any existing character data.

```sql
-- New proficiency tracking
alter table public.characters
  add column if not exists weapon_profs jsonb default '[]',
  add column if not exists armor_profs jsonb default '[]',
  add column if not exists tool_profs jsonb default '[]',
  add column if not exists languages jsonb default '["Common"]';

-- Dedicated game notes (separate from character roleplay notes)
alter table public.characters
  add column if not exists game_notes text default '';

-- Update attacks default shape (existing rows keep their data either way)
alter table public.characters
  alter column attacks set default '[{"weapon":"","ability":null,"customWeapon":null,"notes":""},{"weapon":"","ability":null,"customWeapon":null,"notes":""},{"weapon":"","ability":null,"customWeapon":null,"notes":""}]';
```

## What changed

- **Saving throws** are now a dedicated panel — tap any stat to toggle proficiency, the bonus shows immediately
- **Weapon proficiencies, armor proficiencies, tool proficiencies, languages** — searchable multi-select chips, stored as `weapon_profs`, `armor_profs`, `tool_profs`, `languages`
- **Attacks** now use a weapon dropdown (searchable, ~50 weapons including magic variants). Selecting a weapon auto-calculates attack bonus and damage based on your stats, proficiency, and the weapon's properties. Finesse weapons let you pick STR or DEX.
- **Custom weapons** — tap "🛠 Custom Weapon..." in the weapon dropdown to open a builder where you set damage dice, properties, and any bonus modifiers (extra +to-hit, +damage, extra damage dice, which stat applies, etc)
- **Game Notes** — a new dedicated free-text area (`game_notes` column) for general session notes, separate from the roleplay personality fields

## Note on existing characters

If a player already has data in the old `attacks` format (`{name, atk_bonus, damage, type}`), those entries won't map to weapons automatically — they'll just show as empty attack rows. Players can re-select their weapons from the new dropdown, which takes seconds.
