'use client';

import { useState, useEffect } from 'react';
import { Author } from '@/types';
import { Save, User, Mail, Linkedin, Plus, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function AuthorEditor() {
  const [author, setAuthor] = useState<Author>({
    name: '',
    credentials: [],
    linkedin: '',
    email: '',
    otherLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newCredential, setNewCredential] = useState('');
  const [newLink, setNewLink] = useState({ label: '', url: '' });

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await fetch('/api/author');
      if (response.ok) {
        const data = await response.json();
        setAuthor(data);
      }
    } catch (error) {
      console.error('Error fetching author:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const response = await fetch('/api/author', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update author information');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addCredential = () => {
    if (newCredential.trim()) {
      setAuthor({
        ...author,
        credentials: [...(author.credentials || []), newCredential.trim()],
      });
      setNewCredential('');
    }
  };

  const removeCredential = (index: number) => {
    setAuthor({
      ...author,
      credentials: author.credentials?.filter((_, i) => i !== index) || [],
    });
  };

  const addLink = () => {
    if (newLink.label.trim() && newLink.url.trim()) {
      setAuthor({
        ...author,
        otherLinks: [...(author.otherLinks || []), { label: newLink.label.trim(), url: newLink.url.trim() }],
      });
      setNewLink({ label: '', url: '' });
    }
  };

  const removeLink = (index: number) => {
    setAuthor({
      ...author,
      otherLinks: author.otherLinks?.filter((_, i) => i !== index) || [],
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="text-center text-slate-600">Loading author information...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Author Profile</h2>
            <p className="text-sm text-slate-600">Update your profile information</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-800">Author information updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={author.name}
            onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </label>
          <input
            type="email"
            value={author.email || ''}
            onChange={(e) => setAuthor({ ...author, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            placeholder="contact@example.com"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Linkedin className="w-4 h-4 inline mr-1" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={author.linkedin || ''}
            onChange={(e) => setAuthor({ ...author, linkedin: e.target.value })}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* Credentials */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Credentials & Qualifications
          </label>
          <div className="space-y-2 mb-3">
            {author.credentials?.map((cred, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                  {cred}
                </span>
                <button
                  type="button"
                  onClick={() => removeCredential(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCredential}
              onChange={(e) => setNewCredential(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCredential();
                }
              }}
              placeholder="e.g., LL.M. (Harvard), Ph.D."
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            />
            <button
              type="button"
              onClick={addCredential}
              className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Other Links */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional Links
          </label>
          <div className="space-y-2 mb-3">
            {author.otherLinks?.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                  <div className="text-sm font-medium text-slate-700">{link.label}</div>
                  <div className="text-xs text-slate-500">{link.url}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <input
              type="text"
              value={newLink.label}
              onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
              placeholder="Link label"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
            />
            <div className="flex gap-2">
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="https://example.com"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50"
              />
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


