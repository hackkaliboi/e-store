-- Supabase Unified Setup Script
-- This single script creates all necessary tables, storage buckets, and policies for the E-Store application

-- Create the products table
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

-- Create profiles table for user information with profile type field
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now(),
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamp with time zone default now(),
  profile_type text default 'user' check (profile_type in ('user', 'admin'))
);

-- Enable Row Level Security on our custom tables
alter table products enable row level security;
alter table profiles enable row level security;

-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Create storage bucket for other media (avatars, etc.)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Create policies for the products table
create policy "Public can view products"
on products for select
using ( true );

create policy "Authenticated users can insert products"
on products for insert
with check ( 
  auth.role() = 'authenticated' 
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Admins can update products"
on products for update
using ( 
  auth.role() = 'authenticated' 
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Admins can delete products"
on products for delete
using ( 
  auth.role() = 'authenticated' 
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

-- Create policies for the profiles table
create policy "Users can view their own profile"
on profiles for select
using ( id = auth.uid() );

create policy "Users can insert their own profile"
on profiles for insert
with check ( id = auth.uid() );

create policy "Users can update their own profile"
on profiles for update
using ( id = auth.uid() );

create policy "Admins can manage all profiles"
on profiles for all
using ( 
  exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

-- Create policies for the products bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Authenticated Admins can upload products"
on storage.objects for insert
with check (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Authenticated Admins can update products"
on storage.objects for update 
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Authenticated Admins can delete products"
on storage.objects for delete
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

-- Create policies for the media bucket
create policy "Public Media Access"
on storage.objects for select
using ( bucket_id = 'media' );

create policy "Authenticated Admins can upload media"
on storage.objects for insert
with check (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Authenticated Admins can update media"
on storage.objects for update 
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

create policy "Authenticated Admins can delete media"
on storage.objects for delete
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.profile_type = 'admin'
  )
);

-- Setup Instructions:
-- 1. Run this entire script in your Supabase SQL Editor
-- 2. If you encounter "ERROR: 42501: must be owner of table objects":
--    a. Comment out or remove the storage policy section above
--    b. Set up storage policies manually through the Supabase dashboard:
--       - Go to Table Editor → storage.objects → Policies
--       - Enable RLS if not already enabled
--       - Create each policy as described in the comments above
-- 3. After running the script, create your admin user by:
--    a. Registering through the app
--    b. Updating your profile_type to 'admin' in the profiles table

-- Important Notes:
-- - This script is designed for a fresh Supabase project
-- - Storage policies may need to be set up through the dashboard due to ownership restrictions
-- - Make sure to update your .env.local file with your Supabase credentials
-- - Admin users are identified by profile_type = 'admin' in the profiles table