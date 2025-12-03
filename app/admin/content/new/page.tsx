import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import ContentEditor from '@/components/ContentEditor';
export const dynamic = 'force-dynamic';

export default async function NewContentPage() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin/login');
  }

  return <ContentEditor />;
}


