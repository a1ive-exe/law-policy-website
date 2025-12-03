# Admin Guide

## Accessing the Admin Panel

1. Navigate to `/admin/login` in your browser
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the admin dashboard

**Important**: Change the default password in production by setting the `ADMIN_PASSWORD` environment variable.

## Admin Features

### Dashboard (`/admin`)
- View all content in a table format
- Search content by title, excerpt, or tags
- Filter by content type (Articles, Blogs, Papers, Policy Recommendations)
- Quick stats showing total content counts
- Direct links to edit or delete content

### Creating New Content
1. Click "Create New Content" button on the dashboard
2. Fill in the content form:
   - **Title** (required): The main title of your content
   - **Subtitle** (optional): A subtitle or alternative title
   - **Slug** (optional): URL-friendly version (auto-generated from title if not provided)
   - **Content Type**: Select Article, Blog, Paper, or check "Policy Recommendation"
   - **Law Area**: Select the area of law (if not a policy recommendation)
   - **Jurisdiction**: Select International, Domestic, or Both
   - **Published Date**: Set the publication date
   - **Featured**: Check to feature this content on the homepage
   - **Excerpt** (required): Short description that appears in listings
   - **Content** (required): Full content body (supports Markdown)
   - **Tags**: Press Enter after each tag to add them
3. Click "Create Content" to save

### Editing Content
1. From the dashboard, click "Edit" on any content item
2. Make your changes
3. Click "Update Content" to save

### Deleting Content
1. From the dashboard, click "Delete" on any content item
2. Confirm the deletion
3. The content will be permanently removed

## Content Storage

Content is stored in `data/content.json`. This file is automatically created when you add your first content. If the file doesn't exist, the system uses the default sample content from `data/content.ts`.

## Security Notes

- The admin password is currently stored in `lib/auth.ts`
- **For production**: 
  - Set `ADMIN_PASSWORD` environment variable
  - Use a strong password
  - Consider implementing proper user authentication with a database
  - Add rate limiting to login attempts
  - Use HTTPS

## Content Structure

Each content item includes:
- Unique ID (auto-generated)
- Title, subtitle, slug
- Author information (defaults to Devesh Mandhata)
- Publication date
- Category path (auto-generated)
- Content type and classification
- Tags for searchability
- Featured flag

## Troubleshooting

- **Can't login**: Check that cookies are enabled in your browser
- **Content not saving**: Check that `data/content.json` is writable
- **Build errors**: Make sure all required fields are filled when creating content


