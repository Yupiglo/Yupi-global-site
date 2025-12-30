// Client API pour communiquer avec le backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Types
export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImageId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImageId?: number;
  authorId?: number;
  status: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  description?: string;
  featuredImageId?: number;
  category?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  featuredImageId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  company?: string;
  position?: string;
  source?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Fonction utilitaire pour les requêtes
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || `Erreur ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Pages
export async function getPages(): Promise<Page[]> {
  return fetchAPI<Page[]>('/pages');
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return fetchAPI<Page>(`/pages/${slug}`);
}

// Posts (Articles)
export async function getPosts(params?: { limit?: number; page?: number }): Promise<Post[]> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.page) queryParams.append('page', params.page.toString());

  const query = queryParams.toString();
  return fetchAPI<Post[]>(`/posts${query ? `?${query}` : ''}`);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/posts/${slug}`);
}

// Portfolio
export async function getPortfolio(): Promise<Portfolio[]> {
  return fetchAPI<Portfolio[]>('/portfolio');
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio> {
  return fetchAPI<Portfolio>(`/portfolio/${slug}`);
}

// Services
export async function getServices(): Promise<Service[]> {
  return fetchAPI<Service[]>('/services');
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  return fetchAPI<Service>(`/services/${slug}`);
}

// Membership (Adhésion)
export async function submitMembership(data: MembershipFormData): Promise<{ success: boolean; message: string }> {
  return fetchAPI<{ success: boolean; message: string }>('/membership', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Contact (à implémenter côté backend si nécessaire)
export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Pour l'instant, on peut envoyer vers une route API Next.js ou directement vers un service email
  // TODO: Implémenter la route API côté backend ou utiliser un service comme SendGrid, Resend, etc.
  return fetchAPI<{ success: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Media
export interface Media {
  id: number;
  url: string;
  alt?: string;
}

export async function getMedia(id: number): Promise<Media> {
  return fetchAPI<Media>(`/media/${id}`);
}

