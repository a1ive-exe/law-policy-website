import { loadAuthor } from '@/lib/author-loader';
import { User, Mail, Linkedin, GraduationCap } from 'lucide-react';

export default async function AboutPage() {
  const author = await loadAuthor();
  
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">About the Platform</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
        </header>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p className="mb-6 text-lg">
              Founded by Devesh Mandhata, this platform aims to bridge the gap between academic research
              and practical law and policy insights. We provide comprehensive analysis across diverse areas
              of law including intellectual property, technology law, mergers & acquisitions, labour law,
              environmental law, and policy recommendations.
            </p>
            <p className="mb-6 text-lg">
              Our mission is to make complex legal and policy issues accessible to practitioners,
              academics, policymakers, and the general public through rigorous research, clear analysis,
              and thoughtful recommendations.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Author</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-slate-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{author.name || 'Author'}</h3>
              
              {(author.credentials && author.credentials.length > 0) && (
                <div className="space-y-3 mb-6">
                  {author.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-700">
                      <GraduationCap className="w-5 h-5 text-slate-500" />
                      <span>{credential}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-medium border-2 border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
