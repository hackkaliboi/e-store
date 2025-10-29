# New Setup Guide for E-Store with Unified Supabase Configuration

This guide explains how to set up a fresh Supabase project for the E-Store application using the new unified SQL setup file.

## Prerequisites

1. A Supabase account (free tier available)
2. A new Supabase project created in your dashboard

## Setup Instructions

### 1. Database Setup

1. In your Supabase dashboard, navigate to the SQL Editor
2. Copy the entire contents of `supabase_unified_setup.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the script

This will create:
- All necessary tables (products, profiles)
- Storage buckets (products, media)
- All required Row Level Security (RLS) policies
- Proper permissions for admin and regular users

### 2. Environment Variables

Update your `.env.local` file with your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Admin User Setup

To make yourself an admin user:

1. Register/login to your application once to create your profile
2. In the Supabase SQL Editor, run this query to make yourself an admin:

```sql
UPDATE profiles 
SET profile_type = 'admin' 
WHERE id = 'your_user_id';
```

You can find your user ID in the `auth.users` table in your Supabase dashboard.

Alternatively, you can use the Admin Management section in the admin dashboard to add admin users by email.

## Key Improvements in This Version

### 1. Simplified User Management

Instead of having separate `profiles` and `admin_users` tables, we now use a single `profiles` table with a `profile_type` field that can be either 'user' or 'admin'.

### 2. Enhanced Security

All storage operations are now properly secured with Row Level Security policies that check the user's profile type before allowing operations.

### 3. Better Error Handling

The application now provides more specific error messages for storage operations and authentication issues.

## Troubleshooting

### If you encounter storage upload issues:

1. Verify that the SQL setup script ran successfully
2. Check that your user profile has `profile_type` set to 'admin'
3. Ensure you're logged in when attempting uploads
4. Check the browser console for specific error messages

### If admin features aren't working:

1. Verify your profile has `profile_type` set to 'admin'
2. Try logging out and back in to refresh your session
3. Check the browser console for authentication errors

## Testing the Setup

After completing the setup:

1. Start your development server: `pnpm dev`
2. Visit the home page to ensure it loads correctly
3. Try to access `/admin` - you should be redirected to the login page
4. Register/login as a user
5. Update your profile to admin in the database
6. Try to access `/admin` again - you should now see the admin dashboard
7. Try uploading a product image to test storage functionality

## Handling Storage Policy Errors

If you encounter the "ERROR: 42501: must be owner of table objects" error when running the SQL script:

1. Follow the instructions in the comments at the end of `supabase_unified_setup.sql`
2. Set up storage policies manually through the Supabase dashboard interface

## Need Help?

If you encounter any issues with this setup:

1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure the SQL script ran without errors
4. Confirm your user profile has the correct `profile_type`