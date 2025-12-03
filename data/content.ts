import { LawArea, Author } from '@/types';

export const author: Author = {
  id: 'main',
  name: 'Devesh Mandhata',
  credentials: ['LL.M. (Harvard)', 'Research Fellow'],
  linkedin: 'https://linkedin.com/in/deveshmandhata',
  email: 'contact@deveshmandhata.com',
  otherLinks: []
};

export const lawAreas: LawArea[] = [
  { id: '1', name: 'IP Law', slug: 'ip-law', description: 'Intellectual Property Law' },
  { id: '2', name: 'TMT', slug: 'tmt', description: 'Technology, Media & Telecommunications' },
  { id: '3', name: 'M&A', slug: 'm-a', description: 'Mergers & Acquisitions' },
  { id: '4', name: 'Labour Law', slug: 'labour-law', description: 'Employment and Labour Relations' },
  { id: '5', name: 'Environmental Law', slug: 'environmental-law', description: 'Environmental Regulations and Policy' },
];


