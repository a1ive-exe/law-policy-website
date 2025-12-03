import { ContentItem, LawArea, Author } from '@/types';

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

export const sampleContent: ContentItem[] = [
  {
    id: '1',
    title: 'The Future of Trademark Exhaustion',
    subtitle: 'Re-examining the Doctrine in Digital Markets',
    slug: 'future-of-trademark-exhaustion',
    author,
    publishedDate: '2025-01-15',
    lawArea: 'IP Law',
    jurisdiction: 'Domestic',
    contentType: 'Article',
    content: `# The Future of Trademark Exhaustion

The doctrine of trademark exhaustion has long been a cornerstone of intellectual property law, balancing the rights of trademark owners with the free movement of goods. However, the digital transformation of commerce has raised fundamental questions about the applicability and scope of this doctrine.

## Historical Context

Traditional trademark exhaustion principles were developed in an era of physical goods and tangible markets. The first sale doctrine, which allows consumers to resell goods without trademark owner consent, made sense when products were physical entities that could be transferred from hand to hand.

## Digital Challenges

In digital markets, the concept of "sale" becomes blurred. When a consumer purchases a digital good, they are often acquiring a license rather than ownership. This raises questions about whether the exhaustion doctrine applies at all.

## Policy Recommendations

We propose a nuanced approach that:
1. Recognizes the unique nature of digital goods
2. Maintains consumer rights while protecting brand integrity
3. Adapts traditional principles to modern commerce

## Conclusion

The future of trademark exhaustion requires a careful rebalancing of competing interests in the digital age.`,
    excerpt: 'An in-depth examination of how trademark exhaustion principles apply in digital markets, with recommendations for policy reform.',
    tags: ['Trademark', 'Exhaustion', 'IP Law', 'Digital Markets'],
    featured: true,
    categoryPath: 'IP Law → Domestic → Article'
  },
  {
    id: '2',
    title: 'Data Localization and Cross-Border Data Flows',
    slug: 'data-localization-cross-border-flows',
    author,
    publishedDate: '2025-01-10',
    lawArea: 'TMT',
    jurisdiction: 'International',
    contentType: 'Paper',
    content: `# Data Localization and Cross-Border Data Flows

This paper examines the legal and policy implications of data localization requirements and their impact on international trade and digital innovation.

## Introduction

Data localization mandates have become increasingly common as nations seek to protect citizen data and maintain regulatory oversight. However, these requirements can create significant barriers to international trade and digital commerce.

## Key Findings

Our research reveals three critical areas of concern:
1. Economic impact on digital services
2. Privacy and security trade-offs
3. Regulatory fragmentation

## Recommendations

We propose a framework for balancing data sovereignty with economic efficiency.`,
    excerpt: 'A comprehensive analysis of data localization policies and their implications for international digital commerce.',
    tags: ['Data Protection', 'TMT', 'International Law', 'Privacy'],
    featured: true,
    categoryPath: 'TMT → International → Paper'
  },
  {
    id: '3',
    title: 'Reforming Labour Dispute Resolution Mechanisms',
    slug: 'reforming-labour-dispute-resolution',
    author,
    publishedDate: '2025-01-05',
    lawArea: 'Labour Law',
    jurisdiction: 'Domestic',
    isPolicyRecommendation: true,
    policyTheme: 'Labour',
    content: `# Reforming Labour Dispute Resolution Mechanisms

## Executive Summary

India's labour dispute resolution system requires comprehensive reform to address delays, improve access to justice, and align with international best practices.

## Current Challenges

1. Prolonged litigation timelines
2. Limited access for informal workers
3. Inadequate mediation infrastructure
4. Fragmented regulatory framework

## Proposed Reforms

### 1. Digital Dispute Resolution Platform
Establish a centralized digital platform for filing and tracking disputes, reducing paperwork and improving transparency.

### 2. Mandatory Pre-litigation Mediation
Require parties to attempt mediation before proceeding to formal adjudication, reducing court backlog.

### 3. Specialized Fast-Track Courts
Create specialized labour courts with dedicated timelines for resolution.

### 4. Enhanced Worker Protections
Expand protections for gig economy and contract workers.

## Implementation Timeline

Phase 1 (Months 1-6): Digital platform development
Phase 2 (Months 7-12): Pilot mediation programs
Phase 3 (Months 13-18): Court restructuring
Phase 4 (Months 19-24): Full rollout

## Conclusion

These reforms will create a more efficient, accessible, and equitable labour dispute resolution system.`,
    excerpt: 'A comprehensive policy proposal for reforming India\'s labour dispute resolution mechanisms to improve efficiency and access to justice.',
    tags: ['Labour Law', 'Policy Reform', 'Dispute Resolution', 'India'],
    featured: true,
    categoryPath: 'Policy Recommendations → Domestic'
  },
  {
    id: '4',
    title: 'M&A Trends in the Technology Sector',
    slug: 'm-a-trends-technology-sector',
    author,
    publishedDate: '2024-12-28',
    lawArea: 'M&A',
    jurisdiction: 'Both',
    contentType: 'Blog',
    content: `# M&A Trends in the Technology Sector

The technology sector has seen unprecedented M&A activity in recent years, driven by digital transformation, competitive consolidation, and strategic positioning.

## Key Trends

1. **Mega-Deals**: Billion-dollar acquisitions continue to shape the landscape
2. **Cross-Border Activity**: International deals are increasingly common
3. **Regulatory Scrutiny**: Antitrust concerns are reshaping deal structures
4. **Strategic Acquisitions**: Companies prioritize technology and talent acquisition

## Regulatory Landscape

Both domestic and international regulators are taking a closer look at technology M&A, particularly in areas affecting competition and data protection.

## Looking Ahead

The coming year promises continued activity, with a focus on AI, cybersecurity, and platform consolidation.`,
    excerpt: 'An analysis of recent M&A trends in the technology sector and their legal implications.',
    tags: ['M&A', 'Technology', 'Corporate Law', 'Antitrust'],
    featured: false,
    categoryPath: 'M&A → Both → Blog'
  },
  {
    id: '5',
    title: 'Climate Change Litigation: Emerging Trends',
    slug: 'climate-change-litigation-trends',
    author,
    publishedDate: '2024-12-20',
    lawArea: 'Environmental Law',
    jurisdiction: 'International',
    contentType: 'Article',
    content: `# Climate Change Litigation: Emerging Trends

Climate change litigation has emerged as a powerful tool for environmental protection and corporate accountability.

## Global Trends

Courts worldwide are increasingly recognizing climate-related claims, from individual rights to corporate liability.

## Key Cases

Several landmark cases have shaped the landscape, including youth-led constitutional claims and shareholder derivative suits.

## Future Directions

The field is evolving rapidly, with new legal theories and regulatory frameworks emerging.`,
    excerpt: 'An exploration of emerging trends in climate change litigation and their implications for environmental law.',
    tags: ['Environmental Law', 'Climate Change', 'Litigation', 'International Law'],
    featured: false,
    categoryPath: 'Environmental Law → International → Article'
  }
];

