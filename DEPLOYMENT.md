# Deployment Guide

This guide will help you deploy your Law & Policy website to production with a custom domain.

## Recommended Stack

### Hosting: Vercel (Free Tier)
- **Why**: Perfect for Next.js, automatic deployments, free SSL, CDN
- **Free tier includes**: 
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Serverless functions
  - Automatic HTTPS

### Database: Supabase (Free Tier)
- **Why**: PostgreSQL database, easy to use, generous free tier
- **Free tier includes**:
  - 500 MB database storage
  - 2 GB bandwidth/month
  - Unlimited API requests
  - Row Level Security

## Step 1: Set Up Supabase

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy your:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - Anon/Public key

3. **Set Up Database**
   - Go to SQL Editor in Supabase
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script
   - This creates the `content` table with all necessary indexes

4. **Optional: Migrate Existing Content**
   - If you have content in `data/content.json`, you can import it:
   - Go to Table Editor → content
   - Manually add entries or use the Supabase API

## Step 2: Set Up Environment Variables

### Local Development (.env.local)

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Admin Password (change this!)
ADMIN_PASSWORD=your-secure-password-here
```

### Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add the same variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link to your Vercel account
   - Add environment variables when prompted

### Option B: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

## Step 4: Connect Custom Domain

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Follow DNS configuration instructions

2. **DNS Configuration**
   - Add the DNS records Vercel provides to your domain registrar
   - Wait for DNS propagation (usually 5-60 minutes)
   - Vercel automatically provides SSL certificates

## Step 5: Verify Deployment

1. **Test the Website**
   - Visit your domain
   - Check all pages load correctly
   - Test search functionality
   - Test admin panel login

2. **Test Admin Features**
   - Go to `/admin/login`
   - Login with your admin password
   - Create a test article
   - Verify it appears on the site
   - Edit and delete to ensure CRUD works

## Cost Breakdown (Free Tier)

- **Vercel**: Free (unless you exceed limits)
- **Supabase**: Free (unless you exceed limits)
- **Domain**: ~$10-15/year (depending on registrar)
- **Total**: ~$10-15/year

## Monitoring & Maintenance

### Check Vercel Analytics
- Monitor bandwidth usage
- Check function execution times
- View error logs

### Check Supabase Dashboard
- Monitor database size
- Check API usage
- Review query performance

### Regular Backups
- Supabase automatically backs up your database
- You can also export data manually from Supabase dashboard

## Troubleshooting

### Database Connection Issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies allow operations

### Build Errors
- Check Vercel build logs
- Verify all dependencies are installed
- Ensure TypeScript compiles without errors

### Content Not Appearing
- Check Supabase dashboard to see if data exists
- Verify API routes are working
- Check browser console for errors

## Security Checklist

- [ ] Changed default admin password
- [ ] Set strong `ADMIN_PASSWORD` in environment variables
- [ ] Verified HTTPS is enabled (automatic on Vercel)
- [ ] Reviewed Supabase RLS policies
- [ ] Enabled Vercel password protection (optional, for staging)

## Next Steps (Optional)

1. **Add Analytics**: Google Analytics or Vercel Analytics
2. **Set Up Monitoring**: Sentry for error tracking
3. **CDN**: Already included with Vercel
4. **Email**: Set up email notifications for admin actions
5. **Backup Strategy**: Regular database exports

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs


