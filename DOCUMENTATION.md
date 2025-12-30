# 📚 Documentation Complète - Yupi Global

**Version :** 1.0.0  
**Date :** Décembre 2025  
**Type :** Refonte complète du site web

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Contexte du Projet](#contexte-du-projet)
3. [Architecture Générale](#architecture-générale)
4. [Stack Technique](#stack-technique)
5. [Structure du Projet](#structure-du-projet)
6. [Base de Données](#base-de-données)
7. [Installation et Configuration](#installation-et-configuration)
8. [Guide de Développement](#guide-de-développement)
9. [Déploiement](#déploiement)
10. [API Documentation](#api-documentation)

---

## 🎯 Vue d'ensemble

### Qu'est-ce que Yupi Global ?

Yupi Global est une entreprise spécialisée dans les produits de santé et bien-être, principalement actif en Afrique. Le projet consiste en une **refonte complète** du site web existant (anciennement WordPress) vers une architecture moderne et custom.

### Objectifs de la Refonte

1. ✅ **Site statique performant** - Pas d'e-commerce intégré, pas d'authentification utilisateur
2. ✅ **Backend API custom** - Développé sur mesure pour la gestion de contenu
3. ✅ **Panel admin custom** - Interface d'administration développée spécifiquement
4. ✅ **Collecte d'adhésions** - Formulaire pour enregistrer les membres en Afrique
5. ✅ **Redirections externes** - E-commerce et authentification vers systèmes externes

### Caractéristiques Principales

- **Site public statique** : Pages générées statiquement pour performance maximale
- **API REST** : Backend pour la gestion de contenu et les adhésions
- **Panel admin** : Interface complète pour gérer le contenu du site
- **Base de données MySQL** : Stockage des contenus, médias et membres

---

## 📖 Contexte du Projet

### Ancien Système

- **Plateforme** : WordPress
- **Problèmes identifiés** :
  - Performance limitée
  - Dépendance aux plugins
  - Manque de contrôle sur l'architecture
  - Difficultés de maintenance

### Nouveau Système

- **Architecture custom** : Contrôle total sur le code
- **Stack moderne** : Technologies récentes et performantes
- **Séparation des responsabilités** : Frontend, Backend, Admin indépendants
- **Scalabilité** : Architecture prête pour la croissance

---

## 🏗️ Architecture Générale

### Vue d'ensemble

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
│      - Node.js/Express                  │
│      - API REST                         │
│      - Gestion de contenu              │
│      - Gestion membres                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Base de données MySQL             │
│      - Contenu (pages, articles)        │
│      - Médias                           │
│      - Membres                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Panel Admin Custom                 │
│      - Next.js App Router               │
│      - Gestion de contenu              │
│      - Gestion membres                  │
│      - Authentification admin           │
└─────────────────────────────────────────┘
              ↓ (API calls)
         Backend API Custom
```

### Flux de Données

1. **Site statique** : Généré au build time avec le contenu de l'API
2. **Formulaire d'adhésion** : POST vers l'API backend
3. **Panel admin** : CRUD complet via l'API backend
4. **Médias** : Servis directement depuis le frontend (public/media/)

---

## 🛠️ Stack Technique

### Frontend (Site Public)

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 14+ | Framework React avec SSG |
| **TypeScript** | 5.9+ | Typage statique |
| **Tailwind CSS** | 4.1+ | Framework CSS utility-first |
| **React Hook Form** | Latest | Gestion des formulaires |
| **Zod** | Latest | Validation des formulaires |

**Caractéristiques :**
- ✅ Static Site Generation (SSG) pour performance maximale
- ✅ TypeScript pour la sécurité de type
- ✅ Tailwind CSS pour le styling rapide
- ✅ Optimisation automatique des images

### Backend API

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | 5.2+ | Framework web |
| **TypeScript** | 5.9+ | Typage statique |
| **Prisma** | 7.1+ | ORM pour MySQL |
| **MySQL** | 8+ | Base de données |
| **JWT** | Latest | Authentification admin |

**Caractéristiques :**
- ✅ API REST complète
- ✅ Type-safe avec TypeScript
- ✅ ORM Prisma pour la base de données
- ✅ Authentification JWT pour l'admin

### Panel Admin

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 14+ | Framework avec App Router |
| **TypeScript** | 5.9+ | Typage statique |
| **Tailwind CSS** | 4.1+ | Styling |
| **shadcn/ui** | Latest | Composants UI |
| **React Query** | Latest | Data fetching |
| **Zustand** | Latest | State management |
| **Tiptap** | Latest | Éditeur WYSIWYG |

**Caractéristiques :**
- ✅ Interface moderne et réactive
- ✅ Gestion d'état optimisée
- ✅ Éditeur de contenu riche
- ✅ Authentification sécurisée

### Outils de Développement

| Outil | Usage |
|-------|-------|
| **Git** | Version control |
| **ESLint** | Linting du code |
| **Prettier** | Formatage du code |
| **Prisma Studio** | Interface graphique pour la BDD |
| **Nodemon** | Hot-reload backend |

---

## 📁 Structure du Projet

### Structure Globale

```
yupi-global/
├── frontend/              # Site public (Next.js SSG)
│   ├── app/               # Pages et routes (App Router)
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── about/        # Page À propos
│   │   ├── services/     # Page Services
│   │   ├── portfolio/    # Page Portfolio
│   │   ├── blog/         # Page Blog
│   │   └── contact/      # Page Contact
│   ├── components/       # Composants React réutilisables
│   ├── lib/              # Utilitaires et helpers
│   │   └── api.ts        # Client API backend
│   ├── public/           # Fichiers statiques
│   │   └── media/        # Médias (images, vidéos)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/               # API Backend (Express)
│   ├── src/
│   │   ├── app.ts        # Configuration Express
│   │   ├── index.ts      # Point d'entrée
│   │   ├── routes/       # Routes API
│   │   │   ├── index.ts
│   │   │   ├── content.ts    # Routes contenu
│   │   │   ├── media.ts      # Routes médias
│   │   │   ├── members.ts    # Routes membres
│   │   │   └── auth.ts       # Routes authentification
│   │   ├── controllers/  # Contrôleurs
│   │   ├── middleware/   # Middlewares (auth, validation)
│   │   ├── services/     # Services métier
│   │   ├── types/        # Types TypeScript
│   │   ├── utils/        # Utilitaires
│   │   └── lib/
│   │       └── prisma.ts # Client Prisma
│   ├── prisma/
│   │   ├── schema.prisma # Schéma de base de données
│   │   └── migrations/   # Migrations Prisma
│   ├── tsconfig.json
│   └── package.json
│
├── admin/                 # Panel Admin (Next.js)
│   ├── app/
│   │   ├── (auth)/       # Routes authentification
│   │   │   └── login/
│   │   ├── (dashboard)/  # Routes dashboard
│   │   │   ├── page.tsx      # Dashboard
│   │   │   ├── content/      # Gestion contenu
│   │   │   ├── members/      # Gestion membres
│   │   │   └── media/        # Gestion médias
│   ├── components/       # Composants UI
│   ├── lib/
│   │   └── api.ts        # Client API backend
│   ├── tailwind.config.js
│   └── package.json
│
└── shared/                # Code partagé
    └── types/
        └── index.ts       # Types TypeScript partagés
```

### Détails par Module

#### Frontend

**Pages principales :**
- `app/page.tsx` - Page d'accueil
- `app/about/page.tsx` - Page À propos
- `app/services/page.tsx` - Page Services
- `app/portfolio/page.tsx` - Page Portfolio
- `app/blog/page.tsx` - Page Blog (liste articles)
- `app/blog/[slug]/page.tsx` - Page article individuel
- `app/contact/page.tsx` - Page Contact

**Composants :**
- `components/Header.tsx` - En-tête du site
- `components/Footer.tsx` - Pied de page
- `components/MembershipForm.tsx` - Formulaire d'adhésion
- `components/ContactForm.tsx` - Formulaire de contact

**Médias :**
- `public/media/` - Tous les médias organisés par année
  - `2021/`, `2022/`, `2023/`, `2025/`

#### Backend

**Routes API :**
- `/api/v1/pages` - Gestion des pages
- `/api/v1/posts` - Gestion des articles
- `/api/v1/portfolio` - Gestion du portfolio
- `/api/v1/services` - Gestion des services
- `/api/v1/membership` - Adhésion membres (POST)
- `/api/v1/admin/*` - Routes admin (authentifiées)

**Structure :**
- `routes/` - Définition des routes
- `controllers/` - Logique métier
- `services/` - Services réutilisables
- `middleware/` - Authentification, validation
- `lib/prisma.ts` - Client Prisma singleton

#### Admin

**Routes :**
- `/login` - Connexion admin
- `/dashboard` - Tableau de bord
- `/content/pages` - Gestion pages
- `/content/posts` - Gestion articles
- `/members` - Gestion membres
- `/media` - Gestion médias

**Fonctionnalités :**
- Authentification JWT
- CRUD complet pour tous les contenus
- Upload de médias
- Export CSV des membres
- Éditeur WYSIWYG

---

## 🗄️ Base de Données

### Schéma Prisma

Le schéma de base de données est défini dans `backend/prisma/schema.prisma`.

#### Modèles Principaux

**Page**
```prisma
model Page {
  id              Int       @id @default(autoincrement())
  title           String
  slug            String    @unique
  content         String?   @db.Text
  excerpt         String?   @db.Text
  featuredImageId Int?
  status          String    @default("draft")
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

**Post** (Articles de blog)
```prisma
model Post {
  id              Int       @id @default(autoincrement())
  title           String
  slug            String    @unique
  content         String?   @db.Text
  excerpt         String?   @db.Text
  featuredImageId Int?
  authorId        Int?
  status          String    @default("draft")
  publishedAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

**Member** (Adhésions)
```prisma
model Member {
  id        Int       @id @default(autoincrement())
  firstName String
  lastName  String
  email     String    @unique
  phone     String?
  country   String?
  city      String?
  company   String?
  position  String?
  source    String?
  status    String    @default("pending")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

**Media**
```prisma
model Media {
  id              Int       @id @default(autoincrement())
  filename        String
  originalFilename String?
  mimeType        String?
  size            Int?
  url             String
  altText         String?
  createdAt       DateTime  @default(now())
}
```

**Admin**
```prisma
model Admin {
  id           Int       @id @default(autoincrement())
  username     String    @unique
  email        String    @unique
  passwordHash String
  role         String    @default("editor")
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

### Relations

- `Page.featuredImage` → `Media`
- `Post.featuredImage` → `Media`
- `Post.author` → `Admin`
- `Portfolio.featuredImage` → `Media`
- `Service.featuredImage` → `Media`

### Migrations

Les migrations Prisma sont dans `backend/prisma/migrations/`.

**Créer une migration :**
```bash
cd backend
npm run prisma:migrate
```

**Visualiser la base de données :**
```bash
npm run prisma:studio
```

---

## ⚙️ Installation et Configuration

### Prérequis

- **Node.js** : 18.0 ou supérieur
- **MySQL** : 8.0 ou supérieur
- **npm** : Inclus avec Node.js
- **Git** : Pour le version control

### Installation

#### 1. Cloner le projet

```bash
git clone <repository-url>
cd yupi-global
```

#### 2. Installer les dépendances

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Admin
cd ../admin
npm install
```

#### 3. Configurer la base de données

**Créer la base de données MySQL :**
```sql
CREATE DATABASE yupi_global CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Configurer le backend :**
```bash
cd backend
cp .env.example .env
```

Éditer `.env` :
```env
DATABASE_URL="mysql://user:password@localhost:3306/yupi_global"
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
```

#### 4. Initialiser Prisma

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

#### 5. Démarrer les serveurs

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
# Serveur sur http://localhost:3001
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
# Site sur http://localhost:3000
```

**Terminal 3 - Admin :**
```bash
cd admin
npm run dev
# Admin sur http://localhost:3002
```

### Variables d'Environnement

#### Backend (.env)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion MySQL | `mysql://user:pass@localhost:3306/yupi_global` |
| `PORT` | Port du serveur backend | `3001` |
| `NODE_ENV` | Environnement | `development` ou `production` |
| `JWT_SECRET` | Secret pour JWT | `your-secret-key` |

#### Frontend & Admin

Les variables d'environnement sont dans `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## 💻 Guide de Développement

### Workflow de Développement

1. **Créer une branche**
   ```bash
   git checkout -b feature/nom-feature
   ```

2. **Développer**
   - Modifier le code
   - Tester localement
   - Commiter régulièrement

3. **Tester**
   ```bash
   # Linter
   npm run lint
   
   # Build
   npm run build
   ```

4. **Pousser et créer une PR**
   ```bash
   git push origin feature/nom-feature
   ```

### Conventions de Code

#### TypeScript

- Utiliser des types stricts
- Éviter `any`
- Utiliser les interfaces pour les objets

#### Nommage

- **Composants** : PascalCase (`Header.tsx`)
- **Fichiers** : kebab-case (`user-service.ts`)
- **Variables** : camelCase (`userName`)
- **Constantes** : UPPER_SNAKE_CASE (`API_URL`)

#### Structure des Composants

```tsx
// components/Example.tsx
import { useState } from 'react';

interface ExampleProps {
  title: string;
  onClick: () => void;
}

export function Example({ title, onClick }: ExampleProps) {
  const [state, setState] = useState<string>('');
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
}
```

### Scripts Disponibles

#### Backend

```bash
npm run dev          # Développement avec hot-reload
npm run build        # Compiler TypeScript
npm run start        # Production
npm run prisma:generate  # Générer Prisma Client
npm run prisma:migrate   # Exécuter migrations
npm run prisma:studio    # Interface graphique BDD
```

#### Frontend & Admin

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Production
npm run lint         # Linter
```

---

## 🚀 Déploiement

### Phase 1 : Vercel (Développement & Tests)

**Frontend & Admin :**
- Déployé automatiquement sur Vercel
- SSG pour le frontend
- App Router pour l'admin

**Backend :**
- Option A : API Routes Next.js (recommandé pour Vercel)
- Option B : Backend Express séparé (Railway/Render)

**Base de données :**
- PlanetScale (gratuit jusqu'à 5GB)
- Railway MySQL ($5/mois)
- Votre propre serveur MySQL

### Phase 2 : Votre Hébergement

**Migration vers votre infrastructure :**

1. Préparer les serveurs
2. Migrer la base de données
3. Déployer le backend
4. Déployer le panel admin
5. Déployer le frontend statique
6. Configurer le CDN (Cloudflare)
7. Mettre à jour les DNS

**Avantages :**
- Contrôle total
- Pas de limites Vercel
- Coûts maîtrisés
- Performance optimisée

---

## 📡 API Documentation

### Endpoints Publics

#### Contenu

```
GET    /api/v1/pages              # Liste des pages
GET    /api/v1/pages/:slug         # Page par slug
GET    /api/v1/posts               # Articles blog
GET    /api/v1/posts/:slug         # Article par slug
GET    /api/v1/portfolio            # Projets portfolio
GET    /api/v1/services            # Services
GET    /api/v1/media/:id           # Média par ID
```

#### Membres

```
POST   /api/v1/membership          # Adhésion nouveau membre
```

### Endpoints Admin (Authentifiés)

#### Authentification

```
POST   /api/v1/admin/auth/login    # Connexion admin
POST   /api/v1/admin/auth/logout   # Déconnexion
GET    /api/v1/admin/auth/me       # Info admin connecté
```

#### Gestion Contenu

```
GET    /api/v1/admin/pages         # Liste pages
POST   /api/v1/admin/pages          # Créer page
PUT    /api/v1/admin/pages/:id     # Modifier page
DELETE /api/v1/admin/pages/:id     # Supprimer page
```

#### Gestion Membres

```
GET    /api/v1/admin/members        # Liste membres
GET    /api/v1/admin/members/:id   # Détail membre
GET    /api/v1/admin/members/export # Export CSV
DELETE /api/v1/admin/members/:id   # Supprimer membre
```

### Exemples de Requêtes

#### Créer une page (Admin)

```bash
curl -X POST http://localhost:3001/api/v1/admin/pages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Ma Page",
    "slug": "ma-page",
    "content": "Contenu de la page",
    "status": "published"
  }'
```

#### Adhésion membre (Public)

```bash
curl -X POST http://localhost:3001/api/v1/membership \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "country": "Cameroun",
    "city": "Douala"
  }'
```

---

## 📝 Notes Importantes

### Médias

- Les médias sont dans `frontend/public/media/`
- Organisés par année (2021, 2022, 2023, 2025)
- Accessibles via `/media/[chemin]`
- **Non versionnés** dans Git (trop volumineux - 1.6 GB)

### Sécurité

- JWT pour l'authentification admin
- Validation des données avec Zod
- Protection CORS configurée
- Variables d'environnement pour les secrets

### Performance

- Site statique (SSG) pour performance maximale
- Images optimisées avec Next.js Image
- CDN pour les médias (en production)
- Cache des requêtes API

---

## 📚 Ressources

### Documentation Externe

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Fichiers de Documentation du Projet

- `README.md` - Guide de démarrage rapide
- `SETUP-COMPLETE.md` - Guide d'installation détaillé
- `MIGRATION-MEDIAS.md` - Rapport de migration des médias
- `NETTOYAGE-MEDIAS.md` - Rapport de nettoyage des plugins
- `NETTOYAGE-DOUBLONS.md` - Rapport de nettoyage des doublons
- `EXPLICATION-NODE-MODULES.md` - Explication de node_modules

---

## 🤝 Contribution

### Processus

1. Créer une branche depuis `main`
2. Développer la fonctionnalité
3. Tester localement
4. Créer une Pull Request
5. Code review
6. Merge dans `main`

### Standards

- Code linter avec ESLint
- Formatage avec Prettier
- Tests (à venir)
- Documentation à jour

---

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur le repository
- Contacter l'équipe de développement

---

**Documentation créée le :** 9 décembre 2025  
**Dernière mise à jour :** 9 décembre 2025  
**Version :** 1.0.0

