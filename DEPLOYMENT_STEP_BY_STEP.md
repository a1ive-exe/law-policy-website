# Complete Step-by-Step Deployment Guide to Vercel

This is a detailed, beginner-friendly guide to deploy your Law & Policy website to Vercel. Follow each step carefully.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] A GitHub account (free) - https://github.com
- [ ] A Supabase account (free) - https://supabase.com
- [ ] A Vercel account (free) - https://vercel.com
- [ ] Node.js installed on your computer (you already have this)
- [ ] Git installed (you already have this)

---

## 🗄️ STEP 1: Set Up Supabase Database

### 1.1 Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### 1.2 Create a New Project

1. Once logged in, click **"New Project"** button
2. Fill in the details:
   - **Name**: `law-policy-website` (or any name you prefer)
   - **Database Password**: Create a strong password (SAVE THIS - you'll need it)
   - **Region**: Choose closest to your users (e.g., `Southeast Asia (Singapore)`)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be created

### 1.3 Get Your Supabase Credentials

1. Once your project is ready, click on it to open it
2. In the left sidebar, click **"Project Settings"** (gear icon)
3. Click **"API"** in the settings menu
4. You'll see two important values:
   - **Project URL**: Copy this (looks like `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key**: Copy this (long string starting with `eyJ...`)
   
   **⚠️ IMPORTANT:** Save both of these in a text file temporarily - you'll need them later!

### 1.4 Set Up Database Tables

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project folder
4. Copy ALL the contents of that file
5. Paste it into the SQL Editor
6. Click **"Run"** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
7. You should see a success message saying "Success. No rows returned"

### 1.5 Verify Database Setup

1. In the left sidebar, click **"Table Editor"**
2. You should see two tables:
   - `content` (for your articles/blogs/papers)
   - `author` (for author information)
3. If you see these tables, you're good to go! ✅

---

## 🧪 STEP 2: Test Locally with Supabase

### 2.1 Create Local Environment File

1. In your project folder (`D:\Devesh\law-policy-website`), create a new file named `.env.local`
2. Open it in a text editor (VS Code, Notepad, etc.)
3. Add these lines (replace with YOUR actual values from Step 1.3):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Password (choose a secure password)
ADMIN_PASSWORD=YourSecurePassword123!
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MywiZXhwIjoxOTU0NTQzMjgzfQ.abcdefghijklmnopqrstuvwxyz
ADMIN_PASSWORD=MySecureAdminPass2024!
```

4. **Save** the file (`.env.local` should be in your project root)

### 2.2 Test the Application Locally

1. Open a terminal in your project folder
2. Make sure your dev server is running:
   ```powershell
   npm run dev
   ```
3. Open **http://localhost:3000** in your browser
4. Check if:
   - The homepage loads ✅
   - No console errors (check browser DevTools - F12)
   - You can navigate around the site
5. Test admin panel:
   - Go to **http://localhost:3000/admin/login**
   - Log in with the password you set in `ADMIN_PASSWORD`
   - Try creating a test article
   - Verify it appears on the site

**If everything works locally, you're ready to deploy!** ✅

---

## 📦 STEP 3: Push Code to GitHub

### 3.1 Commit Your Current Changes

Open a terminal in your project folder and run:

```powershell
cd D:\Devesh\law-policy-website

# Add all changes
git add .

# Commit with a message
git commit -m "Prepare for deployment to Vercel"

# Check status (should show "nothing to commit")
git status
```

### 3.2 Create GitHub Repository

1. Go to **https://github.com** and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `law-policy-website` (or your preferred name)
   - **Description**: "Law and Policy Analysis Website"
   - **Visibility**: Choose **Private** (recommended) or **Public**
   - **DO NOT** check "Add a README file" (you already have one)
4. Click **"Create repository"**

### 3.3 Connect and Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```powershell
# Check if you already have a remote (this might fail - that's okay)
git remote -v

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/law-policy-website.git

# If you already have a remote, update it instead:
# git remote set-url origin https://github.com/YOUR_USERNAME/law-policy-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub username and password (or use a Personal Access Token if 2FA is enabled).

**Verify:** Go to your GitHub repository page - you should see all your files! ✅

---

## 🚀 STEP 4: Deploy to Vercel

### 4.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended - easiest way)
4. Authorize Vercel to access your GitHub account

### 4.2 Import Your Repository

1. Once logged into Vercel, you'll see a dashboard
2. Click **"Add New..."** → **"Project"**
3. You should see your GitHub repositories listed
4. Find **`law-policy-website`** and click **"Import"**

### 4.3 Configure Project Settings

Vercel will auto-detect Next.js. The settings should be:
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**Click "Deploy" button** - but wait! Don't click yet, we need to add environment variables first!

---

## 🔐 STEP 5: Add Environment Variables to Vercel

### 5.1 Add Environment Variables Before First Deploy

On the Vercel project configuration page, BEFORE clicking "Deploy":

1. Scroll down to **"Environment Variables"** section
2. Add each variable one by one:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: (paste your Supabase Project URL from Step 1.3)
   - **Environments**: Check all boxes (Production, Preview, Development)
   - Click **"Add"**

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: (paste your Supabase anon key from Step 1.3)
   - **Environments**: Check all boxes
   - Click **"Add"**

   **Variable 3:**
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: (the same password you used in `.env.local`)
   - **Environments**: Check all boxes
   - Click **"Add"**

### 5.2 Deploy!

1. After adding all 3 environment variables, scroll up
2. Click the big **"Deploy"** button
3. Wait 2-3 minutes for the build to complete
4. You'll see a progress log - watch it build!

---

## ✅ STEP 6: Verify Deployment

### 6.1 Check Your Live Site

1. Once deployment finishes, Vercel will show you:
   - A **"Congratulations"** message
   - Your live URL: `https://law-policy-website-xxxxx.vercel.app`
2. Click the URL to open your live site!
3. Test the homepage - it should load perfectly ✅

### 6.2 Test Key Features

1. **Homepage**: Should load with content
2. **Admin Login**: 
   - Go to `https://your-site.vercel.app/admin/login`
   - Log in with your `ADMIN_PASSWORD`
   - Should redirect to admin dashboard
3. **Create Test Content**:
   - In admin panel, click "Create New Content"
   - Fill in a test article
   - Save it
   - Check if it appears on the homepage

### 6.3 Check for Errors

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for any red errors
4. If you see Supabase errors, check:
   - Environment variables are set correctly in Vercel
   - Supabase project is active
   - Database tables exist

---

## 🎉 Success!

Your website is now live! Here's what you accomplished:

✅ Database set up in Supabase  
✅ Code pushed to GitHub  
✅ Deployed to Vercel  
✅ Environment variables configured  
✅ Live website accessible worldwide  

---

## 🔧 Troubleshooting

### Problem: Build fails on Vercel

**Solution:**
- Check Vercel build logs for error messages
- Verify all environment variables are set
- Make sure TypeScript compiles: run `npm run build` locally first

### Problem: Site loads but shows no content

**Solution:**
- Check Supabase environment variables in Vercel
- Verify database tables exist in Supabase
- Check browser console for errors

### Problem: Admin login doesn't work

**Solution:**
- Verify `ADMIN_PASSWORD` is set correctly in Vercel
- Make sure you're using the exact same password
- Check Vercel environment variables are saved

### Problem: Can't push to GitHub

**Solution:**
- Verify you're logged into GitHub: `git config --global user.name` and `git config --global user.email`
- Use GitHub Personal Access Token if 2FA is enabled
- Check repository permissions

---

## 📚 Next Steps (Optional)

### Custom Domain
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel → Your Project → Settings → Domains
3. Add your domain and follow DNS instructions

### Monitor Your Site
- **Vercel Analytics**: View traffic and performance
- **Supabase Dashboard**: Monitor database usage
- **Error Logs**: Check Vercel logs for issues

### Add Content
- Use the admin panel to add articles
- Content is stored in Supabase
- Changes are live immediately

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Congratulations on deploying your website! 🎊**


