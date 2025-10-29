// Script to print only the storage-related SQL commands
console.log(`
-- STORAGE SETUP COMMANDS
-- Run these commands in your Supabase SQL Editor

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
`);