export type Jurisdiction = string; // Allow any string for flexibility
export type ContentType = string; // Allow any string for flexibility
export type ReactionType = 'like' | 'heart' | 'insightful';

export interface LawArea {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Author {
  id?: string; // Optional ID for database records
  name?: string; // Optional name - defaults to 'Devesh Mandhata' in database
  credentials?: string[];
  linkedin?: string;
  email?: string;
  otherLinks?: { label: string; url: string }[];
}

export interface ContentItem {
  id: string;
  title?: string;
  subtitle?: string;
  slug: string;
  author?: Author;
  publishedDate?: string;
  lawArea?: string;
  jurisdiction?: Jurisdiction;
  contentType?: ContentType;
  isPolicyRecommendation?: boolean;
  policyTheme?: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featured?: boolean;
  categoryPath?: string;
}

export interface Comment {
  id: string;
  contentId: string;
  authorName: string;
  authorEmail: string;
  comment: string;
  date: string;
  approved?: boolean;
}

export interface Reaction {
  contentId: string;
  type: ReactionType;
  count: number;
}

