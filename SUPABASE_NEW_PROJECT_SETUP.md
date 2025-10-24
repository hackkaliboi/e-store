# Setting Up Your New Supabase Project

This guide will help you set up your new Supabase project with the required tables and data.

## Project Details

- **Project URL**: https://tpxexyirxbngrahrfcmn.supabase.co
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweGV4eWlyeGJuZ3JhaHJmY21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY0ODEsImV4cCI6MjA3Njg5MjQ4MX0.ec_OpibImkwVQTjz7C3SbcxPD-_wpXyS-TMZOK6OoQU

## Automatic Setup (Recommended)

For the fastest setup, you can use the complete setup script that automatically creates all necessary tables, storage buckets, and policies:

1. In the Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase_complete_setup.sql` into the editor
3. Click "Run" to execute the script

This will automatically set up:
- Products table with sample data
- Admin users table
- Storage bucket for product images
- All necessary policies and permissions

## Manual Setup Steps

If you prefer to set things up manually, follow these steps:

### 1. Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project `tpxexyirxbngrahrfcmn`

### 2. Create the Products Table

In the Supabase dashboard:
1. Go to "SQL Editor" in the left sidebar
2. Copy and paste the following SQL script:

```sql
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

-- Insert sample clothing products for testing
insert into products (name, price, image, description, category, features) values
  ('Urban Streetwear Hoodie', 49.99, '/urban-streetwear-hoodie.jpg', 'Comfortable and stylish hoodie perfect for casual wear. Made with premium cotton blend for all-day comfort.', 'Tops', ARRAY['Premium Cotton Blend', 'Adjustable Hood', 'Kangaroo Pocket', 'Machine Washable']),
  ('Designer Denim Jeans', 79.99, '/designer-denim-jeans.jpg', 'Classic fit denim jeans with modern styling. Durable construction and comfortable stretch for everyday wear.', 'Bottoms', ARRAY['Classic Fit', 'Stretch Denim', 'Five Pocket Design', 'Button Closure']),
  ('Casual Graphic T-Shirt', 24.99, '/casual-graphic-tshirt.jpg', 'Soft and breathable t-shirt with unique graphic design. Perfect for expressing your personal style.', 'Tops', ARRAY['100% Cotton', 'Soft Fabric', 'Unique Design', 'Machine Washable']),
  ('Athletic Jogger Pants', 39.99, '/athletic-jogger-pants.jpg', 'Comfortable jogger pants with elastic waistband and tapered legs. Ideal for workouts or casual outings.', 'Bottoms', ARRAY['Elastic Waistband', 'Drawstring Closure', 'Tapered Legs', 'Moisture-Wicking']),
  ('Leather Bomber Jacket', 129.99, '/leather-bomber-jacket.jpg', 'Stylish bomber jacket made from genuine leather. Perfect for adding an edgy touch to any outfit.', 'Outerwear', ARRAY['Genuine Leather', 'Ribbed Cuffs', 'Front Zip Closure', 'Multiple Pockets']),
  ('Summer Floral Dress', 59.99, '/summer-floral-dress.jpg', 'Light and breezy summer dress with beautiful floral pattern. Perfect for warm weather occasions.', 'Dresses', ARRAY['Lightweight Fabric', 'Floral Print', 'V-Neck', 'Above Knee Length']);
```

3. Click "Run" to execute the script

### 3. Set Up Storage for Product Images

In the Supabase dashboard:
1. Go to "Storage" in the left sidebar
2. Click "Create Bucket"
3. Name the bucket "products"
4. Set the bucket to "Public" (so images can be displayed on your website)
5. Click "Create"

After creating the bucket, you'll need to set up permissions:
1. Click on the "products" bucket
2. Go to the "Settings" tab
3. In the "Policies" section, make sure the following policies are set:
   - For SELECT: `Allow all users to read images`
   - For INSERT: `Allow authenticated users to upload images`
   - For UPDATE: `Allow authenticated users to update images`
   - For DELETE: `Allow authenticated users to delete images`

Alternatively, you can use this SQL script in the SQL Editor to create the bucket and policies:

```sql
-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('products', 'products', true);

-- Create policies for the products bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Admins can upload"
on storage.objects for insert
with check (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Admins can update" 
on storage.objects for update 
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);

create policy "Admins can delete"
on storage.objects for delete
using (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
);
```

### 4. Set Up Admin Users Table (For Admin Panel Access)

```sql
-- Create admin users table for role-based access control
create table if not exists admin_users (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now(),
  is_admin boolean default true
);

-- Enable Row Level Security on the admin_users table
alter table admin_users enable row level security;

-- Create policies for the admin_users table
create policy "Users can read their own admin status" on admin_users
  for select using (auth.uid() = id);

create policy "Admins can manage admin users" on admin_users
  for all using (
    exists (
      select 1 from admin_users
      where admin_users.id = auth.uid()
      and admin_users.is_admin = true
    )
  );
```

### 5. Configure Authentication

1. Go to "Authentication" in the left sidebar
2. Go to "Providers" and enable "Email" provider
3. In "Settings", make sure "Enable email confirmations" is configured as needed

### 6. Test Your Setup

Run the test script to verify everything is working:

```bash
node test_supabase.js
```

You should see a success message with sample data.

## Troubleshooting

If you encounter any issues:

1. **Table not found errors**: Make sure you've run the SQL scripts in the correct order
2. **Authentication errors**: Check that your API key is correct and that you've enabled the email provider
3. **Connection errors**: Verify that your project URL and API key are correct in the `.env.local` file
4. **Storage errors**: Make sure you've created the "products" bucket and set appropriate policies

## Next Steps

1. Create an admin user account through the Supabase authentication interface
2. Add your own products through the admin panel
3. Customize the sample data as needed for your store