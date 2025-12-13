# Optimisations de performance (PageSpeed Insights)

## 1️⃣ Analyse des points faibles relevés
| Métrique | Score actuel | Impact principal |
|----------|--------------|-------------------|
| **FCP** (First Contentful Paint) | 0,3 s (excellent) | Bon, mais on peut encore réduire le temps de chargement initial. |
| **LCP** (Largest Contentful Paint) | 0,7 s (excellent) | Le plus grand élément visible charge rapidement, mais on doit s’assurer qu’il reste optimal sur tous les appareils. |
| **TBT** (Total Blocking Time) | 0 ms | Aucun blocage majeur – excellent. |
| **CLS** (Cumulative Layout Shift) | 0,501 (moyen) | Déplacements de mise en page à corriger. |
| **Speed Index** | 2,0 s | Améliorable via optimisation du rendu critique. |

## 2️⃣ Principales recommandations

### 🔧 2.1 Optimisation des images
- **Utiliser `next/image`** partout où une image est affichée : il fournit lazy‑loading, redimensionnement automatique et formats WebP.
- **Compresser** les images (TinyPNG / ImageOptim) avant de les placer dans `public/images`.
- **Définir des dimensions** (`width` / `height`) pour éviter les sauts de mise en page (CLS).
- **Lazy‑load** les images hors‑écran (`loading="lazy"`).

### 📦 2.2 Chargement des polices
- Vous utilisez déjà `next/font/google`. Ajoutez `display: 'swap'` pour éviter le FOIT :
  ```ts
  const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
  const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
  ```
- Limitez les poids : choisissez uniquement les poids réellement utilisés.

### 🧹 2.3 Purge du CSS / Tailwind
- Si Tailwind est présent, activez la purge en production :
  ```js
  // tailwind.config.js
  module.exports = {
    content: ['./app/**/*.{js,ts,tsx,jsx}', './components/**/*.{js,ts,tsx,jsx}'],
    // …
  };
  ```
- Supprimez les classes inutilisées dans `globals.css`.

### ⚡ 2.4 Réduction du JavaScript
- **Dynamic import** des composants lourds (ex. : carrousels, cartes animées) :
  ```tsx
  const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });
  ```
- **Tree‑shaking** : vérifiez que vous n’importez pas tout le module `sonner` si vous n’utilisez que le toaster.
- **Minifier** le code (Next.js le fait déjà en prod, mais assurez‑vous que `next.config.js` a `compress: true`).

### 📡 2.5 En‑têtes HTTP & CDN
- Activez **gzip** et **brotli** sur le serveur (Vercel le fait automatiquement). Vérifiez les en‑têtes `Cache‑Control` : `public, max-age=31536000, immutable` pour les assets statiques.
- Utilisez le **CDN Vercel** pour servir les images et les fichiers JS/CSS.

### 🏗️ 2.6 Rendu côté serveur (SSR) vs génération statique (SSG)
- Les pages comme la page d’accueil et les pages d’information (`/osteopathie`, `/contact`) peuvent être **statiquement générées** :
  ```ts
  export const revalidate = 86400; // 24 h
  ```
- Cela élimine le temps de génération à la volée et améliore le LCP.

### 📐 2.7 Cumulative Layout Shift (CLS)
- Assurez‑vous que chaque image/iframe possède `width` et `height` ou utilise `aspect‑ratio`.
- Évitez les changements de `font‑size` ou de `margin` après le chargement initial.
- Utilisez `position: relative` + `aspect‑ratio` pour les blocs décoratifs qui se chargent tardivement.

### 🛠️ 2.8 Audits supplémentaires
- **Lighthouse** : lancez `npm run dev && npx next build && npx next start` puis `chrome://inspect` pour vérifier les métriques en production.
- **Web Vitals** : ajoutez le script `next/script` pour envoyer les métriques à Google Analytics ou à votre propre endpoint.

## 3️⃣ Plan d’action (ordre de priorité)
| Priorité | Action | Fichier(s) concerné(s) | Estimation temps |
|----------|--------|------------------------|------------------|
| **⚡️ Haute** | Remplacer toutes les balises `<img>` par `<Image>` (Next.js) | Tous les composants contenant des images (`WhoIsItFor.tsx`, pages, etc.) | 2‑3 h |
| **⚡️ Haute** | Ajouter `display: 'swap'` aux polices Google | `app/[locale]/layout.tsx` | 5 min |
| **⚡️ Haute** | Fixer `width`/`height` ou `aspect‑ratio` sur les images décoratives (CLS) | `WhoIsItFor.tsx` (déco background) | 30 min |
| **🟡 Moyenne** | Activer la purge Tailwind et vérifier le `tailwind.config.js` | `tailwind.config.js` (s’il existe) | 15 min |
| **🟡 Moyenne** | Dynamiser les composants lourds (Carousel, animations) | `components/...` | 1 h |
| **🟢 Basse** | Ajouter `revalidate` pour les pages statiques | `app/[locale]/page.tsx`, `app/[locale]/osteopathie/page.tsx` | 10 min |
| **🟢 Basse** | Configurer les en‑têtes de cache (Vercel) – généralement déjà géré | `vercel.json` (si présent) | 5 min |

## 4️⃣ Exemple de mise à jour rapide
```tsx
// app/[locale]/layout.tsx – ajout du display swap
const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
```
```tsx
// components/home/WhoIsItFor.tsx – utilisation de Next Image
import Image from 'next/image';
...
<Image
  src="/images/illustration.svg"
  alt="Illustration"
  width={400}
  height={300}
  className="object-cover rounded-lg"
  loading="lazy"
/>
```
```tsx
// Exemple de lazy‑load d’un composant lourd
import dynamic from 'next/dynamic';
const FancyCarousel = dynamic(() => import('@/components/FancyCarousel'), { ssr: false });
```

---
### 📌 Conclusion
En appliquant ces optimisations, vous devriez voir le **CLS** diminuer sensiblement, le **Speed Index** s’améliorer et conserver les excellents scores déjà obtenus sur **FCP**, **LCP**, **TBT** et **Performance**. Le site restera rapide, fluide et répondra aux exigences de Google PageSpeed Insights.

N’hésitez pas à me dire sur quelles parties vous souhaitez que je travaille en premier ! 🚀
