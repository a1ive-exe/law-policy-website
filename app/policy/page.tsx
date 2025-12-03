import { loadContent } from '@/data/content-loader';
import { getPolicyRecommendations } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { FileCheck } from 'lucide-react';
export const revalidate = 60;

export default async function PolicyPage() {
  const content = await loadContent();
  const policyContent = getPolicyRecommendations(content);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
            <FileCheck className="w-4 h-4" />
            <span>Policy Recommendations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Policy Recommendations</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600">
            Domestic Policy Reforms & Proposals
          </p>
        </header>

        {policyContent.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {policyContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No policy recommendations available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
