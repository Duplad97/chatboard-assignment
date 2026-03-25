# Chat Board Assignment

Simple chat board application built with Next.js (App Router), TypeScript, and Supabase.

## Features

- Create a message
- View messages in chronological order
- Delete messages

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update `.env` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Supabase table

Run this SQL in the Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.messages (
	id uuid primary key default gen_random_uuid(),
	content text not null check (char_length(trim(content)) > 0),
	created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
	on public.messages (created_at asc);
```

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Notes

- Database operations are implemented with Supabase.
- The UI is server-rendered and refreshed with Next.js revalidation after create/delete actions.
