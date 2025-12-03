'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Trash2 } from 'lucide-react';
import { isAuthenticated as checkAuth } from '@/lib/admin-auth-client';

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  comment: string;
  created_at: string;
}

interface CommentsProps {
  contentId: string;
}

export default function Comments({ contentId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    checkAdminStatus();
    fetchComments();
  }, [contentId]);

  const checkAdminStatus = async () => {
    try {
      const authenticated = await checkAuth();
      setIsAdmin(authenticated);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?contentId=${contentId}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !authorEmail || !comment) return;

    try {
      setSubmitting(true);
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          comment: comment.trim(),
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setAuthorName('');
        setAuthorEmail('');
        setComment('');
      } else {
        const error = await response.json();
        const errorMsg = error.hint 
          ? `${error.error}\n\n${error.hint}` 
          : error.details 
          ? `${error.error}\n\nDetails: ${error.details}` 
          : error.error || 'Failed to post comment';
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter(c => c.id !== commentId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-slate-700" />
        <h3 className="text-2xl font-serif font-bold text-slate-900">Comments</h3>
        <span className="text-sm text-slate-500">({comments.length})</span>
      </div>
      
      {loading ? (
        <div className="text-center py-8 text-slate-500">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="mb-8 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200 relative">
              {isAdmin && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  title="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{comment.author_name}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(comment.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 text-center py-8 text-slate-500">
          No comments yet. Be the first to comment!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h4 className="font-semibold text-slate-900 mb-4">Add a Comment</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="authorEmail"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all"
              required
              disabled={submitting}
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300/50 transition-all resize-none"
            required
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}
