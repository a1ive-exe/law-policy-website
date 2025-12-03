import { redirect, notFound } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import ContentEditor from '@/components/ContentEditor';
import { loadContent } from '@/data/content-loader';
import { ContentItem } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}
export const dynamic = 'force-dynamic';

export default async function EditContentPage({ params }: PageProps) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const content = await loadContent();
  const item = content.find((c: ContentItem) => c.id === id);

  if (!item) {
    notFound();
  }

  return <ContentEditor initialContent={item} />;
}

