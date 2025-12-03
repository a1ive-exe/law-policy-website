import { z } from "zod";

// Completely flexible validation - all fields optional
export const ContentSchema = z.object({
  id: z.string().optional(), // Auto-generated if not provided
  title: z.string().optional(),
  subtitle: z.string().optional(),
  slug: z.string().optional(), // Auto-generated if not provided
  author: z.object({
    name: z.string().optional(),
    credentials: z.array(z.string()).default([]),
    linkedin: z.string().optional(),
    email: z.string().optional(),
  }).optional(),
  publishedDate: z.string().optional(), // yyyy-mm-dd format
  lawArea: z.string().optional(),
  jurisdiction: z.string().optional(), // Allow any string, not just enum
  contentType: z.string().optional(), // Allow any string, not just enum
  isPolicyRecommendation: z.boolean().optional(),
  policyTheme: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  categoryPath: z.string().optional(),
}).passthrough(); // Allow additional fields

export type ContentInput = z.infer<typeof ContentSchema>;
