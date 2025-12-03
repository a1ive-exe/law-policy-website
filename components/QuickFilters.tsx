import Link from 'next/link';
import { lawAreas } from '@/data/content';
import { BookOpen, Globe, FileText, FileCheck, ArrowRight } from 'lucide-react';

export default function QuickFilters() {
  return (
    <div className="bg-white">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
          <h3 className="text-3xl font-serif font-bold text-slate-900">Browse by Category</h3>
        </div>
        <p className="text-slate-600 ml-15">Navigate through our comprehensive content library</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Area of Law</h4>
          </div>
          <div className="space-y-2">
            {lawAreas.map((area) => (
              <Link
                key={area.id}
                href={`/categories/${area.slug}`}
                className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
              >
                <span className="font-medium">{area.name}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Jurisdiction</h4>
          </div>
          <div className="space-y-2">
            <Link
              href="/categories?jurisdiction=International"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">International</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/categories?jurisdiction=Domestic"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">Domestic</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Content Type</h4>
          </div>
          <div className="space-y-2">
            <Link
              href="/general/articles"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">Articles</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/general/blogs"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">Blogs</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/general/papers"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">Papers</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/policy"
              className="group flex items-center justify-between p-3 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span className="font-medium">Policy Recommendations</span>
              <FileCheck className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
