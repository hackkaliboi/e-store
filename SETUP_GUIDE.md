# E-Store Setup Guide

This guide provides comprehensive instructions for setting up the E-Store application with Supabase backend services.

## Project Overview

The E-Store is a modern e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS. It features product listings, detailed product pages, and an admin panel for managing products.

## Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- A Supabase account

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd E-Store
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Note down your Project URL and API keys

### 2. Set up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database and Storage Setup

This project provides a SQL script for setting up Supabase with a fresh project:

#### supabase_setup.sql
Use this script to create all necessary tables and storage buckets on a fresh Supabase project:
```sql
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
```

### 4. Running the Setup Script

1. In the Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase_setup.sql` into the editor
3. Click "Run" to execute the script

This script is designed to work with a fresh Supabase project and will create all necessary tables and storage buckets without any conflicts.

## Authentication Setup

1. Go to "Authentication" in the Supabase dashboard
2. Go to "Providers" and enable "Email" provider
3. In "Settings", configure email confirmations as needed

## Admin Panel Access

To access the admin panel:

1. Create an admin user account through the Supabase authentication interface
2. Add the user to the `admin_users` table with `is_admin` set to `true`
3. Access the admin panel at `/admin`

## Development

To run the development server:
```bash
pnpm dev
```

Open your browser to [http://localhost:3000](http://localhost:3000)

## Building for Production

```
# Build the application
pnpm build

# Start the production server
pnpm start
```

## Troubleshooting

### Common Issues

1. **Table not found errors**: Make sure you've run the SQL script
2. **Authentication errors**: Check that your API key is correct and that you've enabled the email provider
3. **Connection errors**: Verify that your project URL and API key are correct in the `.env.local` file
4. **Storage errors**: Make sure you've created the "products" bucket and set appropriate policies

### Testing Your Setup

Run the test script to verify everything is working:
```bash
node test_supabase.js
```

You should see a success message indicating connection to Supabase without any data errors.

## Next Steps

1. Create an admin user account through the Supabase authentication interface
2. Add your own products through the admin panel
3. Your store will start with a clean slate, ready for your own product data