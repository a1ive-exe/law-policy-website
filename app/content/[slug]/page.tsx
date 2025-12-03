import { notFound } from 'next/navigation';
import { loadContent } from '@/data/content-loader';
import { loadAuthor } from '@/lib/author-loader';
import { formatDate } from '@/lib/utils';
import Reactions from '@/components/Reactions';
import ShareButtons from '@/components/ShareButtons';
import Comments from '@/components/Comments';
import ContentCard from '@/components/ContentCard';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Linkedin, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export const revalidate = 60; // article page refreshes within 60s

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const allContent = await loadContent();
  const content = allContent.find(item => item.slug === slug);

  if (!content) {
    notFound();
  }

  // Load current author information (always use latest)
  const displayAuthor = await loadAuthor();

  // Find related content
  const relatedContent = allContent
    .filter(item => 
      item.id !== content.id && 
      (item.lawArea === content.lawArea || item.jurisdiction === content.jurisdiction)
    )
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <article className="mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        {content.categoryPath && (
          <nav className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-sm text-slate-500 uppercase tracking-wide">{content.categoryPath}</span>
          </nav>
        )}

        {/* Title Section */}
        <header className="mb-10 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {content.contentType && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wide">
                {content.contentType}
              </span>
            )}
            {content.lawArea && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                <Tag className="w-3 h-3" />
                {content.lawArea}
              </span>
            )}
            {content.jurisdiction && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                {content.jurisdiction}
              </span>
            )}
          </div>
          
          <h1 className="mb-4 text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">{content.title || 'Untitled'}</h1>
          
          {content.subtitle && (
            <p className="text-xl text-slate-600 italic leading-relaxed mb-6">{content.subtitle}</p>
          )}

          {/* Author Info */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">{displayAuthor.name}</div>
                {displayAuthor.credentials && displayAuthor.credentials.length > 0 && (
                  <div className="text-sm text-slate-600">
                    {displayAuthor.credentials.join(' | ')}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-600">
              {content.publishedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(content.publishedDate)}</time>
                </div>
              )}
              {displayAuthor.linkedin && (
                <a
                  href={displayAuthor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {displayAuthor.email && (
                <a
                  href={`mailto:${displayAuthor.email}`}
                  className="inline-flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-700 font-medium uppercase tracking-wide shadow-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="mb-16 bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="prose prose-lg max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-p:text-slate-800 prose-p:leading-relaxed prose-p:text-base prose-p:mb-6
            prose-a:text-slate-900 prose-a:underline prose-a:decoration-slate-400 hover:prose-a:decoration-slate-600 prose-a:font-medium
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-ul:text-slate-800 prose-ol:text-slate-800
            prose-li:leading-relaxed prose-li:mb-2
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-700">
            {content.content ? (
              <div className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed">{content.content}</div>
            ) : (
              <p className="text-slate-500 italic">No content available.</p>
            )}
          </div>
        </div>

        {/* Reactions */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <Reactions contentId={content.id} />
        </div>

        {/* Share Buttons */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <ShareButtons content={content} />
        </div>

        {/* Comments */}
        <div className="border-t border-slate-200 pt-8">
          <Comments contentId={content.id} />
        </div>

        {/* Related Posts */}
        {relatedContent.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Related Posts</h3>
              </div>
              <p className="text-slate-600 ml-15">More from this category</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
