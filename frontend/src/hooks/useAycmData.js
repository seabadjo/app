/**
 * Hooks React Query qui appellent l'API backend AYCM
 * et MAPPENT les réponses vers les shapes attendus par les composants frontend
 * (les mêmes shapes que ceux exposés par src/mockData.js).
 *
 * En cas d'erreur API, les hooks renvoient les mockData en fallback,
 * pour que le site reste fonctionnel même si le backend est down.
 */
import { useQuery } from '@tanstack/react-query';
import {
  apiGetPillars,
  apiGetImpact,
  apiGetNews,
  apiGetOpportunities,
  apiGetPresident,
  apiGetCohort,
  apiGetMedia,
  apiGetEthics,
  apiGetPublications,
} from '../lib/api';
import {
  pillars as mockPillars,
  impact as mockImpact,
  news as mockNews,
  opportunities as mockOpportunities,
  presidentMessage as mockPresident,
  cohort as mockCohort,
  mediaGallery as mockMedia,
} from '../mockData';

// Helpers de mapping backend → shapes mockData
const PILLAR_ICONS = {
  briefcase: 'Briefcase', female: 'Heart', trophy: 'Trophy',
  language: 'Languages', leaf: 'Leaf',
};

const mapPillar = (p) => ({
  id: p.id,
  title: p.shortName || p.name,
  description: p.description,
  objectives: p.objectives || [],
  icon: PILLAR_ICONS[p.icon] || 'Users',
  color: p.color === 'yellow' ? '#FDB913' : '#006838',
});

const mapImpact = (i) => ({
  id: i.id,
  value: `${i.value}${i.suffix || ''}`,
  label: i.label,
  icon: i.icon || 'Users',
});

const CATEGORY_LABELS = {
  EVENEMENT: 'Événement', PROJET: 'Projet',
  ANNONCE: 'Annonce', ACTUALITE: 'Actualité',
};
const mapNews = (n) => ({
  id: n.id,
  slug: n.slug,
  title: n.title,
  category: CATEGORY_LABELS[n.category] || n.category,
  date: new Date(n.publishedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
  image: n.coverImage,
  excerpt: n.excerpt,
  content: n.content,
});

const mapOpportunity = (o) => ({
  id: o.id,
  slug: o.slug,
  title: o.title,
  type: o.type,
  deadline: new Date(o.deadline).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
  image: o.coverImage,
  description: o.description,
  eligibility: '',
  benefits: '',
  applyUrl: o.applyUrl,
  country: o.country,
});

const mapPresident = (p) => p ? ({
  name: p.presidentName,
  title: p.title,
  image: p.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  message: p.excerpt || '',
  fullMessage: p.fullMessage,
  shortQuote: p.shortQuote,
}) : null;

const mapCohortMember = (m) => ({
  id: m.id,
  name: `${m.firstName} ${m.lastName}`,
  role: m.role,
  country: m.country,
  image: m.photo,
  bio: m.bio,
  socialLinks: m.socialLinks,
});

const mapMedia = (m) => ({
  id: m.id,
  type: m.type === 'video' ? 'video' : 'image',
  title: m.title,
  url: m.url,
  thumbnail: m.thumbnail,
  date: m.takenAt ? new Date(m.takenAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
});

// === HOOKS ===

export const usePillars = () => useQuery({
  queryKey: ['pillars'],
  queryFn: async () => {
    const data = await apiGetPillars();
    const items = (data.items || []).map(mapPillar);
    return items.length ? items : mockPillars;
  },
  initialData: mockPillars,
});

export const useImpact = () => useQuery({
  queryKey: ['impact'],
  queryFn: async () => {
    const data = await apiGetImpact();
    const items = (data.items || []).map(mapImpact);
    return items.length ? items : mockImpact;
  },
  initialData: mockImpact,
});

export const useNews = (params) => useQuery({
  queryKey: ['news', params],
  queryFn: async () => {
    const data = await apiGetNews(params);
    const items = (data.items || []).map(mapNews);
    return items.length ? items : mockNews;
  },
  initialData: mockNews,
});

export const useOpportunities = (params) => useQuery({
  queryKey: ['opportunities', params],
  queryFn: async () => {
    const data = await apiGetOpportunities(params);
    const items = (data.items || []).map(mapOpportunity);
    return items.length ? items : mockOpportunities;
  },
  initialData: mockOpportunities,
});

export const usePresidentMessage = () => useQuery({
  queryKey: ['president'],
  queryFn: async () => {
    const data = await apiGetPresident();
    return mapPresident(data.item) || mockPresident;
  },
  initialData: mockPresident,
});

export const useCohort = (params) => useQuery({
  queryKey: ['cohort', params],
  queryFn: async () => {
    const data = await apiGetCohort(params);
    return (data.items || []).map(mapCohortMember);
  },
  initialData: [],
});

export const useMediaGallery = (params) => useQuery({
  queryKey: ['media', params],
  queryFn: async () => {
    const data = await apiGetMedia(params);
    const items = (data.items || []).map(mapMedia);
    return items.length ? items : mockMedia;
  },
  initialData: mockMedia,
});

export const useEthicsCodes = () => useQuery({
  queryKey: ['ethics'],
  queryFn: async () => {
    const data = await apiGetEthics();
    return data.items || [];
  },
  initialData: [],
});

export const usePublications = (params) => useQuery({
  queryKey: ['publications', params],
  queryFn: async () => {
    const data = await apiGetPublications(params);
    return data.items || [];
  },
  initialData: [],
});
