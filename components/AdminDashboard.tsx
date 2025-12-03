'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentItem } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  FileText, 
  BookOpen, 
  FileCheck,
  Search,
  Calendar,
  User
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import AuthorEditor from './AuthorEditor';

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAuthorEditor, setShowAuthorEditor] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContent(content.filter(item => item.id !== id));
      } else {
        alert('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('An error occurred while deleting');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = 
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.lawArea && item.lawArea.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'policy' && item.isPolicyRecommendation) ||
      (filterType === item.contentType?.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Manage your content</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Actions */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/content/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Content
            </Link>
            <button
              onClick={() => setShowAuthorEditor(!showAuthorEditor)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <User className="w-5 h-5" />
              {showAuthorEditor ? 'Hide' : 'Edit'} Profile
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="blog">Blogs</option>
              <option value="paper">Papers</option>
              <option value="policy">Policy Recommendations</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">{content.length}</div>
            <div className="text-sm text-slate-600 font-medium">Total Content</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {content.filter(c => c.contentType === 'Article').length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Articles</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {content.filter(c => c.contentType === 'Blog').length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Blogs</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {content.filter(c => c.isPolicyRecommendation).length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Policy Recommendations</div>
          </div>
        </div>

        {/* Author Editor */}
        {showAuthorEditor && (
          <div className="mb-8">
            <AuthorEditor />
          </div>
        )}

        {/* Content List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredContent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No content found
                    </td>
                  </tr>
                ) : (
                  filteredContent.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.title || 'Untitled'}</div>
                        {item.excerpt && (
                          <div className="text-sm text-slate-600 mt-1 line-clamp-1">{item.excerpt}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {item.isPolicyRecommendation ? (
                            <>
                              <FileCheck className="w-4 h-4 text-amber-600" />
                              <span className="text-sm text-slate-700">Policy</span>
                            </>
                          ) : item.contentType === 'Article' ? (
                            <>
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-slate-700">Article</span>
                            </>
                          ) : item.contentType === 'Blog' ? (
                            <>
                              <BookOpen className="w-4 h-4 text-orange-600" />
                              <span className="text-sm text-slate-700">Blog</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm text-slate-700">Paper</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">
                          {item.categoryPath || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.publishedDate ? (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.publishedDate)}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">No date</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/content/${item.id}/edit`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-all text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

