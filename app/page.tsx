import { loadContent } from '@/data/content-loader';
import { getFeaturedContent, getLatestContent } from '@/lib/utils';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import QuickFilters from '@/components/QuickFilters';
import ContentCard from '@/components/ContentCard';
import { BookOpen, FileText, BookMarked, FileCheck } from 'lucide-react';

export const revalidate = 60; // homepage refreshes within 60s


export default async function Home() {
  const content = await loadContent();
  const featured = getFeaturedContent(content);
  const latest = getLatestContent(content, 6);

  // Calculate stats dynamically
  const lawAreaSet = new Set<string>();
  const jurisdictionSet = new Set<string>();
  const contentTypeSet = new Set<string>();
  
  content.forEach(c => {
    if (c.lawArea) lawAreaSet.add(c.lawArea);
    if (c.jurisdiction) jurisdictionSet.add(c.jurisdiction);
    if (c.contentType) contentTypeSet.add(c.contentType);
  });
  
  const uniqueLawAreas = lawAreaSet.size;
  const uniqueJurisdictions = jurisdictionSet.size;
  const uniqueContentTypes = contentTypeSet.size;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Legal & Policy Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Law, Policy, and Jurisprudence Perspectives
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            A platform for in-depth legal, policy, and jurisprudential analysis across diverse areas of law.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/general/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              Browse Articles
            </a>
            <a
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-medium border-2 border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
            >
              <BookMarked className="w-5 h-5" />
              Explore Categories
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">{content.length}</div>
            <div className="text-sm text-slate-600 font-medium">Total Publications</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">{uniqueLawAreas}</div>
            <div className="text-sm text-slate-600 font-medium">Law Areas</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">{uniqueJurisdictions}</div>
            <div className="text-sm text-slate-600 font-medium">Jurisdictions</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">{uniqueContentTypes}</div>
            <div className="text-sm text-slate-600 font-medium">Content Types</div>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      {featured.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Featured</h2>
            </div>
            <p className="text-slate-600 ml-15">Selected works of particular importance</p>
          </div>
          <FeaturedCarousel items={featured} />
        </div>
      )}

      {/* Latest Publications */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Latest Publications</h2>
          </div>
          <p className="text-slate-600 ml-15">Recent articles, blogs, papers, and policy recommendations</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <QuickFilters />
        </div>
      </div>

      {/* About the Platform */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-12 border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">About the Platform</h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-4">
                Founded by Devesh Mandhata, this platform aims to bridge the gap between academic research
                and practical law and policy insights. We provide comprehensive analysis across intellectual property,
                technology law, mergers & acquisitions, labour law, environmental law, and policy recommendations.
              </p>
              <p>
                Our mission is to make complex legal and policy issues accessible to practitioners,
                academics, policymakers, and the general public through rigorous research, clear analysis,
                and thoughtful recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
