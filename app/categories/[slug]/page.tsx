import { notFound } from 'next/navigation';
import { lawAreas } from '@/data/content';
import { loadContent } from '@/data/content-loader';
import { getContentByCategory } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { BookOpen, Filter } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    jurisdiction?: string;
    type?: string;
  }>;
}
export const revalidate = 60;

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { jurisdiction: jurisdictionParam, type: typeParam } = await searchParams;
  
  const lawArea = lawAreas.find(area => area.slug === slug);
  
  if (!lawArea) {
    notFound();
  }

  const jurisdiction = jurisdictionParam as 'International' | 'Domestic' | undefined;
  const contentType = typeParam as 'Article' | 'Blog' | 'Paper' | undefined;

  const allContent = await loadContent();
  const filteredContent = getContentByCategory(
    allContent,
    lawArea.name,
    jurisdiction,
    contentType
  );

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">{lawArea.name}</h1>
              {lawArea.description && (
                <p className="mt-2 text-slate-600">{lawArea.description}</p>
              )}
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Filter Content</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/categories/${slug}`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !jurisdiction && !contentType
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </Link>
            <Link
              href={`/categories/${slug}?jurisdiction=International`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                jurisdiction === 'International'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              International
            </Link>
            <Link
              href={`/categories/${slug}?jurisdiction=Domestic`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                jurisdiction === 'Domestic'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Domestic
            </Link>
            <Link
              href={`/categories/${slug}${jurisdiction ? `?jurisdiction=${jurisdiction}` : ''}&type=Article`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                contentType === 'Article'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Articles
            </Link>
            <Link
              href={`/categories/${slug}${jurisdiction ? `?jurisdiction=${jurisdiction}` : ''}&type=Blog`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                contentType === 'Blog'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}
            >
              Blogs
            </Link>
            <Link
              href={`/categories/${slug}${jurisdiction ? `?jurisdiction=${jurisdiction}` : ''}&type=Paper`}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                contentType === 'Paper'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Papers
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No content found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
