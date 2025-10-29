# Migration Guide: Updating Existing Supabase Project

This guide explains how to migrate an existing Supabase project to use the new consolidated structure with the improved profile management system.

## Overview

This migration involves:
1. Adding the `profile_type` column to the existing `profiles` table
2. Migrating existing admin users from the `admin_users` table to the new system
3. Removing the deprecated `admin_users` table
4. Updating storage policies to work with the new system

## Migration Steps

### 1. Backup Your Data

Before proceeding, create a backup of your database:

1. In your Supabase dashboard, go to the Table Editor
2. Export your data for the following tables:
   - `profiles`
   - `admin_users`
   - `products`

### 2. Add Profile Type Column

Run this SQL command to add the profile_type column to your existing profiles table:

```sql
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_type TEXT DEFAULT 'user' 
CHECK (profile_type IN ('user', 'admin'));
```

### 3. Migrate Existing Admin Users

Run this SQL command to migrate existing admin users:

```sql
UPDATE profiles 
SET profile_type = 'admin'
WHERE id IN (
    SELECT id FROM admin_users WHERE is_admin = true
);
```

### 4. Update Storage Policies

Drop the existing storage policies:

```sql
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Media Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;
```

Then create the new policies from `supabase_unified_setup.sql`:

```sql
-- Create policies for the products bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Authenticated users can upload"
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

create policy "Authenticated users can update" 
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

create policy "Authenticated users can delete"
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

create policy "Authenticated users can upload media"
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

create policy "Authenticated users can update media" 
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

create policy "Authenticated users can delete media"
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
```

### 5. Update Table Policies

Drop the existing admin_users policies:

```sql
DROP POLICY IF EXISTS "Users can read their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON admin_users;
```

Update the profiles policies:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create new policies
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
```

### 6. Update Product Policies

Update the product policies to use the new system:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Create new policies
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
```

### 7. Remove Deprecated Table (Optional)

After confirming everything is working correctly, you can remove the deprecated admin_users table:

```sql
DROP TABLE IF EXISTS admin_users;
```

## Update Application Code

Make sure you've updated your application code as described in the previous sections:
1. Updated `lib/supabase/auth.ts` to use the new profile system
2. Updated `app/admin/settings/page.tsx` to work with the new system

## Testing the Migration

1. Restart your development server
2. Try logging in as both a regular user and an admin user
3. Verify that admin users can access the admin dashboard
4. Test product management functionality
5. Test image uploads
6. Verify that regular users cannot access admin features

## Troubleshooting

### If admin features aren't working:
1. Verify that your user profile has `profile_type` set to 'admin'
2. Check that all policies were applied correctly
3. Ensure the application code was updated properly

### If storage uploads fail:
1. Verify that the storage policies were applied correctly
2. Check that your user profile has `profile_type` set to 'admin'
3. Review the browser console for specific error messages
4. If you encounter the "ERROR: 42501: must be owner of table objects" error, follow the instructions in `supabase_unified_setup.sql` or set up storage policies manually through the Supabase dashboard interface

### If authentication issues occur:
1. Try logging out and back in to refresh your session
2. Check that the profiles table policies are working correctly