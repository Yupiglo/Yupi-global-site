# 🎨 Logos Yupi Global

**Emplacement :** `frontend/public/logos/`

## 📁 Fichiers Disponibles

### Logo Yupi Global (Principal) ✅

- **`yupi-global-logo.jpg`**
  - Logo officiel Yupi Global
  - Format : JPG
  - Usage : Header, Footer, pages générales
  - **RECOMMANDÉ : Utiliser ce logo**

- **`yupi-global-favicon.png`**
  - Favicon Yupi Global
  - Format : PNG
  - Usage : Favicon du site, icônes

### Logos du Thème (Anciens)

- **`logo.png`** (16 KB, 497x203px)
  - Version standard du logo du thème
  - Usage : Alternative si nécessaire

- **`logo-light.png`** (16 KB)
  - Version claire du logo du thème
  - Usage : Fond sombre

- **`logo-df.png`** (17 KB)
  - Version par défaut/dark du thème
  - Usage : Fond clair

## 📍 Utilisation dans le Code

### Next.js Image Component

```tsx
import Image from 'next/image';

// Logo Yupi Global (RECOMMANDÉ)
<Image
  src="/logos/yupi-global-logo.jpg"
  alt="Yupi Global"
  width={200}
  height={82}
  priority
/>

// Favicon
<link rel="icon" href="/logos/yupi-global-favicon.png" />
```

### Exemple dans le Header

```tsx
import Image from 'next/image';
import Link from 'next/link';

<Link href="/">
  <Image
    src="/logos/yupi-global-logo.jpg"
    alt="Yupi Global"
    width={150}
    height={60}
    priority
    className="h-auto w-auto"
  />
</Link>
```

### Lien Direct

```tsx
<img src="/logos/logo.png" alt="Yupi Global" />
```

## 🎯 Recommandations

1. **Header** : Utiliser `logo.png` ou `logo-df.png` selon le fond
2. **Footer** : Utiliser `logo-light.png` si le footer a un fond sombre
3. **Favicon** : Créer un favicon à partir du logo (à faire)
4. **Optimisation** : Les logos sont déjà optimisés (PNG)

## 📝 Notes

- **Logo principal** : `yupi-global-logo.jpg` - Logo officiel Yupi Global
- **Favicon** : `yupi-global-favicon.png` - Pour le favicon du site
- Les logos ont été trouvés dans les médias WordPress (`uploads/2025/08/`)
- Les anciens logos du thème sont conservés en alternative

## 🎯 Recommandation

**Utiliser `yupi-global-logo.jpg` comme logo principal** dans le Header et le Footer du site.

---

**Date de migration :** 9 décembre 2025

