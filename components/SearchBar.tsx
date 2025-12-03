'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentItem } from '@/types';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ContentItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    // Load content on mount
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllContent(data);
        }
      })
      .catch(() => {
        // API failed - set empty array (no demo content)
        setAllContent([]);
      });
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim() === '' || allContent.length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const filtered = allContent.filter(item => {
      return (
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchLower)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchLower))
      );
    });

    setResults(filtered);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/content/${results[0].slug}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search articles, blogs, papers..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl max-h-96 overflow-y-auto backdrop-blur-sm">
          {results.slice(0, 5).map((item) => (
            <a
              key={item.id}
              href={`/content/${item.slug}`}
              className="block border-b border-slate-100 px-4 py-3 hover:bg-slate-50 transition-colors group"
              onClick={() => setShowResults(false)}
            >
              <div className="font-semibold text-slate-900 group-hover:text-slate-700">{item.title || 'Untitled'}</div>
              {item.excerpt && (
                <div className="mt-1 text-sm text-slate-600 line-clamp-1">{item.excerpt}</div>
              )}
              {item.categoryPath && (
                <div className="mt-1.5 text-xs text-slate-400 font-medium">{item.categoryPath}</div>
              )}
            </a>
          ))}
          {results.length > 5 && (
            <div className="px-4 py-3 text-sm text-slate-500 bg-slate-50 font-medium">
              {results.length - 5} more results...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

