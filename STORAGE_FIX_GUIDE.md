# Supabase Storage Fix Guide

This guide will help you resolve the image upload issues in your admin dashboard.

## Common Causes of Storage Upload Failures

1. **Missing Storage Policies** - Most common cause
2. **Authentication Issues** - User not properly authenticated
3. **File Size Limits** - Files too large for upload
4. **Network/Security Issues** - Ad blockers or security software
5. **Bucket Configuration Issues** - Incorrect bucket setup

## Solution Steps

### Step 1: Apply Storage Policies

Run the SQL commands in `supabase_unified_setup.sql` in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase_unified_setup.sql`
4. Run the queries

If you encounter ownership errors, follow the instructions in the comments at the end of the file for alternative approaches.

### Step 2: Test Authentication

Ensure you're logged in as an admin user when uploading images. The enhanced error handling will now tell you if authentication is the issue.

### Step 3: Check File Size

Try uploading a smaller image (under 50MB) to test if file size is the issue.

### Step 4: Use Diagnostic Tools

1. Visit `/admin/storage-diagnostic` to run comprehensive storage tests
2. Visit `/admin/test-upload` to test individual file uploads
3. Check browser console for detailed error messages

## Enhanced Error Messages

The updated code now provides more specific error messages:
- Authentication issues
- Permission denied errors
- File size limit errors
- General upload failures with detailed messages

## Troubleshooting Tips

1. **Check Browser Console**: Look for detailed error messages
2. **Verify Authentication**: Ensure you're logged in as admin
3. **Test with Small Files**: Try uploading a small image first
4. **Disable Ad Blockers**: Some security software blocks storage uploads
5. **Check Network Tab**: Look for failed requests in browser dev tools

## If Issues Persist

1. Run the diagnostic tool at `/admin/storage-diagnostic`
2. Check the detailed logs in your browser console
3. Verify your Supabase project settings
4. Ensure your `.env.local` file has correct credentials