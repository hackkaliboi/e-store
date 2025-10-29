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

#### supabase_unified_setup.sql
Use this single script to create all necessary tables, storage buckets, and policies on a fresh Supabase project. This unified script includes:
- All necessary tables (products, profiles with profile_type field)
- Storage buckets (products, media)
- All required Row Level Security (RLS) policies
- Proper permissions for admin and regular users

### 4. Running the Setup Script

1. In the Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase_unified_setup.sql` into the editor
3. Click "Run" to execute the script

This script is designed to work with a fresh Supabase project and will create all necessary tables, storage buckets, and policies without any conflicts. If you encounter ownership errors with storage policies, follow the instructions in the comments at the end of the script.

### 5. Migration from Previous Version

If you're updating from a previous version of the project, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed instructions on migrating your existing data to the new structure.

## Authentication Setup

1. Go to "Authentication" in the Supabase dashboard
2. Go to "Providers" and enable "Email" provider
3. In "Settings", configure email confirmations as needed

## Admin Panel Access

To access the admin panel:

1. Create an admin user account through the Supabase authentication interface
2. Update the user's profile in the `profiles` table to set `profile_type` to `'admin'`
3. Access the admin panel at `/admin`

Alternatively, you can use the Admin Management section in the admin dashboard to add admin users by email.

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
5. **Storage policy ownership error**: If you encounter "ERROR: 42501: must be owner of table objects", follow the instructions in `supabase_unified_setup.sql` or enable RLS through the Supabase dashboard interface.

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