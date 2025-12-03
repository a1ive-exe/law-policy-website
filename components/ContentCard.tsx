import Link from 'next/link';
import { ContentItem } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface ContentCardProps {
  content: ContentItem;
  showCategoryPath?: boolean;
}

export default function ContentCard({ content, showCategoryPath = true }: ContentCardProps) {
  return (
    <Link
      href={`/content/${content.slug}`}
      className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
    >
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
      
      <h3 className="mb-3 text-xl font-serif font-bold text-slate-900 leading-tight group-hover:text-slate-700 transition-colors line-clamp-2">
        {content.title || 'Untitled'}
      </h3>
      
      {content.subtitle && (
        <p className="mb-4 text-sm text-slate-600 italic line-clamp-1">{content.subtitle}</p>
      )}
      
      {content.excerpt && (
        <p className="mb-4 text-sm text-slate-700 leading-relaxed line-clamp-3">{content.excerpt}</p>
      )}
      
      {showCategoryPath && content.categoryPath && (
        <p className="mb-4 text-xs text-slate-500 font-medium">
          {content.categoryPath}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        {content.publishedDate && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(content.publishedDate)}</time>
          </div>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          Read more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
