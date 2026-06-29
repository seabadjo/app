import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Client axios configuré
export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur : ajoute automatiquement le token JWT s'il est dans localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aycm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper pour gérer les erreurs proprement
const handle = (promise, fallback) =>
  promise
    .then((res) => res.data)
    .catch((err) => {
      console.warn('[API] Erreur, fallback utilisé :', err.message);
      return fallback;
    });

// === ENDPOINTS PUBLICS (GET) ===
export const apiGetPillars     = () => handle(api.get('/pillars'),     { items: [] });
export const apiGetImpact      = () => handle(api.get('/impact'),      { items: [] });
export const apiGetNews        = (params) => handle(api.get('/news', { params }), { items: [] });
export const apiGetNewsBySlug  = (slug) => handle(api.get(`/news/${slug}`), { item: null });
export const apiGetOpportunities = (params) => handle(api.get('/opportunities', { params }), { items: [] });
export const apiGetEthics      = () => handle(api.get('/ethics'),      { items: [] });
export const apiGetPresident   = () => handle(api.get('/president'),   { item: null });
export const apiGetCohort      = (params) => handle(api.get('/cohort', { params }), { items: [] });
export const apiGetMedia       = (params) => handle(api.get('/media',  { params }), { items: [] });
export const apiGetPublications = (params) => handle(api.get('/publications', { params }), { items: [] });

// === FORMULAIRES (POST) ===
export const apiPostContact     = (data) => api.post('/contact', data).then((r) => r.data);
export const apiPostDonation    = (data) => api.post('/donations', data).then((r) => r.data);
export const apiPostMembership  = (data) => api.post('/memberships', data).then((r) => r.data);
export const apiPostAmbassador  = (data) => api.post('/ambassadors', data).then((r) => r.data);
export const apiPostNewsletter  = (email) => api.post('/newsletter/subscribe', { email }).then((r) => r.data);

// === AUTH ===
export const apiLogin    = (data) => api.post('/auth/login', data).then((r) => r.data);
export const apiRegister = (data) => api.post('/auth/register', data).then((r) => r.data);
export const apiMe       = () => api.get('/auth/me').then((r) => r.data);
