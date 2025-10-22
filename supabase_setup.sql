-- Supabase Setup Script
-- This script creates all necessary tables and inserts sample data

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