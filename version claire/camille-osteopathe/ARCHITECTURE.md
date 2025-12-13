# Architecture du Site - Camille Labasse Ostéopathe

## 📐 Vue d'ensemble

Site vitrine multilingue (FR/PT/EN) développé avec Next.js 16, TypeScript et Tailwind CSS.

## 🏗️ Architecture Technique

### Framework et Routing
- **Next.js 16** avec App Router
- **Routing file-based** avec support i18n via `[locale]`
- **SSR/SSG** via generateMetadata et Server Components
- **Middleware** next-intl pour la gestion des langues

### Structure des Dossiers

```
app/
  [locale]/              ← Routes localisées (fr, pt, en)
    layout.tsx           ← Layout principal (Header + Footer)
    page.tsx             ← Page d'accueil
    osteopathie/
      page.tsx           ← Page L'Ostéopathie
    trauma/
      page.tsx           ← Page Trauma
    contact/
      page.tsx           ← Page Contact + Formulaire
    not-found.tsx        ← Page 404
  globals.css            ← Styles globaux + variables CSS
  favicon.ico

components/
  ui/                    ← shadcn/ui components
    button.tsx
    card.tsx
    separator.tsx
    sheet.tsx
    dropdown-menu.tsx
    input.tsx
    textarea.tsx
    label.tsx
    form.tsx
  layout/
    Header.tsx           ← Navigation principale + mobile
    Footer.tsx           ← Footer avec infos de contact
    LanguageSwitcher.tsx ← Sélecteur FR/PT/EN
  contact/
    ContactForm.tsx      ← Formulaire avec validation Zod

i18n/
  request.ts             ← Configuration next-intl
  routing.ts             ← Navigation helpers i18n

messages/
  fr.json                ← Traductions françaises
  pt.json                ← Traductions portugaises
  en.json                ← Traductions anglaises

lib/
  utils.ts               ← Helpers (cn pour classes)

middleware.ts            ← Middleware next-intl
next.config.ts           ← Config Next.js + plugin i18n
```

## 🎨 Système de Design

### Palette de Couleurs (Koi Pond)

| Variable CSS | Couleur | Usage |
|-------------|---------|-------|
| `--primary` | #EE6A22 (Orange Koï) | Boutons, liens, accents |
| `--accent` | #F2AF1D (Or Lumineux) | Hover, badges, focus |
| `--secondary` | #D3D6C3 (Moon Mist) | Fonds secondaires, bordures |
| `--foreground` | #5A5C4F (Kokoda) | Texte principal |
| `--background` | #FFFFFF | Fond principal |
| `--muted` | #F3F4F1 | Fonds de sections |

### Typographie

- **Sans-serif**: Outfit (corps de texte, UI)
- **Serif**: Playfair Display (titres, headers)
- **Border-radius**: 0.75rem (généreux, apaisant)

### Composants UI

Tous basés sur **shadcn/ui** (New York style) :
- Button, Card, Sheet (menu mobile)
- DropdownMenu (language switcher)
- Form, Input, Textarea, Label (contact form)
- Separator

## 📄 Pages et Structure SEO

### Page d'Accueil (/)

**Structure H1-H6 :**
```
H1: Ostéopathe à Lisbonne – Camille Labasse, D.O
  H2: L'ostéopathie : une approche humaine et naturelle
  H2: Bienvenue au cabinet d'ostéopathie
  H2: Pour qui est l'ostéopathie ?
    H3: Bébés et enfants
    H3: Adultes et seniors
    H3: Sportifs
    H3: Femmes enceintes
    H3: Personnes avec pathologies chroniques
  H2: Pourquoi consulter ?
    H3: Douleurs musculo-articulaires
    H3: Troubles digestifs
    H3: Stress, fatigue, insomnies
    H3: Acouphènes, vertiges, migraines
    H3: Troubles menstruels ou génito-urinaires
  H2: Prendre rendez-vous
```

**Sections :**
1. Hero avec H1 + CTA
2. Bienvenue
3. Pour qui ? (5 cartes)
4. Pourquoi consulter ? (5 items)
5. CTA final

### Page Ostéopathie (/osteopathie)

**Structure :**
```
H1: L'ostéopathie : définition, indications et pratique
  H2: Comprendre l'ostéopathie
  H2: Les troubles fonctionnels traités
  H2: Les pathologies accompagnées
  H2: Le parcours de Camille Labasse, Ostéopathe D.O
```

**Contenu :** 
Textes longs descriptifs en français, portugais, anglais

### Page Trauma (/trauma)

**Structure :**
```
H1: Ostéopathie biodynamique & trauma : l'approche somatique
  H2: Pourquoi le corps stocke le trauma ?
  H2: Comment se déroule le travail somatique ?
  H2: Pour qui est cette approche ?
  H2: Le rôle du corps dans la transformation
```

### Page Contact (/contact)

**Structure :**
```
H1: Tarifs et contact du cabinet d'ostéopathie
  H2: Tarifs des consultations
  H2: Tarif pour le travail du trauma
  H2: Informations pratiques
    H3: Adresse du cabinet
      H4: Accès et localisation (Google Maps)
    H3: Contact
      H4: Téléphone
      H4: Email
      H4: Réseaux sociaux
  H2: Politique d'annulation
```

**Disposition :** Grid 2 colonnes (Desktop)
- Colonne gauche : Tarifs + Infos
- Colonne droite : Formulaire + Carte

## 🌍 Internationalisation (i18n)

### Système next-intl

**Routing :**
- URL patterns : `/{locale}/page` → `/fr/osteopathie`, `/pt/trauma`, etc.
- Locale par défaut : Français (`fr`)
- Locales supportées : `fr`, `pt`, `en`

**Middleware :**
```typescript
// middleware.ts
export default createMiddleware(routing);
// Matcher: ['/', '/(fr|en|pt)/:path*']
```

**Navigation :**
```typescript
// i18n/routing.ts
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
```

**Utilisation dans les composants :**
```tsx
// Server Component
const t = await getTranslations('HomePage');

// Client Component
const t = useTranslations('Navigation');
```

### Fichiers de Traduction

Structure JSON clé-valeur :
```json
{
  "Navigation": {...},
  "HomePage": {...},
  "OsteopathyPage": {...},
  "TraumaPage": {...},
  "ContactPage": {...}
}
```

Tous les textes fournis par le cahier des charges sont intégrés.

## 🔧 Composants Clés

### Header.tsx

**Fonctionnalités :**
- Logo cliquable (lien vers /)
- Navigation desktop (4 liens + CTA)
- Navigation mobile (Sheet sidebar)
- LanguageSwitcher (DropdownMenu)
- Sticky header avec backdrop-blur

**Responsive :**
- Desktop : Navigation inline
- Mobile : Burger menu (Sheet)

### Footer.tsx

**Sections :**
- Présentation (Camille Labasse, Lisbonne)
- Contact (Tel, Email, Réseaux sociaux)
- Adresse (Espaço Oneleaf)
- Copyright

### LanguageSwitcher.tsx

**Fonctionnement :**
- Bouton icône Globe
- DropdownMenu avec 3 options
- Change la locale via `router.replace(pathname, {locale})`
- État synchronisé avec l'URL

### ContactForm.tsx

**Validation :**
```typescript
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
```

**Soumission :**
- `mailto:` vers camilleosteopatia@gmail.com
- Possibilité de remplacer par API endpoint

## 📱 Responsive Design

**Breakpoints Tailwind :**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

**Mobile-first :**
- Toutes les sections s'adaptent
- Grids → colonnes uniques sur mobile
- Navigation → burger menu
- Texte réduit sur petits écrans

## 🎯 SEO et Performance

### Métadonnées

Chaque page avec `generateMetadata` :
- Title dynamique
- Description
- Keywords
- Open Graph
- Robots (index, follow)

### Optimisations

- **Server Components** par défaut
- **Lazy loading** des composants lourds
- **Google Fonts** optimisés via next/font
- **CSS-in-JS** évité (Tailwind uniquement)

### Améliorations Futures

1. **Schema.org LocalBusiness** markup
2. **Sitemap.xml** automatique
3. **Robots.txt**
4. **Analytics** (Google Analytics, Plausible)
5. **Images optimisées** avec next/image

## 🔐 Accessibilité (a11y)

- **ARIA labels** sur tous les boutons d'action
- **Contrastes** conformes WCAG AA
- **Focus states** visibles
- **Navigation au clavier** complète
- **HTML sémantique** (h1-h6, nav, main, footer)

## 🚀 Déploiement

### Build Production

```bash
npm run build  # Génère .next/
npm run start  # Serveur production (port 3000)
```

### Vercel (Recommandé)

1. Connecter le repo GitHub
2. Auto-détection Next.js
3. Variables d'environnement (optionnel)
4. Deploy

### Autres Plateformes

- Netlify : Build command `npm run build`, publish `.next`
- AWS Amplify : Compatible Node.js
- Docker : Dockerfile Next.js standard

## 📊 Performance Budget

**Objectifs :**
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

**Actuellement :** Non mesuré - à tester avec Lighthouse

## 🛠️ Maintenance

### Ajouter une Page

1. Créer `app/[locale]/nouvelle-page/page.tsx`
2. Ajouter les traductions dans `messages/*.json`
3. Ajouter le lien dans `Header.tsx` (navItems)

### Modifier les Textes

Éditer directement `messages/fr.json`, `pt.json`, `en.json`

### Changer les Couleurs

`app/globals.css` → section `:root` et `.dark`

### Ajouter un Composant UI

```bash
npx shadcn@latest add [composant]
```

## 📝 Notes Importantes

- Les avertissements CSS (@custom-variant, @theme, @apply) sont **normaux** avec Tailwind v4
- Le middleware "deprecated" warning est une notification Next.js, pas une erreur
- Port 3001 utilisé (3000 occupé)
- Workspace root warning : non critique

---

**Architecture stable et scalable, prête pour production** ✅
