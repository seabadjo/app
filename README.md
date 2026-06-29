# Site Web AYCM — African Youth Change Makers

Projet complet : **backend Node.js/Express + PostgreSQL** et **frontend React + Tailwind + shadcn/ui**.

```
site web/
├── backend/     ← API REST (Node + Sequelize + PostgreSQL)  →  port 5000
├── frontend/    ← Site React (Create React App + craco)     →  port 3000
└── _archive_python_backend/   ← ancien backend (référence seulement)
```

## Démarrage (en deux terminaux)

### Terminal 1 — Backend

```bash
cd backend
npm install
cp .env.example .env          # ajuste DB_USER/DB_PASSWORD si besoin
npm run seed                  # crée tables + données AYCM
npm run dev
```

API disponible sur **http://localhost:5000/api**.

### Terminal 2 — Frontend

```bash
cd frontend
yarn install                  # ou: npm install
yarn start                    # ou: npm start
```

Site disponible sur **http://localhost:3000**.

## Architecture

### Backend (`/backend`)
- Express + Sequelize + JWT + bcrypt + nodemailer
- 15 modèles PostgreSQL, 16 routes REST
- Documentation complète : `backend/README.md`

### Frontend (`/frontend`)
- React 19 + react-router-dom 7 + @tanstack/react-query
- Tailwind CSS + shadcn/ui (composants Radix UI)
- Client API : `frontend/src/lib/api.js`
- Hooks data : `frontend/src/hooks/useAycmData.js` (avec fallback automatique sur `mockData.js` si l'API est down)

## Intégration backend ↔ frontend

| Page React | Hook | Endpoint backend |
|---|---|---|
| Home | `usePresidentMessage`, `usePillars`, `useImpact`, `useNews`, `useOpportunities` | `/president`, `/pillars`, `/impact`, `/news`, `/opportunities` |
| News | `useNews` | `/news` |
| Opportunities | `useOpportunities` | `/opportunities` |
| Media | `useMediaGallery` | `/media` |
| About | `usePresidentMessage`, `useImpact` | `/president`, `/impact` |
| Contact (form) | `apiPostContact` | `POST /contact` |
| Donation (form) | `apiPostDonation` | `POST /donations` |
| Footer (newsletter) | `apiPostNewsletter` | `POST /newsletter/subscribe` |

Les pages **Cohort**, **Actions**, et certaines parties de **About** utilisent encore `mockData.js` (données statiques) — à brancher au fur et à mesure que le contenu sera fourni.

## Variables d'environnement

**Backend** (`backend/.env`) :
```
DB_HOST=localhost
DB_NAME=aycm_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=...
CLIENT_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`) :
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Notes de migration

- Le backend Python (FastAPI) du collaborateur a été archivé dans `_archive_python_backend/` pour référence — il n'est plus utilisé.
- Le frontend conserve `mockData.js` comme **fallback** : si l'API est inaccessible, les données s'affichent quand même.
- Aucune logique frontend n'a été cassée : seuls les imports et les soumissions de formulaires ont été branchés sur l'API.
