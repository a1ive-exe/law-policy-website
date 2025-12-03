import { ContentItem, Jurisdiction, ContentType } from '@/types';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function getContentByCategory(
  content: ContentItem[],
  lawArea?: string,
  jurisdiction?: Jurisdiction,
  contentType?: ContentType
): ContentItem[] {
  return content.filter(item => {
    if (item.isPolicyRecommendation) {
      return lawArea === undefined && jurisdiction === undefined && contentType === undefined;
    }
    
    const matchesLawArea = !lawArea || item.lawArea === lawArea;
    const matchesJurisdiction = !jurisdiction || item.jurisdiction === jurisdiction || item.jurisdiction === 'Both';
    const matchesContentType = !contentType || item.contentType === contentType;
    
    return matchesLawArea && matchesJurisdiction && matchesContentType;
  });
}

export function getFeaturedContent(content: ContentItem[]): ContentItem[] {
  return content.filter(item => item.featured).slice(0, 4);
}

export function getLatestContent(content: ContentItem[], limit: number = 10): ContentItem[] {
  return [...content]
    .sort((a, b) => {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}

export function getAllContentByType(content: ContentItem[], contentType: ContentType): ContentItem[] {
  return content.filter(item => item.contentType === contentType);
}

export function getPolicyRecommendations(content: ContentItem[]): ContentItem[] {
  return content.filter(item => item.isPolicyRecommendation);
}

export function generateCategoryPath(
  lawArea?: string,
  jurisdiction?: Jurisdiction,
  contentType?: ContentType
): string {
  const parts: string[] = [];
  if (lawArea) parts.push(lawArea);
  if (jurisdiction) parts.push(jurisdiction);
  if (contentType) parts.push(contentType);
  return parts.join(' → ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}


