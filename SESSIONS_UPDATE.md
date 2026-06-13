# Multi-Character & Sessions Update — Database Setup

## Quick checklist
1. Run Steps 1-6 below in order, in Supabase SQL Editor
2. Replace your app files with the new build, run `npm install` (no new deps, but safe)
3. Test: sign in → you should land on a Home screen with "My Characters", "Sessions"
4. Your existing character should now appear in "My Characters" (the migration in Step 2 preserves it)

---

This is a significant schema change. Run in order, in Supabase → SQL Editor.

**Back up first** if you have player data you care about — step 2 restructures
the `characters` table's primary key.

---

## Step 1: Profiles table (DM approval tracking)

```sql
create table public.profiles (
  user_id uuid references auth.users(id) on delete cascade primary key,
  player_name text default '',
  is_approved_dm boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

-- Auto-create a profile row when someone signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, player_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'player_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Step 2: Restructure characters table

Your existing `characters` table uses `user_id` as the primary key (one
character per player). This step migrates it to support multiple characters
per player.

```sql
-- Add new id column as the new primary key
alter table public.characters
  add column if not exists id uuid default gen_random_uuid();

-- Drop old primary key constraint on user_id
alter table public.characters drop constraint if exists characters_pkey;

-- Make id the new primary key
update public.characters set id = gen_random_uuid() where id is null;
alter table public.characters alter column id set not null;
alter table public.characters add primary key (id);

-- user_id is now just a foreign key, not unique
-- (it already references auth.users via the original constraint - that's fine)

-- Add session_id - which session this character is currently active in (nullable)
alter table public.characters
  add column if not exists session_id uuid;

-- Add a friendly flag for "is this character a template/library entry vs actively in a session"
alter table public.characters
  add column if not exists is_active boolean default true;
```

---

## Step 3: Sessions tables

```sql
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  dm_user_id uuid references auth.users(id) on delete cascade not null,
  join_code text unique not null,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.sessions enable row level security;

create policy "Anyone authenticated can view sessions"
  on public.sessions for select
  using (auth.role() = 'authenticated');

create policy "DMs can create sessions"
  on public.sessions for insert
  with check (
    auth.uid() = dm_user_id
    and exists (select 1 from public.profiles where user_id = auth.uid() and is_approved_dm = true)
  );

create policy "DMs can update their own sessions"
  on public.sessions for update
  using (auth.uid() = dm_user_id);

-- Session membership: which characters are in which sessions
create table public.session_members (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) on delete cascade not null,
  character_id uuid references public.characters(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  joined_at timestamptz default now(),
  unique(session_id, character_id)
);

alter table public.session_members enable row level security;

create policy "Anyone authenticated can view session members"
  on public.session_members for select
  using (auth.role() = 'authenticated');

create policy "Users can join sessions with their own characters"
  on public.session_members for insert
  with check (auth.uid() = user_id);

create policy "Users can leave sessions"
  on public.session_members for delete
  using (auth.uid() = user_id);

-- Enable realtime for live party updates
alter publication supabase_realtime add table public.session_members;
alter publication supabase_realtime add table public.sessions;
```

---

## Step 4: DM requests table

```sql
create table public.dm_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  status text default 'pending',  -- 'pending' | 'approved' | 'denied'
  requested_at timestamptz default now(),
  resolved_at timestamptz,
  unique(user_id)
);

alter table public.dm_requests enable row level security;

create policy "Users can view their own requests"
  on public.dm_requests for select
  using (auth.uid() = user_id or auth.uid() = (
    select user_id from auth.users where email = current_setting('request.jwt.claims', true)::json->>'email'
  ));

-- Simplify: any authenticated user can view all requests (small private group)
drop policy if exists "Users can view their own requests" on public.dm_requests;
create policy "Authenticated users can view dm requests"
  on public.dm_requests for select
  using (auth.role() = 'authenticated');

create policy "Users can create their own dm request"
  on public.dm_requests for insert
  with check (auth.uid() = user_id);

-- Only approved DMs (or the super-admin) can update requests
create policy "Approved DMs can resolve requests"
  on public.dm_requests for update
  using (
    exists (select 1 from public.profiles where user_id = auth.uid() and is_approved_dm = true)
  );

alter publication supabase_realtime add table public.dm_requests;
alter publication supabase_realtime add table public.profiles;
```

---

## Step 5: Make yourself the first approved DM

Run this with **your** email (the one you set as `VITE_DM_EMAIL`):

```sql
update public.profiles
set is_approved_dm = true
where user_id = (select id from auth.users where email = 'your-email@example.com');
```

If your profile row doesn't exist yet (because you signed up before this
migration), run this first:

```sql
insert into public.profiles (user_id, player_name, is_approved_dm)
values (
  (select id from auth.users where email = 'your-email@example.com'),
  'Eric',
  true
)
on conflict (user_id) do update set is_approved_dm = true;
```

---

## Step 6: Update characters RLS for the new model

```sql
-- Drop old policies that assumed one character per user
drop policy if exists "Users can update their own character" on public.characters;
drop policy if exists "Users can insert their own character" on public.characters;
drop policy if exists "Anyone authenticated can view all characters" on public.characters;

create policy "Users can view all characters"
  on public.characters for select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own characters"
  on public.characters for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own characters"
  on public.characters for update
  using (auth.uid() = user_id);

create policy "Users can delete their own characters"
  on public.characters for delete
  using (auth.uid() = user_id);
```

---

## What's new in the app

### Home menu (new landing page after login)
- **My Characters** — library of all your characters, create new, open existing
- **Sessions** — sessions you're part of, with a join-by-code option
- **Create Session** — only visible if you're an approved DM
- **Request DM Access** — if not yet approved, request it here

### Joining a session
Enter a join code (DM shares this) → pick an existing character from your
library OR create a new one → you're added to that session's party.

### DM approval flow
Any player can tap "Request DM Access". Approved DMs (starting with you) see
pending requests in their Sessions screen and can approve with one tap.

### Party tab
Now scoped to the session you're currently viewing as DM — shows only
characters that have joined that specific session, live-updating.

### Characters are reusable
The same character can be in multiple sessions. Switching sessions doesn't
duplicate the character — it's the same sheet, same data, just visible in
different session party views.
