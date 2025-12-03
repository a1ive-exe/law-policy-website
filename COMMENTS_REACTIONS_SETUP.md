# Comments and Reactions Setup Guide

## Issue: "Failed to create comment" or "Failed to create reaction"

This error typically occurs when the database tables don't exist yet. Follow these steps to fix it:

## Step 1: Create the Database Tables

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Schema SQL**
   - Open the file `supabase-comments-reactions-schema.sql` in your project
   - Copy ALL the SQL code from that file
   - Paste it into the Supabase SQL Editor
   - Click "Run" (or press Ctrl+Enter)

4. **Verify Tables Were Created**
   - Go to "Table Editor" in the left sidebar
   - You should see two new tables:
     - `comments`
     - `reactions`

## Step 2: Verify RLS Policies

The SQL schema includes Row Level Security (RLS) policies that allow:
- ✅ Anyone to read comments and reactions
- ✅ Anyone to insert comments and reactions
- ✅ Admins to delete comments

If you see errors about permissions, the RLS policies should already be set by the SQL script.

## Step 3: Test Again

After running the SQL:
1. Refresh your Vercel deployment
2. Try posting a comment
3. Try adding a reaction

## Common Error Codes

- **42P01**: Table does not exist → Run the SQL schema
- **23505**: Duplicate entry → You've already reacted/commented (this is normal)
- **42501**: Permission denied → Check RLS policies

## Troubleshooting

### If you still get errors:

1. **Check Vercel Logs**
   - Go to your Vercel project → Functions → View logs
   - Look for detailed error messages

2. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for database errors

3. **Verify Environment Variables**
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel

4. **Test in Supabase SQL Editor**
   ```sql
   -- Test if tables exist
   SELECT * FROM comments LIMIT 1;
   SELECT * FROM reactions LIMIT 1;
   ```

## Need Help?

If errors persist, check:
- The error message in the browser alert (it now shows detailed info)
- Vercel function logs for server-side errors
- Supabase logs for database errors

