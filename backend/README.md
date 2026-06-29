# AYCM — Backend API

API REST pour le site **African Youth Change Makers**.
Stack : **Node.js + Express + PostgreSQL (Sequelize) + JWT**.

---

## Prérequis

- Node.js ≥ 18
- PostgreSQL ≥ 13 (local ou hébergé : Supabase, Neon, Render, Railway…)

## Démarrage

```bash
cd backend
npm install
cp .env.example .env   # remplir DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# Crée la base avant de seeder :
#   psql -U postgres -c "CREATE DATABASE aycm_db;"
npm run seed           # crée les tables + peuple les 5 piliers, 8 codes éthique, stats, mot du président
npm run dev            # mode développement (nodemon)
npm start              # mode production
```

### Installer PostgreSQL en local (Ubuntu)
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE aycm_db;"
```

### Alternative gratuite (cloud)
- **Supabase** (https://supabase.com) — Postgres gratuit, copie le `DATABASE_URL` dans `.env`
- **Neon** (https://neon.tech) — Postgres serverless gratuit
- **Render** (https://render.com) — Postgres gratuit 90 jours

URL par défaut : `http://localhost:5000`
Healthcheck : `GET /api/health`

---

## Structure

```
backend/
├── src/
│   ├── server.js              # entrée
│   ├── app.js                 # config Express
│   ├── config/db.js           # connexion MongoDB
│   ├── controllers/           # logique métier
│   ├── routes/                # définition des endpoints
│   ├── models/                # schémas Mongoose
│   ├── middlewares/           # auth, errors, 404
│   └── utils/                 # mailer, helpers
└── package.json
```

---

## Endpoints API

Toutes les réponses suivent le format :
```json
{ "success": true, "items": [...] }  // ou "item", "user", "message"
```

### Authentification — `/api/auth`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/register` | Public | Inscription (`firstName, lastName, email, password`) |
| POST | `/login` | Public | Connexion → retourne `token` JWT |
| GET  | `/me` | Bearer | Profil de l'utilisateur connecté |

### Utilisateurs — `/api/users`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| PUT  | `/me` | Bearer | Mettre à jour son profil |
| GET  | `/` | Admin | Liste des utilisateurs |
| GET  | `/:id` | Admin | Détail d'un utilisateur |

### Actualités — `/api/news`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/?category=EVENEMENT&page=1&limit=10&search=...` | Public | Liste filtrée |
| GET  | `/:slug` | Public | Détail par slug |
| POST | `/` | Admin | Créer (`title, content, category, coverImage`) |
| PUT  | `/:id` | Admin | Modifier |
| DELETE | `/:id` | Admin | Supprimer |

Catégories : `EVENEMENT`, `PROJET`, `ANNONCE`, `ACTUALITE`.

### Opportunités — `/api/opportunities`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/?type=Bourse&active=true` | Public | Liste triée par deadline |
| GET  | `/:slug` | Public | Détail |
| POST | `/` | Admin | Créer (`title, description, type, country, deadline, applyUrl`) |
| PUT  | `/:id` | Admin | Modifier |
| DELETE | `/:id` | Admin | Supprimer |

### Piliers — `/api/pillars`
Les **5 piliers fondamentaux** d'AYCM :
1. Lutte pour l'employabilité des jeunes
2. Promotion de la gent féminine
3. Promotion de l'excellence
4. Promotion de la diversité linguistique
5. Lutte contre le changement climatique

Chaque pilier renvoie `name`, `shortName`, `description`, `objectives[]`, `icon`, `color`, `order`.

| Méthode | Endpoint | Auth |
|---------|----------|------|
| GET  | `/` | Public |
| POST | `/` | Admin |
| PUT  | `/:id` | Admin |
| DELETE | `/:id` | Admin |

### Mot du Président — `/api/president`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/` | Public | Mot actif (le plus récent) |
| GET  | `/history` | Admin | Toutes les versions |
| POST | `/` | Admin | Nouvelle version (désactive les précédentes) |
| PUT  | `/:id` | Admin | Modifier |

### Cohorte AYCM — `/api/cohort`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/?year=2024&featured=true` | Public | Liste filtrée |
| GET  | `/:id` | Public | Détail |
| POST | `/` | Admin | Ajouter un membre |
| PUT  | `/:id` | Admin | Modifier |
| DELETE | `/:id` | Admin | Supprimer |

### Médias — `/api/media`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/?type=photo&category=Forum&page=1` | Public | Galerie filtrée (photo/video/album) |
| GET  | `/:id` | Public | Détail |
| POST | `/` | Admin | Ajouter |
| PUT  | `/:id` | Admin | Modifier |
| DELETE | `/:id` | Admin | Supprimer |

### Publications — `/api/publications`
Blog, Rapports, Publications, FAQ, Documents (correspond aux liens du footer).
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET  | `/?type=rapport&page=1` | Public | Liste filtrée |
| GET  | `/:slug` | Public | Détail par slug |
| POST | `/:id/download` | Public | Tracker un téléchargement |
| POST | `/` | Admin | Créer |
| PUT  | `/:id` | Admin | Modifier |
| DELETE | `/:id` | Admin | Supprimer |

Types : `blog`, `rapport`, `publication`, `faq`, `document`.

### Codes d'éthique — `/api/ethics`
Les **8 codes d'éthique** d'AYCM/JAAC : Professionnalisme, Détermination, Engagement, Écoute, Fidélité, Égalité, Respect, Proactivité.

| Méthode | Endpoint | Auth |
|---------|----------|------|
| GET  | `/` | Public |
| GET  | `/:id` | Public |
| POST | `/` | Admin |
| PUT  | `/:id` | Admin |
| DELETE | `/:id` | Admin |

### Impact — `/api/impact`
Statistiques affichées sur la home (2500+, 150+, etc.).
| Méthode | Endpoint | Auth |
|---------|----------|------|
| GET  | `/` | Public |
| POST | `/` | Admin (upsert par `label`) |
| DELETE | `/:id` | Admin |

### Contact — `/api/contact`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/` | Public | Envoyer un message (`name, email, subject, message`) |
| GET  | `/` | Admin | Liste des messages |
| PATCH | `/:id/read` | Admin | Marquer lu |

### Newsletter — `/api/newsletter`
| Méthode | Endpoint | Auth |
|---------|----------|------|
| POST | `/subscribe` | Public (`{ email }`) |
| POST | `/unsubscribe` | Public |
| GET  | `/` | Admin |

### Dons — `/api/donations`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/` | Public | Créer un don (`amount, currency, donorName, email, isAnonymous`) |
| POST | `/:id/confirm` | Public/Webhook | Confirmer après paiement |
| GET  | `/` | Admin | Liste + total |

### Adhésions — `/api/memberships`
| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/` | Public | Adhésion en ligne |
| GET  | `/?status=pending` | Admin | Liste |
| PATCH | `/:id` | Admin | Changer le statut (`pending|approved|rejected`) |

### Ambassadeurs — `/api/ambassadors`
| Méthode | Endpoint | Auth |
|---------|----------|------|
| POST | `/` | Public (candidature) |
| GET  | `/` | Admin |
| PATCH | `/:id` | Admin |

---

## Authentification (JWT)

Pour les routes protégées, envoyer :
```
Authorization: Bearer <token>
```

Le token est retourné par `/api/auth/login` et `/api/auth/register`.

---

## Exemple — Inscription

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ismaël","lastName":"KRA","email":"ismael@aycm.org","password":"secret123"}'
```

## Exemple — Lister les actualités

```bash
curl http://localhost:5000/api/news?category=EVENEMENT&limit=3
```

---

## Notes pour le frontend

- `CORS` est ouvert sur `CLIENT_URL` (défini dans `.env`).
- Toutes les images sont attendues sous forme d'**URL** (uploadées vers un CDN/S3, à brancher plus tard).
- Format de date : ISO 8601 (`2026-06-29T00:00:00.000Z`).
- Pagination : `?page=1&limit=10` quand applicable.

---

## Identité visuelle AYCM

- **Devise** : « We are a forward oriented organization » / « Nous sommes une association orientée vers le futur »
- **Couleurs** : vert (#1B5E20 environ) et jaune/or (#FFC107 environ)
- **Logo** : à déposer dans `backend/assets/aycm-logo.png` (fournir le fichier au frontend)
- **Documents sources** : `backend/assets/` (5 piliers + code éthique original)

## TODO ultérieurs

- Upload d'images (multer + S3/Cloudinary).
- Intégration Stripe complète (webhook).
- Tests Jest + Supertest sur les routes principales.
- Documentation OpenAPI/Swagger automatique.
