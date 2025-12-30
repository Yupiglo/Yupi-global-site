# 🏗️ ARCHITECTURE CUSTOM - YUPI GLOBAL

**Date :** 3 décembre 2025  
**Backend et Panel Admin développés sur mesure**

---

## ✅ BESOINS CONFIRMÉS

1. ✅ **Site statique** (pas d'e-commerce, pas d'auth intégrée)
2. ✅ **Backend API custom** (développé par vous)
3. ✅ **Panel admin custom** (développé par vous)
4. ✅ **Collecte d'adhésions** membres
5. ✅ **Redirections** vers systèmes externes

---

## 🏗️ ARCHITECTURE PROPOSÉE

```
┌─────────────────────────────────────────┐
│      Frontend Statique (Next.js)       │
│      - Pages statiques (SSG)           │
│      - Redirections externes            │
│      - Formulaires d'adhésion          │
└─────────────────────────────────────────┘
              ↓ (API calls)
┌─────────────────────────────────────────┐
│      Backend API Custom                 │
│      - Node.js/Express ou autre         │
│      - API REST                         │
│      - Gestion de contenu              │
│      - Gestion membres                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Base de données                    │
│      - MySQL                            │
│      - Contenu (pages, articles)        │
│      - Médias                           │
│      - Membres                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Panel Admin Custom                 │
│      - React/Next.js                    │
│      - Gestion de contenu              │
│      - Gestion membres                  │
│      - Authentification admin           │
└─────────────────────────────────────────┘
              ↓ (API calls)
         Backend API Custom
```

---

## 🛠️ STACK TECHNIQUE CHOISIE

### ✅ Stack JavaScript complète (Option 1 - CHOISIE)

**Frontend (Site public) :**
- Next.js 14 (Static Site Generation)
- TypeScript
- Tailwind CSS
- React Hook Form (formulaires)

**Backend API :**
- Node.js + Express
- TypeScript
- **Prisma ORM** ✅
- **MySQL** ✅
- JWT pour auth admin

**Panel Admin :**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (composants)
- React Query (data fetching)
- Zustand (state management)

**Avantages :**
- ✅ Stack unifiée (JavaScript partout)
- ✅ Partage de code entre frontend/admin
- ✅ Écosystème riche
- ✅ Performance optimale
- ✅ Prisma ORM pour MySQL
- ✅ Compatible avec Vercel (API Routes)

---


## 📁 STRUCTURE DU PROJET

```
yupi-global/
├── frontend/                    # Site public (Next.js SSG)
│   ├── app/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   └── contact/
│   ├── components/
│   ├── lib/
│   │   └── api.ts              # Client API backend
│   ├── tailwind.config.js      # Configuration Tailwind CSS
│   ├── postcss.config.js       # Configuration PostCSS
│   ├── globals.css              # Styles globaux + directives Tailwind
│   └── package.json
│
├── backend/                     # API Custom
│   ├── src/
│   │   ├── routes/
│   │   │   ├── content.ts      # Pages, articles
│   │   │   ├── media.ts        # Médias
│   │   │   ├── members.ts      # Adhésions
│   │   │   └── auth.ts          # Auth admin
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma       # Schéma BDD
│   └── package.json
│
├── admin/                       # Panel Admin
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── content/        # Gestion contenu
│   │   │   ├── members/        # Gestion membres
│   │   │   └── media/          # Gestion médias
│   ├── components/
│   ├── lib/
│   │   └── api.ts              # Client API backend
│   ├── tailwind.config.js      # Configuration Tailwind CSS
│   ├── postcss.config.js       # Configuration PostCSS
│   ├── globals.css              # Styles globaux + directives Tailwind
│   └── package.json
│
└── shared/                      # Code partagé (optionnel)
    ├── types/                  # Types TypeScript
    └── utils/                  # Utilitaires
```

---

## 🔌 API ENDPOINTS À DÉVELOPPER

### Contenu (Public)

```
GET    /api/v1/pages              # Liste des pages
GET    /api/v1/pages/:slug         # Page par slug
GET    /api/v1/posts               # Articles blog
GET    /api/v1/posts/:slug         # Article par slug
GET    /api/v1/portfolio            # Projets portfolio
GET    /api/v1/services            # Services
GET    /api/v1/media/:id           # Média par ID
```

### Membres (Public - POST uniquement)

```
POST   /api/v1/membership          # Adhésion nouveau membre
```

### Admin (Authentifié)

```
# Authentification
POST   /api/v1/admin/auth/login    # Connexion admin
POST   /api/v1/admin/auth/logout   # Déconnexion
GET    /api/v1/admin/auth/me       # Info admin connecté

# Gestion contenu
GET    /api/v1/admin/pages         # Liste pages (admin)
POST   /api/v1/admin/pages          # Créer page
PUT    /api/v1/admin/pages/:id     # Modifier page
DELETE /api/v1/admin/pages/:id     # Supprimer page

GET    /api/v1/admin/posts         # Liste articles
POST   /api/v1/admin/posts         # Créer article
PUT    /api/v1/admin/posts/:id      # Modifier article
DELETE /api/v1/admin/posts/:id     # Supprimer article

# Gestion médias
GET    /api/v1/admin/media         # Liste médias
POST   /api/v1/admin/media         # Upload média
DELETE /api/v1/admin/media/:id     # Supprimer média

# Gestion membres
GET    /api/v1/admin/members        # Liste membres
GET    /api/v1/admin/members/:id   # Détail membre
GET    /api/v1/admin/members/export # Export CSV
DELETE /api/v1/admin/members/:id   # Supprimer membre
```

---

## 🗄️ SCHÉMA DE BASE DE DONNÉES

### Tables principales

```sql
-- Pages
CREATE TABLE pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_id INT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles (Posts)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_id INT,
  author_id INT,
  status VARCHAR(50) DEFAULT 'draft',
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Portfolio
CREATE TABLE portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  featured_image_id INT,
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  featured_image_id INT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Médias
CREATE TABLE media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  mime_type VARCHAR(100),
  size INT,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Membres (Adhésions)
CREATE TABLE members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  city VARCHAR(100),
  company VARCHAR(255),
  position VARCHAR(100),
  source VARCHAR(100), -- Comment il a connu Yupi
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admins
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🎨 PANEL ADMIN - FONCTIONNALITÉS

### Dashboard
- Vue d'ensemble (statistiques)
- Derniers contenus créés
- Nouveaux membres
- Activité récente

### Gestion de contenu
- **Pages** : CRUD complet
- **Articles** : CRUD complet
- **Portfolio** : CRUD complet
- **Services** : CRUD complet
- Éditeur WYSIWYG (Tiptap ou autre)
- Upload de médias
- Gestion des médias

### Gestion membres
- Liste des membres
- Filtres (pays, statut, date)
- Export CSV
- Détails membre
- Modification/Suppression

### Authentification
- Login/Logout
- Gestion de session
- Protection des routes

---

## 🔄 FLUX DE DONNÉES

### 1. Build du site statique

```
Build time:
  Next.js → Appel API backend → Génère HTML statique
  ↓
Déploiement:
  HTML statique → CDN (Vercel/Netlify)
```

### 2. Formulaire d'adhésion

```
Utilisateur remplit formulaire
  ↓
POST /api/v1/membership → Backend API
  ↓
Validation + Stockage en BDD
  ↓
Confirmation à l'utilisateur
```

### 3. Panel admin - Création de contenu

```
Admin crée/modifie contenu
  ↓
POST/PUT /api/v1/admin/pages → Backend API
  ↓
Validation + Stockage en BDD
  ↓
Trigger rebuild du site statique (webhook)
  ↓
Site statique régénéré avec nouveau contenu
```

---

## 🚀 DÉPLOIEMENT

### Stratégie de déploiement

**Phase 1 : Développement & Tests (Vercel)**
- Frontend, Panel Admin et Backend API sur Vercel
- Base de données MySQL (hébergement externe)

**Phase 2 : Production (Votre propre hébergement)**
- Migration vers votre infrastructure
- Frontend, Panel Admin et Backend sur vos serveurs
- Base de données MySQL sur vos serveurs

### Architecture de déploiement - Phase 1 (Vercel)

```
┌─────────────────────────────────────────┐
│      Frontend (Vercel)                  │
│      - Site statique (SSG)             │
│      - CDN global                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Panel Admin (Vercel)              │
│      - Application Next.js             │
│      - Authentification                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Backend API (Vercel API Routes)   │
│      - Next.js API Routes              │
│      - API REST                        │
│      - Prisma + MySQL                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Base de données MySQL              │
│      - PlanetScale / Railway /         │
│        Votre propre serveur MySQL      │
└─────────────────────────────────────────┘
```

### Architecture de déploiement - Phase 2 (Votre hébergement)

```
┌─────────────────────────────────────────┐
│      Frontend (Votre serveur)           │
│      - Site statique                    │
│      - CDN (Cloudflare)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Panel Admin (Votre serveur)       │
│      - Application Next.js              │
│      - Authentification                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Backend API (Votre serveur)       │
│      - Node.js/Express                 │
│      - API REST                        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Base de données MySQL              │
│      - Votre serveur MySQL             │
└─────────────────────────────────────────┘
```

### ⚠️ Important : Backend avec Vercel

**Option A : API Routes Next.js (Recommandé pour Vercel)**
- Utiliser les API Routes de Next.js (`/app/api/`)
- Déployé automatiquement avec le frontend/admin sur Vercel
- ✅ Simple et intégré
- ✅ Pas de configuration supplémentaire
- ✅ Gratuit pour débuter
- ⚠️ Limites : 10s timeout (Hobby), 60s (Pro)

**Option B : Backend Express séparé**
- Backend Express indépendant
- Nécessite Railway/Render au début
- Migration vers votre serveur ensuite
- ✅ Plus de contrôle
- ✅ Pas de limite de timeout
- ⚠️ Configuration supplémentaire

**Recommandation Phase 1 :** Option A (API Routes Next.js) pour simplicité avec Vercel

### Services recommandés - Phase 1 (Vercel)

**Frontend & Admin & Backend API :**
- ✅ **Vercel** (gratuit Hobby, $20/mois Pro)
  - Frontend : SSG automatique
  - Admin : Next.js App Router
  - Backend : API Routes Next.js

**Base de données MySQL :**
- **PlanetScale** (gratuit jusqu'à 5GB) - Recommandé
- **Railway** ($5/mois MySQL)
- **Votre propre serveur MySQL** (si disponible)

### Migration vers votre hébergement

**Étapes de migration :**
1. Préparer votre infrastructure (serveurs, DNS)
2. Migrer la base de données MySQL
3. Déployer le backend (Express ou API Routes)
4. Déployer le panel admin
5. Déployer le frontend statique
6. Configurer le CDN (Cloudflare)
7. Mettre à jour les DNS

**Avantages de votre hébergement :**
- ✅ Contrôle total
- ✅ Pas de limites Vercel
- ✅ Coûts maîtrisés
- ✅ Performance optimisée

---

## 📝 PLAN DE DÉVELOPPEMENT

### Phase 1 : Setup (1 semaine)
- [ ] Initialisation projets (frontend, backend, admin)
- [ ] Configuration base de données MySQL
- [ ] Setup Prisma avec MySQL
- [ ] Configuration Vercel
- [ ] Setup CI/CD
- [ ] Structure de base

### Phase 2 : Frontend (3-4 semaines) ⭐ PRIORITÉ
- [ ] Configuration Tailwind CSS (tailwind.config.js, postcss.config.js)
- [ ] Setup des styles globaux (globals.css)
- [ ] Pages statiques (Home, About, Services, Portfolio, Blog, Contact)
- [ ] Layout et composants de base avec Tailwind CSS
- [ ] Intégration API (appels au backend)
- [ ] Formulaires (adhésion, contact) avec React Hook Form
- [ ] Redirections (E-commerce, Login)
- [ ] Optimisation SEO
- [ ] Responsive design avec Tailwind CSS

### Phase 3 : Backend API (3-4 semaines)
- [ ] Modèles Prisma (Pages, Posts, Portfolio, Services, Media, Members, Admins)
- [ ] Migrations base de données
- [ ] Routes API contenu (public)
- [ ] Routes API membres (POST adhésion)
- [ ] Routes API admin (CRUD)
- [ ] Authentification admin (JWT)
- [ ] Upload médias
- [ ] Validation avec Zod

### Phase 4 : Panel Admin (3-4 semaines)
- [ ] Configuration Tailwind CSS + shadcn/ui
- [ ] Authentification (login/logout)
- [ ] Dashboard (statistiques, vue d'ensemble) avec Tailwind CSS
- [ ] Gestion contenu (CRUD pages, articles, portfolio, services)
- [ ] Gestion membres (liste, détails, export CSV)
- [ ] Gestion médias (upload, galerie)
- [ ] Éditeur WYSIWYG (Tiptap)
- [ ] Export données
- [ ] Interface responsive avec Tailwind CSS

### Phase 5 : Tests & Déploiement (2 semaines)
- [ ] Tests fonctionnels
- [ ] Tests de performance
- [ ] Déploiement sur Vercel
- [ ] Tests en production
- [ ] Documentation
- [ ] Préparation migration vers votre hébergement

**Total estimé :** 12-15 semaines

**Ordre de développement :**
1. ✅ Phase 1 : Setup
2. ⭐ **Phase 2 : Frontend** (en premier)
3. Phase 3 : Backend API
4. Phase 4 : Panel Admin
5. Phase 5 : Tests & Déploiement

---

## 🛠️ OUTILS RECOMMANDÉS

### Développement
- **IDE :** VS Code
- **Version Control :** Git (GitHub)
- **Package Manager :** pnpm
- **Linting :** ESLint + Prettier
- **Testing :** Jest + React Testing Library

### Base de données
- **ORM :** Prisma ✅
- **Base de données :** MySQL ✅
- **Migrations :** Prisma Migrate
- **Client DB :** Prisma Studio

### API
- **Validation :** Zod
- **Documentation :** Swagger/OpenAPI
- **Rate Limiting :** express-rate-limit

### Panel Admin
- **UI Components :** shadcn/ui
- **Forms :** React Hook Form + Zod
- **Data Fetching :** React Query
- **State :** Zustand
- **Editor :** Tiptap (WYSIWYG)

### Styling
- **CSS Framework :** Tailwind CSS ✅
- **Configuration :** tailwind.config.js
- **PostCSS :** Autoprefixer

---

## ✅ PROCHAINES ÉTAPES

1. ✅ **Stack validée** : Node.js + Prisma + MySQL
2. ✅ **Déploiement** : Vercel (Phase 1) → Votre hébergement (Phase 2)
3. ✅ **Backend** : API Routes Next.js sur Vercel (Phase 1)
4. ✅ **Plan de développement** : Frontend en priorité après Setup
5. [ ] **Définir** le design du panel admin
6. [ ] **Créer** les schémas Prisma détaillés
7. [ ] **Démarrer** le développement (Phase 1 : Setup)

---

**Document créé le :** 3 décembre 2025

