# Admin Dashboard Content Visibility Fix

## Problem
Content appears on the homepage but doesn't show in the admin dashboard where it can be deleted.

## Root Cause
The admin dashboard was experiencing caching issues on Vercel, causing it to show stale/empty data even though content exists in Supabase.

## Fixes Applied

### 1. **API Route Cache Control** (`app/api/content/route.ts`)
- ✅ Added `export const dynamic = 'force-dynamic'` to disable static generation
- ✅ Added `export const revalidate = 0` to prevent caching
- ✅ Added cache-control headers to responses
- ✅ Improved error logging for debugging

### 2. **Admin Dashboard Improvements** (`components/AdminDashboard.tsx`)
- ✅ Added cache-busting query parameter (`?t=${Date.now()}`)
- ✅ Added "Refresh" button to manually refresh content
- ✅ Added auto-refresh when window gains focus
- ✅ Shows content count in header: "Manage your content (X items)"
- ✅ Better error handling and logging
- ✅ Refreshes content list after deletion

### 3. **Better Error Handling**
- ✅ API route now logs errors to console for debugging
- ✅ Admin dashboard shows error messages if fetch fails

---

## How to Use

### Immediate Fix (After Deployment)
1. **Go to Admin Dashboard**: `/admin`
2. **Click "Refresh" button** (top right, next to "View Site")
3. **Check browser console** (F12) for any errors
4. All content should now appear

### If Content Still Doesn't Show

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for errors starting with `[API]`
   - These will tell you if Supabase connection is failing

2. **Verify Supabase Connection**:
   - Check that environment variables are set in Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Verify these match your Supabase project

3. **Check Supabase Dashboard**:
   - Go to your Supabase project
   - Navigate to Table Editor → `content`
   - Verify the content exists there
   - Check if there are any RLS (Row Level Security) policies blocking access

4. **Force Refresh**:
   - Hard refresh the admin page: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or click the "Refresh" button multiple times

---

## Deployment Steps

Since your project is already deployed on Vercel:

1. **Commit and Push Changes**:
   ```bash
   git add .
   git commit -m "Fix admin dashboard content visibility and caching"
   git push
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)

3. **After deployment**:
   - Go to `/admin`
   - Click "Refresh" button
   - Content should appear

---

## Troubleshooting

### If content still doesn't appear:

**Check 1: Supabase RLS Policies**
- Go to Supabase Dashboard → Authentication → Policies
- Ensure the `content` table has a policy allowing SELECT for anonymous users:
  ```sql
  CREATE POLICY "Public read access"
    ON content
    FOR SELECT
    USING (true);
  ```

**Check 2: Environment Variables**
- In Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify both Supabase variables are set correctly
- Make sure they're set for **Production** environment

**Check 3: API Route Response**
- Open browser DevTools → Network tab
- Go to `/admin` page
- Find the request to `/api/content`
- Check the Response - it should show your content as JSON
- If it's empty `[]`, check the console for errors

**Check 4: Content in Database**
- Go to Supabase Dashboard → Table Editor → `content`
- Verify the content exists
- Check the `id` field - make sure it's not null

---

## What Changed

### Files Modified:
1. `app/api/content/route.ts` - Added cache control and better error handling
2. `components/AdminDashboard.tsx` - Added refresh functionality and cache-busting

### New Features:
- ✅ Refresh button in admin dashboard
- ✅ Auto-refresh on window focus
- ✅ Content count display
- ✅ Better error messages
- ✅ Cache-busting to prevent stale data

---

## Expected Behavior After Fix

1. **Admin Dashboard** shows all content from Supabase
2. **Refresh button** updates the list immediately
3. **After deleting** content, list refreshes automatically
4. **Content count** shows accurate number in header
5. **No caching issues** - always shows latest data

---

If you still have issues after deployment, check the browser console for error messages and share them for further debugging.

