// Types partagés entre frontend, backend et admin

export type PageStatus = 'draft' | 'published' | 'archived';
export type MemberStatus = 'pending' | 'approved' | 'rejected';
export type AdminRole = 'admin' | 'editor';

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImageId?: number;
  status: PageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImageId?: number;
  authorId?: number;
  status: PageStatus;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  company?: string;
  position?: string;
  source?: string;
  status: MemberStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: number;
  filename: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
  url: string;
  altText?: string;
  createdAt: Date;
}

