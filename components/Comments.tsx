'use client';

import { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  comment: string;
  date: string;
}

interface CommentsProps {
  contentId: string;
}

export default function Comments({ contentId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !authorEmail || !comment) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      authorName,
      comment,
      date: new Date().toISOString()
    };

    setComments([...comments, newComment]);
    setAuthorName('');
    setAuthorEmail('');
    setComment('');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-slate-700" />
        <h3 className="text-2xl font-serif font-bold text-slate-900">Comments</h3>
        {comments.length > 0 && (
          <span className="text-sm text-slate-500">({comments.length})</span>
        )}
      </div>
      
      {comments.length > 0 && (
        <div className="mb-8 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{comment.authorName}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(comment.date).toLocaleDateString('en-US', { 
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
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
        >
          <Send className="w-4 h-4" />
          Post Comment
        </button>
      </form>
    </div>
  );
}
