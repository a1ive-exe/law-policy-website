'use client';

import { useState, useEffect } from 'react';
import { ContentItem } from '@/types';
import { Linkedin, Twitter, MessageCircle, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  content: ContentItem;
}

export default function ShareButtons({ content }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [authorName, setAuthorName] = useState(content.author?.name || 'Devesh Mandhata');

  useEffect(() => {
    // Fetch latest author name
    fetch('/api/author')
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          setAuthorName(data.name);
        }
      })
      .catch(() => {
        // Keep original if fetch fails
      });
  }, []);

  const shareText = `${content.title} by ${authorName}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const shareLinks = {
    linkedin: shareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : '#',
    twitter: shareUrl ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` : '#',
    whatsapp: shareUrl ? `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` : '#'
  };

  const handleShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: content.title || 'Untitled',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold text-slate-700">Share:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all"
          onClick={(e) => {
            if (!shareUrl) e.preventDefault();
          }}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 transition-all"
          onClick={(e) => {
            if (!shareUrl) e.preventDefault();
          }}
        >
          <Twitter className="w-4 h-4" />
          Twitter/X
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
          onClick={(e) => {
            if (!shareUrl) e.preventDefault();
          }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <Share2 className="w-4 h-4" />
            More
          </button>
        )}
      </div>
    </div>
  );
}
