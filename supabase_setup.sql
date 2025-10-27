-- Supabase Complete Setup Script
-- This script creates all necessary tables and storage for the E-Store application

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

-- Create profiles table for user information
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now(),
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamp with time zone default now()
);

-- Create admin users table for role-based access control
create table admin_users (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now(),
  is_admin boolean default true
);

-- Enable Row Level Security on tables
alter table profiles enable row level security;
alter table admin_users enable row level security;

-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Create storage bucket for other media (avatars, etc.)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Create policies for the products bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Authenticated users can upload"
on storage.objects for insert
with check (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can update" 
on storage.objects for update 
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can delete"
on storage.objects for delete
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

-- Create policies for the media bucket
create policy "Public Media Access"
on storage.objects for select
using ( bucket_id = 'media' );

create policy "Authenticated users can upload media"
on storage.objects for insert
with check (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can update media" 
on storage.objects for update 
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);

create policy "Authenticated users can delete media"
on storage.objects for delete
using (
  bucket_id = 'media' 
  and auth.role() = 'authenticated'
);