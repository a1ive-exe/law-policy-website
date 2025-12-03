'use client';

import { useState } from 'react';
import { ContentItem } from '@/types';
import ContentCard from './ContentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
  items: ContentItem[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
      <div className="mb-6">
        <ContentCard content={currentItem} showCategoryPath={true} />
      </div>
      
      {items.length > 1 && (
        <>
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-slate-900' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center mt-4 text-sm text-slate-500">
            {currentIndex + 1} of {items.length}
          </div>
        </>
      )}
    </div>
  );
}
