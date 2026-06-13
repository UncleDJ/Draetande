# Draetande — Deployment Guide
## Get the app live in ~15 minutes, free forever

---

## Step 1: Set up Supabase (the database + live updates)

1. Go to **https://supabase.com** → "Start your project" → sign up free
2. Click **"New project"** → name it `draetande` → set a database password → create
3. Wait ~2 minutes for it to spin up
4. Go to **SQL Editor** (left sidebar) and run this to create the characters table:

```sql
-- Create the characters table
create table public.characters (
  user_id uuid references auth.users(id) on delete cascade primary key,
  campaign_id text default 'draetande',
  character_name text default '',
  player_name text default '',
  class_name text default '',
  level int default 1,
  race text default '',
  background text default '',
  alignment text default '',
  deity text default '',
  experience int default 0,
  age text default '',
  height text default '',
  weight text default '',
  str int default 10,
  dex int default 10,
  con int default 10,
  int int default 10,
  wis int default 10,
  cha int default 10,
  save_profs jsonb default '[]',
  skill_profs jsonb default '{}',
  ac int default 10,
  max_hp int default 0,
  current_hp int default 0,
  temp_hp int default 0,
  death_saves_success int default 0,
  death_saves_fail int default 0,
  resources_used jsonb default '{}',
  slots_expended jsonb default '[0,0,0,0,0,0,0,0,0]',
  pact_slots_expended int default 0,
  spells jsonb default '{"cantrips":[],"l1":[],"l2":[],"l3":[],"l4":[],"l5":[],"l6":[],"l7":[],"l8":[],"l9":[]}',
  attacks jsonb default '[{},{},{},{}]',
  personality_traits text default '',
  ideals text default '',
  bonds text default '',
  flaws text default '',
  features_traits text default '',
  equipment text default '',
  other_profs text default '',
  notes text default '',
  cp int default 0,
  sp int default 0,
  ep int default 0,
  gp int default 0,
  pp int default 0,
  updated_at timestamptz default now()
);

-- Enable row-level security
alter table public.characters enable row level security;

-- Players can read all characters (for party view)
create policy "Anyone authenticated can view all characters"
  on public.characters for select
  using (auth.role() = 'authenticated');

-- Players can only insert/update their own character
create policy "Users can insert their own character"
  on public.characters for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own character"
  on public.characters for update
  using (auth.uid() = user_id);

-- Enable real-time
alter publication supabase_realtime add table public.characters;
```

5. Go to **Settings → API** (left sidebar)
   - Copy your **Project URL** (looks like `https://abcxyz.supabase.co`)
   - Copy your **anon/public key** (long string starting with `eyJ...`)
   - Keep these — you need them in Step 3

---

## Step 2: Set up Vercel (free hosting)

1. Go to **https://vercel.com** → sign up free (use GitHub if you have it)
2. Click **"Add New Project"**
3. Upload the project folder, OR connect via GitHub (see below)

### Easiest: Deploy via GitHub
1. Create a free GitHub account at **https://github.com**
2. Create a new repository called `draetande`
3. Upload all the project files to it
4. In Vercel → "Import Git Repository" → select `draetande`

### Alternative: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# In the draetande project folder:
vercel login
vercel
# Follow prompts - answer yes to all defaults
```

---

## Step 3: Add your Supabase keys to Vercel

In Vercel → your project → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_DM_EMAIL` | Your email address (this account gets the DM party view) |

Then **Redeploy** (Deployments tab → three dots → Redeploy).

---

## Step 4: Enable email signup in Supabase

1. Supabase → **Authentication → Settings**
2. Under "Email Auth" make sure it's enabled
3. Optionally: turn OFF "Confirm email" so players don't need to verify
   (fine for a private campaign tool)

---

## You're live! Share the URL

Your app will be at something like `https://draetande.vercel.app`

Share this URL with your players. Tell them to:
1. Open it in **Safari** (iPhone) or **Chrome** (Android)
2. **iPhone**: tap Share → "Add to Home Screen" → Done
3. **Android**: tap the three dots → "Add to Home Screen" → Install
4. It'll appear as an app icon — opens full screen, no browser chrome

---

## How to update the app

Make changes to the code → push to GitHub → Vercel auto-deploys in ~30 seconds.

Or run `vercel --prod` from the project folder.

---

## Adding players

Players just go to your URL and sign up themselves. They each get their own character sheet. You (DM) see everyone in the Party tab automatically — it updates live as they play.

---

## Troubleshooting

**"Cannot read properties of null"** → The Supabase env vars aren't set. Check Step 3.

**Players can't sign up** → Check Supabase Auth settings (Step 4).

**Changes don't save** → Check browser console for errors. Usually a Supabase connection issue.

**Party tab not updating live** → Make sure you ran the `alter publication` SQL line (last line of Step 1 SQL).
