import Link from 'next/link';
import { Scale, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 text-white">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-lg font-serif font-bold text-white">Devesh Mandhata</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A platform for in-depth legal, policy, and jurisprudential analysis across diverse areas.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Content</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/general/articles" className="text-sm text-slate-400 hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/general/blogs" className="text-sm text-slate-400 hover:text-white transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link href="/general/papers" className="text-sm text-slate-400 hover:text-white transition-colors">
                  All Papers
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Policy Recommendations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/in/deveshmandhata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@deveshmandhata.com"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Devesh Mandhata. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
