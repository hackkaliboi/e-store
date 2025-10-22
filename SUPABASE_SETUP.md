# Supabase Setup Guide

This project uses Supabase as the backend for product management. Follow these steps to set up Supabase:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Note down your Project URL and API keys

## 2. Set up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Create the Products Table

In your Supabase SQL editor, run the following SQL command to create the products table:

```sql
create table products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  price decimal not null,
  image text,
  description text,
  category text,
  features text[]
);
```

## 4. Set up Row Level Security (Optional)

For development, you might want to disable RLS:

```sql
alter table products disable row level security;
```

For production, you should set up proper RLS policies.

## 5. Test the Connection

Start your development server and check if the products are loading from Supabase:

```bash
npm run dev
```

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.