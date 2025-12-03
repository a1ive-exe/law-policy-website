import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import AdminDashboard from '@/components/AdminDashboard';
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}


