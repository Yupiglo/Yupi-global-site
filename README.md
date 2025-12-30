# 🌍 YUPI GLOBAL - Nouveau Site

Refonte complète du site Yupi Global avec architecture custom.

## 📁 Structure du Projet

```
yupi-global/
├── frontend/          # Site public (Next.js SSG)
├── backend/           # API Backend (Express + Prisma)
├── admin/             # Panel Admin (Next.js App Router)
└── shared/            # Code partagé (types, utils)
```

## 🛠️ Stack Technique

### Frontend
- Next.js 14 (Static Site Generation)
- TypeScript
- Tailwind CSS
- React Hook Form

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- MySQL

### Panel Admin
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Zustand

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- MySQL 8+
- npm ou pnpm

### Installation

1. **Cloner et installer les dépendances :**
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

2. **Configurer la base de données :**
```bash
cd backend
# Créer un fichier .env avec votre DATABASE_URL
# Exemple: DATABASE_URL="mysql://user:password@localhost:3306/yupi_global"
```

3. **Initialiser Prisma :**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

4. **Démarrer les serveurs :**

```bash
# Backend (port 3001)
cd backend
npm run dev

# Frontend (port 3000)
cd frontend
npm run dev

# Admin (port 3002)
cd admin
npm run dev
```

## 📝 Scripts Disponibles

### Backend
- `npm run dev` - Démarrer en mode développement
- `npm run build` - Compiler TypeScript
- `npm run start` - Démarrer en production
- `npm run prisma:generate` - Générer Prisma Client
- `npm run prisma:migrate` - Exécuter les migrations
- `npm run prisma:studio` - Ouvrir Prisma Studio

### Frontend & Admin
- `npm run dev` - Démarrer en mode développement
- `npm run build` - Build de production
- `npm run start` - Démarrer en production
- `npm run lint` - Linter le code

## 🗄️ Base de Données

Le schéma Prisma se trouve dans `backend/prisma/schema.prisma`.

Pour créer une nouvelle migration :
```bash
cd backend
npm run prisma:migrate
```

## 🚀 Déploiement

### Phase 1 : Vercel (Développement)
- Frontend, Admin et Backend API Routes sur Vercel
- Base de données MySQL externe (PlanetScale, Railway, etc.)

### Phase 2 : Votre Hébergement
- Migration vers votre infrastructure
- Déploiement sur vos serveurs

## 📚 Documentation

- **`DOCUMENTATION.md`** - Documentation complète du projet (structure, stack, architecture)
- **`PLANIFICATION.md`** - Planification détaillée du projet (phases, tâches, calendrier)
- **`SETUP-COMPLETE.md`** - Guide d'installation détaillé
- **`frontend/DOCUMENTATION-FRONTEND.md`** - Documentation complète du frontend (pages, composants, structure)

## 👥 Développement

### Ordre de développement
1. ✅ Phase 1 : Setup (en cours)
2. ⭐ Phase 2 : Frontend (priorité)
3. Phase 3 : Backend API
4. Phase 4 : Panel Admin
5. Phase 5 : Tests & Déploiement

## 📄 License

ISC

