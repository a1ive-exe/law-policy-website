'use client';

import { useState, useEffect } from 'react';
import { ReactionType } from '@/types';
import { ThumbsUp, Heart, Lightbulb } from 'lucide-react';

interface ReactionsProps {
  contentId: string;
}

export default function Reactions({ contentId }: ReactionsProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType | null>(null);

  useEffect(() => {
    // Check if user has already reacted to this content
    const reactionKey = `reaction_${contentId}`;
    const savedReaction = localStorage.getItem(reactionKey);
    if (savedReaction) {
      setHasReacted(true);
      setReactionType(savedReaction as ReactionType);
    }
  }, [contentId]);

  const handleReaction = (type: ReactionType) => {
    if (hasReacted) return; // Prevent multiple reactions

    const reactionKey = `reaction_${contentId}`;
    localStorage.setItem(reactionKey, type);
    setHasReacted(true);
    setReactionType(type);
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

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-700">Reactions:</span>
      <div className="flex items-center gap-2">
        {(['like', 'heart', 'insightful'] as ReactionType[]).map((type) => {
          const config = reactionConfig[type];
          const Icon = config.icon;
          const isActive = hasReacted && reactionType === type;
          const isDisabled = hasReacted && reactionType !== type;

          return (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              disabled={hasReacted}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                  : isDisabled
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm'
              }`}
              title={hasReacted ? (isActive ? `You ${config.label.toLowerCase()}d this` : 'You can only react once') : `React with ${config.label}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
              <span>{config.label}</span>
            </button>
          );
        })}
      </div>
      {hasReacted && (
        <span className="text-xs text-slate-500 italic">Thank you for your reaction!</span>
      )}
    </div>
  );
}
