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
NEXT_PUBLIC_SUPABASE_URL=https://tpxexyirxbngrahrfcmn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweGV4eWlyeGJuZ3JhaHJmY21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY0ODEsImV4cCI6MjA3Njg5MjQ4MX0.ec_OpibImkwVQTjz7C3SbcxPD-_wpXyS-TMZOK6OoQU
```

## 3. Automatic Setup (Recommended)

For the fastest setup, you can use the complete setup script that automatically creates all necessary tables, storage buckets, and policies:

1. In the Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase_complete_setup.sql` into the editor
3. Click "Run" to execute the script

This will automatically set up:
- Products table with sample data
- Admin users table
- Storage bucket for product images
- All necessary policies and permissions

## 4. Manual Setup

If you prefer to set things up manually, follow these steps:

### Create the Products Table

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

### Set up Storage for Product Images

1. Go to "Storage" in the left sidebar
2. Click "Create Bucket"
3. Name the bucket "products"
4. Set the bucket to "Public"
5. Create policies for the bucket:
   - SELECT: Allow all users to read images
   - INSERT: Allow authenticated users to upload images
   - UPDATE: Allow authenticated users to update images
   - DELETE: Allow authenticated users to delete images

### Set up Row Level Security (Optional)

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