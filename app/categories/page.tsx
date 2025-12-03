import { lawAreas } from '@/data/content';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Browse by Category</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600">Explore our comprehensive collection of legal content</p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lawAreas.map((area) => (
            <Link
              key={area.id}
              href={`/categories/${area.slug}`}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {area.name}
                </h2>
              </div>
              {area.description && (
                <p className="mb-4 text-sm text-slate-600 leading-relaxed">{area.description}</p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">View content</span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
