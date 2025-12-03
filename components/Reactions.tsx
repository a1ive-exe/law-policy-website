'use client';

import { useState, useEffect } from 'react';
import { ReactionType } from '@/types';
import { ThumbsUp, Heart, Lightbulb } from 'lucide-react';

interface ReactionsProps {
  contentId: string;
}

interface ReactionCounts {
  like: number;
  heart: number;
  insightful: number;
}

export default function Reactions({ contentId }: ReactionsProps) {
  const [counts, setCounts] = useState<ReactionCounts>({
    like: 0,
    heart: 0,
    insightful: 0,
  });
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already reacted (localStorage check)
    const reactionKey = `reaction_${contentId}`;
    const savedReaction = localStorage.getItem(reactionKey);
    if (savedReaction) {
      setHasReacted(true);
      setReactionType(savedReaction as ReactionType);
    }

    fetchReactions();
  }, [contentId]);

  const fetchReactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reactions?contentId=${contentId}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setCounts(data || { like: 0, heart: 0, insightful: 0 });
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (type: ReactionType) => {
    if (hasReacted || submitting) return; // Prevent multiple reactions

    try {
      setSubmitting(true);
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          reactionType: type,
        }),
      });

      if (response.ok) {
        const reactionKey = `reaction_${contentId}`;
        localStorage.setItem(reactionKey, type);
        setHasReacted(true);
        setReactionType(type);
        // Refresh counts
        await fetchReactions();
      } else if (response.status === 409) {
        // Already reacted
        const reactionKey = `reaction_${contentId}`;
        const savedReaction = localStorage.getItem(reactionKey);
        if (savedReaction) {
          setHasReacted(true);
          setReactionType(savedReaction as ReactionType);
        }
        alert('You have already reacted to this content');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add reaction');
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
      alert('Failed to add reaction. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const reactionConfig = {
    like: {
      icon: ThumbsUp,
      label: 'Like',
      emoji: '👍',
    },
    heart: {
      icon: Heart,
      label: 'Love',
      emoji: '❤️',
    },
    insightful: {
      icon: Lightbulb,
      label: 'Insightful',
      emoji: '💡',
    },
  };

  const totalReactions = counts.like + counts.heart + counts.insightful;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700">Reactions:</span>
        <div className="flex items-center gap-2">
          {(['like', 'heart', 'insightful'] as ReactionType[]).map((type) => {
            const config = reactionConfig[type];
            const Icon = config.icon;
            const isActive = hasReacted && reactionType === type;
            const isDisabled = hasReacted && reactionType !== type;
            const count = counts[type];

            return (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                disabled={hasReacted || submitting}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                    : isDisabled
                    ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm'
                } ${submitting ? 'opacity-50 cursor-wait' : ''}`}
                title={
                  hasReacted
                    ? isActive
                      ? `You ${config.label.toLowerCase()}d this`
                      : 'You can only react once'
                    : `React with ${config.label}`
                }
              >
                <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                <span>{config.label}</span>
                {count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-xs font-semibold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {totalReactions > 0 && (
        <div className="text-sm text-slate-600">
          <strong>{totalReactions}</strong> {totalReactions === 1 ? 'reaction' : 'reactions'} total
        </div>
      )}
      {hasReacted && (
        <span className="text-xs text-slate-500 italic">Thank you for your reaction!</span>
      )}
    </div>
  );
}
