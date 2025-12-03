# Law & Policy Website

A modern, content-focused website for legal and policy analysis built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Content Management
- **Hierarchical Taxonomy**: Content organized by Law Area → Jurisdiction → Content Type
- **Dynamic Categories**: Easy to add, modify, or delete law areas
- **Policy Recommendations**: Independent section for policy proposals
- **General Unified View**: Browse all content by type (Articles, Blogs, Papers, Policy)
- **Admin Panel**: Full CRUD operations for content management

### Admin Features
- **Secure Authentication**: Password-protected admin access
- **Content Dashboard**: View, search, and filter all content
- **Create Content**: Add new articles, blogs, papers, or policy recommendations
- **Edit Content**: Update existing content with full form
- **Delete Content**: Remove content with confirmation
- **Auto-categorization**: Category paths generated automatically

### User Features
- **Featured Content Carousel**: Highlights important works
- **Search Functionality**: Full-text search across all content
- **Reactions & Comments**: Interactive engagement features (one-time reactions)
- **Social Sharing**: Share content on LinkedIn, Twitter/X, WhatsApp
- **Responsive Design**: Mobile-friendly layout

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file:
   ```env
   # Supabase (get from https://supabase.com)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   
   # Admin Password (change this!)
   ADMIN_PASSWORD=your-secure-password
   ```

3. **Set up Supabase database:**
   - Create a project at https://supabase.com
   - Go to SQL Editor
   - Run the SQL from `supabase-schema.sql`
   - Copy your project URL and anon key to `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Database Migration

If you have existing content in `data/content.json`, you can migrate it to Supabase:

```bash
npm run migrate
```

This will:
- Read content from `data/content.json`
- Upload to Supabase
- Skip duplicates

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

**Quick Summary:**
1. Set up Supabase (free tier)
2. Deploy to Vercel (free tier)
3. Add environment variables in Vercel
4. Connect your custom domain

**Cost:** ~$10-15/year (just the domain)

## Project Structure

```
law-policy-website/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── content/           # Content display pages
│   └── ...                # Other pages
├── components/             # React components
├── data/                  # Data files and loaders
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── scripts/               # Migration scripts
```

## Admin Panel

### Accessing Admin

1. Navigate to `/admin/login`
2. Default password: Set via `ADMIN_PASSWORD` environment variable
3. After login, you'll be redirected to `/admin` dashboard

### Managing Content

- **Create**: Click "Create New Content" → Fill form → Save
- **Edit**: Click "Edit" on any content item → Modify → Update
- **Delete**: Click "Delete" on any content item → Confirm

See `ADMIN_GUIDE.md` for detailed instructions.

## Development

### Local Development (No Database)

The app works without Supabase for local development:
- Uses sample content from `data/content.ts`
- File-based storage for admin changes (saves to `data/content.json`)
- Perfect for development and testing

### Production (With Database)

When deployed with Supabase:
- All content stored in PostgreSQL
- Automatic backups
- Better performance
- Scalable

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | For production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | For production |
| `ADMIN_PASSWORD` | Admin panel password | Yes |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Migrate content to Supabase

## Support

- **Deployment Guide**: See `DEPLOYMENT.md`
- **Admin Guide**: See `ADMIN_GUIDE.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
