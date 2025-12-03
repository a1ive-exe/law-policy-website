'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentItem, Jurisdiction, ContentType } from '@/types';
import { lawAreas, author } from '@/data/content';
import { generateUUID } from '@/lib/uuid';
import { 
  Save, 
  X, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

interface ContentEditorProps {
  initialContent?: ContentItem;
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<ContentItem>>({
    title: '',
    subtitle: '',
    slug: '',
    publishedDate: new Date().toISOString().split('T')[0],
    lawArea: '',
    jurisdiction: undefined,
    contentType: undefined,
    isPolicyRecommendation: false,
    policyTheme: '',
    content: '',
    excerpt: '',
    tags: [],
    featured: false,
  });

  useEffect(() => {
    if (initialContent) {
      setFormData({
        title: initialContent.title,
        subtitle: initialContent.subtitle || '',
        slug: initialContent.slug,
        publishedDate: initialContent.publishedDate,
        lawArea: initialContent.lawArea || '',
        jurisdiction: initialContent.jurisdiction,
        contentType: initialContent.contentType,
        isPolicyRecommendation: initialContent.isPolicyRecommendation || false,
        policyTheme: initialContent.policyTheme || '',
        content: initialContent.content,
        excerpt: initialContent.excerpt,
        tags: initialContent.tags || [],
        featured: initialContent.featured || false,
      });
    }
  }, [initialContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Generate slug from title if not provided and title exists
      const slug = formData.slug || (formData.title 
        ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') 
        : `content-${Date.now()}`);
      
      // Generate ID for new content
      const contentId = initialContent?.id || generateUUID();
      
      // Build content object - only include fields that have values
      const contentToSave: Partial<ContentItem> = {
        id: contentId,
        slug: slug || undefined,
        tags: formData.tags || [],
      };
      
      // Only add fields if they have values
      if (formData.title) contentToSave.title = formData.title;
      if (formData.subtitle) contentToSave.subtitle = formData.subtitle;
      if (formData.content) contentToSave.content = formData.content;
      if (formData.excerpt) contentToSave.excerpt = formData.excerpt;
      if (formData.publishedDate) contentToSave.publishedDate = formData.publishedDate;
      if (formData.lawArea) contentToSave.lawArea = formData.lawArea;
      if (formData.jurisdiction) contentToSave.jurisdiction = formData.jurisdiction as Jurisdiction;
      if (formData.contentType) contentToSave.contentType = formData.contentType as ContentType;
      if (formData.isPolicyRecommendation !== undefined) contentToSave.isPolicyRecommendation = formData.isPolicyRecommendation;
      if (formData.policyTheme) contentToSave.policyTheme = formData.policyTheme;
      if (formData.featured !== undefined) contentToSave.featured = formData.featured;
      
      // Always include author (with defaults)
      contentToSave.author = author;

      const url = initialContent 
        ? `/api/content/${initialContent.id}`
        : '/api/content';
      
      const method = initialContent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentToSave),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        const data = await response.json();
        
        // Show detailed validation errors if available
        if (data.issues) {
          const errorMessages: string[] = [];
          if (data.issues.id?._errors) errorMessages.push(`ID: ${data.issues.id._errors.join(', ')}`);
          if (data.issues.title?._errors) errorMessages.push(`Title: ${data.issues.title._errors.join(', ')}`);
          if (data.issues.slug?._errors) errorMessages.push(`Slug: ${data.issues.slug._errors.join(', ')}`);
          if (data.issues.content?._errors) errorMessages.push(`Content: ${data.issues.content._errors.join(', ')} (minimum 50 characters required)`);
          if (data.issues.excerpt?._errors) errorMessages.push(`Excerpt: ${data.issues.excerpt._errors.join(', ')} (minimum 20 characters required)`);
          if (data.issues.publishedDate?._errors) errorMessages.push(`Published Date: ${data.issues.publishedDate._errors.join(', ')}`);
          if (data.issues.author?._errors) errorMessages.push(`Author: ${data.issues.author._errors.join(', ')}`);
          
          setError(errorMessages.length > 0 
            ? `Validation errors:\n${errorMessages.join('\n')}` 
            : data.error || 'Failed to save content');
        } else {
          setError(data.error || 'Failed to save content');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag],
      });
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              {initialContent ? 'Edit Content' : 'Create New Content'}
            </h1>
            <p className="text-slate-600 mt-1">
              {initialContent ? 'Update content details' : 'Add new article, blog, paper, or policy recommendation'}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 mb-1">Error</p>
                <pre className="text-sm text-red-700 whitespace-pre-wrap font-sans">{error}</pre>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-sm text-emerald-800">
              Content saved successfully! Redirecting...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value || undefined })}
                placeholder="Enter content title"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value || undefined })}
                placeholder="Auto-generated from title if left empty"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            />
          </div>

          {/* Content Type Selection */}
          <div className="border-t border-slate-200 pt-6">
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Content Type
            </label>
            <div className="space-y-4">
              {/* Quick Options */}
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPolicyRecommendation || false}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      isPolicyRecommendation: e.target.checked,
                    })}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">Policy Recommendation</span>
                </label>
                
                {!formData.isPolicyRecommendation && (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        checked={formData.contentType === 'Article'}
                        onChange={() => setFormData({ ...formData, contentType: 'Article' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">Article</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        checked={formData.contentType === 'Blog'}
                        onChange={() => setFormData({ ...formData, contentType: 'Blog' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">Blog</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        checked={formData.contentType === 'Paper'}
                        onChange={() => setFormData({ ...formData, contentType: 'Paper' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">Paper</span>
                    </label>
                  </>
                )}
              </div>
              
              {/* Custom Content Type Input */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Or enter custom content type
                </label>
                <input
                  type="text"
                  value={formData.contentType && !['Article', 'Blog', 'Paper'].includes(formData.contentType) ? formData.contentType : ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (value) {
                      setFormData({ ...formData, contentType: value });
                    } else {
                      setFormData({ ...formData, contentType: undefined });
                    }
                  }}
                  placeholder="e.g., Review, Analysis, Opinion, etc."
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 text-sm"
                  onFocus={() => {
                    // Clear radio selection when typing custom type
                    if (['Article', 'Blog', 'Paper'].includes(formData.contentType || '')) {
                      setFormData({ ...formData, contentType: undefined });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category Selection */}
          {!formData.isPolicyRecommendation && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Law Area
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="lawAreas"
                    value={formData.lawArea || ''}
                    onChange={(e) => setFormData({ ...formData, lawArea: e.target.value })}
                    placeholder="Type or select from dropdown"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
                  />
                  <datalist id="lawAreas">
                    {lawAreas.map(area => (
                      <option key={area.id} value={area.name} />
                    ))}
                  </datalist>
                </div>
                <p className="mt-1 text-xs text-slate-500">You can type a custom law area or select from suggestions</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Jurisdiction
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="jurisdictions"
                    value={formData.jurisdiction || ''}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value as Jurisdiction })}
                    placeholder="Type or select from dropdown"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
                  />
                  <datalist id="jurisdictions">
                    <option value="International" />
                    <option value="Domestic" />
                    <option value="Both" />
                  </datalist>
                </div>
                <p className="mt-1 text-xs text-slate-500">You can type a custom jurisdiction or select from suggestions</p>
              </div>
            </div>
          )}

          {formData.isPolicyRecommendation && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Policy Theme
              </label>
              <input
                type="text"
                value={formData.policyTheme || ''}
                onChange={(e) => setFormData({ ...formData, policyTheme: e.target.value })}
                placeholder="e.g., Labour, Environment, Technology"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              />
            </div>
          )}

          {/* Date and Featured */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Published Date
              </label>
              <input
                type="date"
                value={formData.publishedDate || ''}
                onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value || undefined })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              />
            </div>

            <div className="flex items-center gap-2 pt-8">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300"
              />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700 cursor-pointer">
                Feature this content
              </label>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value || undefined })}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 resize-none"
              placeholder="Brief description of the content (optional)..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value || undefined })}
              rows={20}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 resize-none font-mono text-sm"
              placeholder="Enter your content here. You can use Markdown formatting. (optional)"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const input = e.currentTarget;
                  if (input.value.trim()) {
                    handleTagAdd(input.value.trim());
                    input.value = '';
                  }
                }
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {initialContent ? 'Update Content' : 'Create Content'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

