# 📱 Documentation Frontend - Yupi Global

**Version :** 1.0.0  
**Date :** 9 décembre 2025  
**Framework :** Next.js 14 avec App Router

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [État Actuel](#état-actuel)
3. [Architecture Technique](#architecture-technique)
4. [Structure du Projet](#structure-du-projet)
5. [Pages Prévues](#pages-prévues)
6. [Composants à Développer](#composants-à-développer)
7. [Styles et Thème](#styles-et-thème)
8. [Intégration API](#intégration-api)
9. [Médias](#médias)
10. [Guide de Développement](#guide-de-développement)

---

## 🎯 Vue d'ensemble

### Description

Le frontend de Yupi Global est un **site statique** développé avec Next.js 14 utilisant le **Static Site Generation (SSG)** pour une performance optimale. Le site présente les informations de l'entreprise, ses services, son portfolio, un blog, et permet la collecte d'adhésions de membres.

### Caractéristiques Principales

- ✅ **Site statique** : Génération statique pour performance maximale
- ✅ **TypeScript** : Typage statique pour la sécurité
- ✅ **Tailwind CSS** : Styling utility-first
- ✅ **Responsive** : Compatible mobile, tablette, desktop
- ✅ **SEO optimisé** : Métadonnées et structure optimisée
- ✅ **Formulaires** : Adhésion membres et contact

### Objectifs

1. Présenter l'entreprise Yupi Global
2. Afficher les services et le portfolio
3. Publier des articles de blog
4. Collecter les adhésions de membres
5. Rediriger vers l'e-commerce et l'authentification externes

---

## 📊 État Actuel

### Statut : 🟡 **Phase Initiale**

Le frontend est actuellement dans sa **phase d'initialisation**. Seule la structure de base Next.js est en place avec la page par défaut.

### Ce qui existe actuellement

#### ✅ Structure de Base

```
frontend/
├── app/
│   ├── layout.tsx          ✅ Layout racine (basique)
│   ├── page.tsx            ✅ Page d'accueil (template Next.js)
│   ├── globals.css         ✅ Styles globaux
│   └── favicon.ico         ✅ Favicon
├── public/
│   ├── media/              ✅ Médias migrés (1.6 GB)
│   └── [assets Next.js]    ✅ Assets par défaut
├── package.json            ✅ Dépendances installées
├── tsconfig.json           ✅ Configuration TypeScript
├── next.config.ts          ✅ Configuration Next.js
└── tailwind.config.js      ✅ Configuration Tailwind (par défaut)
```

#### ✅ Dépendances Installées

- **Next.js** : 16.0.8
- **React** : 19.2.1
- **TypeScript** : 5.x
- **Tailwind CSS** : 4.x
- **React Hook Form** : 7.68.0
- **Zod** : 4.1.13
- **@hookform/resolvers** : 5.2.2

#### ⏳ À Développer

- [ ] Composants réutilisables (Header, Footer, etc.)
- [ ] Pages principales (About, Services, Portfolio, Blog, Contact)
- [ ] Formulaires (Adhésion, Contact)
- [ ] Client API pour le backend
- [ ] Thème et design system
- [ ] Optimisation SEO

---

## 🏗️ Architecture Technique

### Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 16.0.8 | Framework React avec SSG |
| **React** | 19.2.1 | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 4.x | Framework CSS |
| **React Hook Form** | 7.68.0 | Gestion formulaires |
| **Zod** | 4.1.13 | Validation schémas |

### Architecture Next.js

#### App Router

Le projet utilise le **App Router** de Next.js (introduit dans Next.js 13+), qui offre :

- ✅ **Routes basées sur les dossiers** : Structure de fichiers = routes
- ✅ **Server Components par défaut** : Performance optimale
- ✅ **Layouts imbriqués** : Réutilisation de layouts
- ✅ **Loading states** : Gestion des états de chargement
- ✅ **Error boundaries** : Gestion des erreurs

#### Structure des Routes

```
app/
├── layout.tsx              # Layout racine
├── page.tsx                # Route: /
├── about/
│   └── page.tsx            # Route: /about
├── services/
│   ├── page.tsx            # Route: /services
│   └── [slug]/
│       └── page.tsx        # Route: /services/[slug]
├── portfolio/
│   ├── page.tsx            # Route: /portfolio
│   └── [slug]/
│       └── page.tsx        # Route: /portfolio/[slug]
├── blog/
│   ├── page.tsx            # Route: /blog
│   └── [slug]/
│       └── page.tsx        # Route: /blog/[slug]
└── contact/
    └── page.tsx            # Route: /contact
```

### Génération Statique (SSG)

Toutes les pages seront générées statiquement au build time :

```typescript
// Exemple pour une page statique
export default async function Page() {
  // Fetch data at build time
  const data = await fetch('http://localhost:3001/api/v1/pages');
  return <div>{/* Render static content */}</div>;
}
```

**Avantages :**
- ⚡ Performance maximale (HTML pré-généré)
- 🔍 SEO optimal
- 💰 Coûts réduits (pas de serveur nécessaire)
- 🛡️ Sécurité (pas de code serveur exposé)

---

## 📁 Structure du Projet

### Structure Actuelle

```
frontend/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Page d'accueil
│   ├── globals.css         # Styles globaux
│   └── favicon.ico         # Favicon
│
├── components/             # ⏳ À créer
│   ├── Header.tsx          # En-tête du site
│   ├── Footer.tsx          # Pied de page
│   ├── Navigation.tsx      # Navigation principale
│   ├── MembershipForm.tsx  # Formulaire d'adhésion
│   ├── ContactForm.tsx     # Formulaire de contact
│   └── [autres composants]
│
├── lib/                    # ⏳ À créer
│   ├── api.ts              # Client API backend
│   ├── utils.ts            # Utilitaires
│   └── constants.ts        # Constantes
│
├── types/                  # ⏳ À créer
│   └── index.ts            # Types TypeScript
│
├── public/                 # Fichiers statiques
│   ├── media/              # ✅ Médias (1.6 GB)
│   │   ├── 2021/          # Médias 2021
│   │   ├── 2022/          # Médias 2022
│   │   ├── 2023/          # Médias 2023
│   │   └── 2025/          # Médias 2025
│   └── [assets]
│
├── package.json            # ✅ Dépendances
├── tsconfig.json           # ✅ Config TypeScript
├── next.config.ts          # ✅ Config Next.js
├── tailwind.config.js      # ✅ Config Tailwind
└── postcss.config.mjs       # ✅ Config PostCSS
```

### Structure Prévue (Complète)

```
frontend/
├── app/
│   ├── layout.tsx          # Layout racine avec Header/Footer
│   ├── page.tsx            # Page d'accueil
│   ├── about/
│   │   └── page.tsx        # Page À propos
│   ├── services/
│   │   ├── page.tsx        # Liste services
│   │   └── [slug]/
│   │       └── page.tsx    # Détail service
│   ├── portfolio/
│   │   ├── page.tsx        # Liste portfolio
│   │   └── [slug]/
│   │       └── page.tsx    # Détail projet
│   ├── blog/
│   │   ├── page.tsx        # Liste articles
│   │   └── [slug]/
│   │       └── page.tsx    # Article individuel
│   └── contact/
│       └── page.tsx        # Page contact
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── forms/
│   │   ├── MembershipForm.tsx
│   │   └── ContactForm.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Testimonials.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
│
├── lib/
│   ├── api.ts              # Client API
│   ├── utils.ts            # Utilitaires
│   └── constants.ts        # Constantes
│
└── types/
    └── index.ts            # Types partagés
```

---

## 📄 Pages Prévues

### 1. Page d'Accueil (`/`)

**Route :** `app/page.tsx`

**Sections prévues :**

1. **Hero Section**
   - Titre principal
   - Sous-titre
   - Call-to-action (CTA)
   - Image/Vidéo de fond

2. **Section Services**
   - Présentation des services principaux
   - Cartes de services avec icônes
   - Lien vers page services complète

3. **Section Portfolio**
   - Projets phares
   - Grille de projets
   - Lien vers portfolio complet

4. **Section Témoignages**
   - Témoignages clients
   - Carrousel ou grille

5. **Call-to-Action Final**
   - Formulaire d'adhésion rapide
   - Ou lien vers formulaire complet

**État actuel :** ⏳ Template Next.js par défaut

---

### 2. Page À Propos (`/about`)

**Route :** `app/about/page.tsx`

**Sections prévues :**

1. **Hero Section**
   - Titre "À Propos de Yupi Global"
   - Image de présentation

2. **Histoire de l'Entreprise**
   - Fondation
   - Évolution
   - Mission et vision

3. **Valeurs**
   - Liste des valeurs
   - Descriptions

4. **Équipe** (optionnel)
   - Membres de l'équipe
   - Photos et rôles

5. **Statistiques**
   - Chiffres clés
   - Réalisations

**État actuel :** ⏳ À créer

---

### 3. Page Services (`/services`)

**Route :** `app/services/page.tsx` (liste)  
**Route :** `app/services/[slug]/page.tsx` (détail)

**Page Liste :**

1. **Hero Section**
   - Titre "Nos Services"
   - Description

2. **Grille de Services**
   - Tous les services
   - Cartes avec images
   - Descriptions courtes
   - Lien vers détail

**Page Détail :**

1. **En-tête**
   - Titre du service
   - Image featured

2. **Description**
   - Contenu détaillé
   - Avantages
   - Utilisations

3. **Call-to-Action**
   - Formulaire de contact
   - Lien vers e-commerce (si applicable)

**État actuel :** ⏳ À créer

---

### 4. Page Portfolio (`/portfolio`)

**Route :** `app/portfolio/page.tsx` (liste)  
**Route :** `app/portfolio/[slug]/page.tsx` (détail)

**Page Liste :**

1. **Hero Section**
   - Titre "Notre Portfolio"
   - Description

2. **Filtres**
   - Par catégorie
   - Par année

3. **Grille de Projets**
   - Images des projets
   - Titres
   - Catégories
   - Lien vers détail

**Page Détail :**

1. **En-tête**
   - Titre du projet
   - Image featured

2. **Description**
   - Contexte
   - Réalisations
   - Technologies utilisées

3. **Galerie**
   - Images supplémentaires
   - Vidéos (si applicable)

**État actuel :** ⏳ À créer

---

### 5. Page Blog (`/blog`)

**Route :** `app/blog/page.tsx` (liste)  
**Route :** `app/blog/[slug]/page.tsx` (article)

**Page Liste :**

1. **Hero Section**
   - Titre "Blog"
   - Description

2. **Filtres**
   - Par catégorie
   - Par date
   - Recherche

3. **Liste d'Articles**
   - Cartes d'articles
   - Images featured
   - Extrait
   - Date de publication
   - Auteur

4. **Pagination**
   - Navigation entre pages

**Page Article :**

1. **En-tête**
   - Titre
   - Image featured
   - Métadonnées (date, auteur, catégorie)

2. **Contenu**
   - Article complet (HTML/Markdown)
   - Images intégrées

3. **Navigation**
   - Article précédent
   - Article suivant
   - Retour au blog

**État actuel :** ⏳ À créer

---

### 6. Page Contact (`/contact`)

**Route :** `app/contact/page.tsx`

**Sections prévues :**

1. **Hero Section**
   - Titre "Contactez-nous"
   - Description

2. **Formulaire de Contact**
   - Nom
   - Email
   - Sujet
   - Message
   - Validation
   - Soumission vers API

3. **Informations de Contact**
   - Adresse
   - Téléphone
   - Email
   - Horaires

4. **Carte** (optionnel)
   - Localisation Google Maps

**État actuel :** ⏳ À créer

---

## 🧩 Composants à Développer

### Composants de Layout

#### Header (`components/layout/Header.tsx`)

**Fonctionnalités :**
- Logo Yupi Global
- Navigation principale
  - Accueil
  - À propos
  - Services
  - Portfolio
  - Blog
  - Contact
- Bouton "E-commerce" (redirection externe)
- Bouton "Login" (redirection externe)
- Menu mobile responsive
- Sticky header (optionnel)

**État :** ⏳ À créer

#### Footer (`components/layout/Footer.tsx`)

**Fonctionnalités :**
- Liens rapides
- Informations de contact
- Réseaux sociaux
- Copyright
- Liens légaux (optionnel)

**État :** ⏳ À créer

#### Navigation (`components/layout/Navigation.tsx`)

**Fonctionnalités :**
- Menu de navigation
- Menu mobile (hamburger)
- Navigation active (highlight)
- Smooth scroll

**État :** ⏳ À créer

---

### Composants de Formulaires

#### MembershipForm (`components/forms/MembershipForm.tsx`)

**Champs :**
- Prénom (required)
- Nom (required)
- Email (required, validation)
- Téléphone (optional)
- Pays (required, select)
- Ville (optional)
- Entreprise (optional)
- Poste (optional)
- Source (Comment avez-vous connu Yupi?) (optional)

**Fonctionnalités :**
- Validation avec Zod
- Gestion des erreurs
- Message de succès
- Soumission vers `/api/v1/membership`
- Loading state

**État :** ⏳ À créer

#### ContactForm (`components/forms/ContactForm.tsx`)

**Champs :**
- Nom (required)
- Email (required, validation)
- Sujet (required)
- Message (required)

**Fonctionnalités :**
- Validation avec Zod
- Gestion des erreurs
- Message de succès
- Soumission vers API (à définir)
- Loading state

**État :** ⏳ À créer

---

### Composants de Sections

#### Hero (`components/sections/Hero.tsx`)

**Props :**
- `title`: string
- `subtitle`: string
- `ctaText`: string
- `ctaLink`: string
- `backgroundImage`: string (optional)

**État :** ⏳ À créer

#### Services (`components/sections/Services.tsx`)

**Props :**
- `services`: Service[]
- `limit`: number (optional)

**Fonctionnalités :**
- Affichage en grille
- Cartes de services
- Lien vers détail

**État :** ⏳ À créer

#### Portfolio (`components/sections/Portfolio.tsx`)

**Props :**
- `projects`: Portfolio[]
- `limit`: number (optional)

**Fonctionnalités :**
- Grille de projets
- Filtres (optionnel)
- Lien vers détail

**État :** ⏳ À créer

---

### Composants UI

#### Button (`components/ui/Button.tsx`)

**Variantes :**
- Primary
- Secondary
- Outline
- Ghost

**Tailles :**
- Small
- Medium
- Large

**État :** ⏳ À créer

#### Card (`components/ui/Card.tsx`)

**Usage :** Cartes pour services, portfolio, articles

**État :** ⏳ À créer

#### Input (`components/ui/Input.tsx`)

**Types :**
- Text
- Email
- Tel
- Textarea
- Select

**Fonctionnalités :**
- Validation visuelle
- Messages d'erreur
- Label et placeholder

**État :** ⏳ À créer

---

## 🎨 Styles et Thème

### Configuration Actuelle

#### Tailwind CSS

**Fichier :** `tailwind.config.js` (par défaut)

**Configuration actuelle :**
- Thème par défaut Next.js
- Support dark mode (via `prefers-color-scheme`)
- Fonts : Geist Sans et Geist Mono

#### Styles Globaux

**Fichier :** `app/globals.css`

**Contenu actuel :**
- Variables CSS pour thème
- Support dark mode
- Reset de base

### Thème Prévu

#### Couleurs (à définir)

```css
:root {
  --primary: #[couleur principale];
  --secondary: #[couleur secondaire];
  --accent: #[couleur accent];
  --background: #ffffff;
  --foreground: #171717;
  --muted: #[couleur muted];
}
```

#### Typographie

- **Font principale :** Geist Sans (actuelle)
- **Font monospace :** Geist Mono (actuelle)
- **Tailles :** À définir selon design

#### Espacements

- Utilisation de l'échelle Tailwind par défaut
- Customisation si nécessaire

### Responsive Design

**Breakpoints Tailwind :**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Stratégie :** Mobile-first

---

## 🔌 Intégration API

### Client API

**Fichier prévu :** `lib/api.ts`

**Fonctions prévues :**

```typescript
// Pages
export async function getPages(): Promise<Page[]>
export async function getPageBySlug(slug: string): Promise<Page>

// Posts
export async function getPosts(params?: { limit?: number, page?: number }): Promise<Post[]>
export async function getPostBySlug(slug: string): Promise<Post>

// Portfolio
export async function getPortfolio(): Promise<Portfolio[]>
export async function getPortfolioBySlug(slug: string): Promise<Portfolio>

// Services
export async function getServices(): Promise<Service[]>
export async function getServiceBySlug(slug: string): Promise<Service>

// Membership
export async function submitMembership(data: MembershipFormData): Promise<Response>
```

**État :** ⏳ À créer

### Configuration

**URL de base :** `process.env.NEXT_PUBLIC_API_URL` ou `http://localhost:3001/api/v1`

**Gestion des erreurs :**
- Try/catch dans les fonctions
- Messages d'erreur utilisateur
- Logging des erreurs

---

## 🖼️ Médias

### Structure

**Emplacement :** `public/media/`

**Organisation :**
```
media/
├── 2021/          # Médias de 2021
├── 2022/          # Médias de 2022
├── 2023/          # Médias de 2023
└── 2025/          # Médias de 2025
```

**Taille totale :** 1.6 GB (après nettoyage)

### Utilisation

#### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/media/2025/01/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false} // Lazy load par défaut
/>
```

#### Lien Direct

```tsx
<img src="/media/2025/01/image.jpg" alt="Description" />
```

### Optimisation

- ✅ Utilisation de `next/image` pour optimisation automatique
- ✅ Lazy loading par défaut
- ✅ Formats modernes (WebP) si disponible
- ⏳ Compression des images (à faire)

---

## 💻 Guide de Développement

### Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

### Conventions de Code

#### Nommage

- **Composants :** PascalCase (`Header.tsx`)
- **Fichiers utilitaires :** camelCase (`api.ts`)
- **Dossiers :** kebab-case (`components/`)

#### Structure des Composants

```tsx
// Exemple de composant
import { useState } from 'react';

interface ComponentProps {
  title: string;
  onClick?: () => void;
}

export function Component({ title, onClick }: ComponentProps) {
  const [state, setState] = useState<string>('');
  
  return (
    <div>
      <h1>{title}</h1>
      {onClick && <button onClick={onClick}>Click</button>}
    </div>
  );
}
```

#### Types TypeScript

- Utiliser des interfaces pour les props
- Éviter `any`
- Types stricts activés

### Workflow

1. **Créer une branche**
   ```bash
   git checkout -b feature/nom-feature
   ```

2. **Développer**
   - Créer les composants
   - Tester localement
   - Commiter régulièrement

3. **Tester**
   ```bash
   npm run lint
   npm run build
   ```

4. **Pousser**
   ```bash
   git push origin feature/nom-feature
   ```

---

## 📝 Checklist de Développement

### Phase 1 : Structure et Layout

- [ ] Créer le dossier `components/`
- [ ] Créer `components/layout/Header.tsx`
- [ ] Créer `components/layout/Footer.tsx`
- [ ] Créer `components/layout/Navigation.tsx`
- [ ] Intégrer Header/Footer dans `app/layout.tsx`
- [ ] Configurer le thème Tailwind
- [ ] Tester le responsive

### Phase 2 : Pages Principales

- [ ] Créer `app/about/page.tsx`
- [ ] Créer `app/services/page.tsx`
- [ ] Créer `app/services/[slug]/page.tsx`
- [ ] Créer `app/portfolio/page.tsx`
- [ ] Créer `app/portfolio/[slug]/page.tsx`
- [ ] Créer `app/blog/page.tsx`
- [ ] Créer `app/blog/[slug]/page.tsx`
- [ ] Créer `app/contact/page.tsx`
- [ ] Développer `app/page.tsx` (accueil)

### Phase 3 : Formulaires

- [ ] Créer `components/forms/MembershipForm.tsx`
- [ ] Créer `components/forms/ContactForm.tsx`
- [ ] Intégrer les formulaires dans les pages
- [ ] Tester la validation
- [ ] Tester la soumission

### Phase 4 : Intégration API

- [ ] Créer `lib/api.ts`
- [ ] Implémenter les fonctions API
- [ ] Intégrer dans les pages
- [ ] Gérer les états de chargement
- [ ] Gérer les erreurs

### Phase 5 : Optimisation

- [ ] Optimisation SEO
- [ ] Optimisation des images
- [ ] Tests de performance
- [ ] Tests cross-browser
- [ ] Tests responsive

---

## 🎯 Prochaines Étapes

### Priorité 1 : Structure de Base

1. Créer les composants de layout (Header, Footer)
2. Configurer le thème Tailwind
3. Intégrer dans le layout principal

### Priorité 2 : Pages Principales

1. Développer la page d'accueil
2. Créer les autres pages (About, Services, etc.)
3. Intégrer les données (statiques d'abord)

### Priorité 3 : Formulaires

1. Créer les composants de formulaires
2. Intégrer la validation
3. Connecter à l'API backend

### Priorité 4 : Intégration Complète

1. Connecter toutes les pages à l'API
2. Optimiser les performances
3. Finaliser le SEO

---

## 📚 Ressources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Outils

- **VS Code** : Éditeur recommandé
- **React DevTools** : Extension navigateur
- **Next.js DevTools** : Outils de développement

---

**Document créé le :** 9 décembre 2025  
**Dernière mise à jour :** 9 décembre 2025  
**Version :** 1.0.0

