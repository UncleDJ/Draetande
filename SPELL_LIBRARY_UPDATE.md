# Spell Library Update — Database Setup

Run this **once** in Supabase → SQL Editor → New query → Run.

```sql
-- Custom spells table - each player's homebrew/custom spells
create table public.custom_spells (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  level int default 0,
  school text default 'Evocation',
  time text default '1 action',
  range text default '60 feet',
  components text default 'V, S',
  duration text default 'Instantaneous',
  ritual boolean default false,
  classes jsonb default '[]',
  damage text default '',
  damage_type text default '',
  saving_throw text default '',
  description text default '',
  created_at timestamptz default now()
);

alter table public.custom_spells enable row level security;

create policy "Users manage their own custom spells"
  on public.custom_spells for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## What's new

### Spell Library tab (📖)
A full searchable database of **510 standard D&D 5e spells** across all levels (cantrips through 9th), filterable by:
- Name search
- Level
- Class
- School of magic (color-coded)

Tap any spell to see its casting time, range, components, duration, and classes. (Full rules text isn't included — players reference their Player's Handbook/D&D Beyond for the complete description, as is standard.)

### Custom Spells
Tap **"＋ Custom Spell"** in the Library tab to build your own:
- Name, level, school, casting time, range, components, duration, ritual flag
- Optional damage dice + type, saving throw
- Which classes can use it
- Your own description text

Custom spells are saved per-player (private to each account) and show up:
- In the Library tab tagged "custom"
- In the spell picker when adding spells to your character sheet (alongside the standard list)

### Spell picker improvements
When adding a spell to your character sheet, the picker now searches the **full 510-spell database** filtered to your class and the selected level by default, with a toggle to show spells from all classes. Your custom spells appear here too.

## Notes

- The spell database is bundled with the app (no extra loading), so it works the same whether online or offline once the page is cached
- `custom_spells` table uses one row per spell, keyed by a UUID — deleting a spell removes it everywhere it's referenced (the spell name is just text on the character sheet, so removing a custom spell from the library won't retroactively remove it from a character's prepared list — players would need to manually remove it from their sheet too)
