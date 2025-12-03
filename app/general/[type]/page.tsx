import { notFound } from 'next/navigation';
import { loadContent } from '@/data/content-loader';
import { getAllContentByType } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { FileText, BookOpen, FileCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}
export const revalidate = 60;

export default async function GeneralTypePage({ params }: PageProps) {
  const { type } = await params;
  const validTypes = ['articles', 'blogs', 'papers', 'policy'];
  
  if (!validTypes.includes(type)) {
    notFound();
  }

  const typeMap: Record<string, 'Article' | 'Blog' | 'Paper'> = {
    articles: 'Article',
    blogs: 'Blog',
    papers: 'Paper',
  };

  const contentType = typeMap[type];
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  
  const iconMap: Record<string, typeof FileText> = {
    articles: FileText,
    blogs: BookOpen,
    papers: FileText,
    policy: FileCheck,
  };
  
  const Icon = iconMap[type] || FileText;
  
  const allContent = await loadContent();
  let content: typeof allContent;
  if (type === 'policy') {
    content = allContent.filter(item => item.isPolicyRecommendation);
  } else if (contentType) {
    content = getAllContentByType(allContent, contentType);
  } else {
    content = [];
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-6">
            <Icon className="w-4 h-4" />
            <span>All {title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">All {title}</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
        </header>

        {content.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No {type} available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
