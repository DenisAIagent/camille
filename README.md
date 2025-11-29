# 🌿 Camille Labasse - Ostéopathe D.O.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)

> Site web professionnel pour le cabinet d'ostéopathie biodynamique de Camille Labasse à Lisbonne, Portugal.

🌐 **Production:** [osteopatiaemlisboa.com](https://osteopatiaemlisboa.com)  
🔗 **Preview:** [camille-alpha.vercel.app](https://camille-alpha.vercel.app)

---

## 📋 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [💻 Développement](#-développement)
- [🌍 Internationalisation](#-internationalisation)
- [📧 Backend & API](#-backend--api)
- [🎨 Design System](#-design-system)
- [🔒 Sécurité](#-sécurité)
- [📊 SEO & Performance](#-seo--performance)
- [🚢 Déploiement](#-déploiement)
- [📁 Structure du Projet](#-structure-du-projet)
- [🔧 Configuration](#-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Documentation](#-documentation)
- [👥 Équipe](#-équipe)

---

## ✨ Fonctionnalités

### Frontend
- ✅ **Next.js 15** avec App Router
- ✅ **TypeScript** strict mode
- ✅ **Tailwind CSS** pour le styling
- ✅ **Internationalisation** (FR/PT/EN) avec next-intl
- ✅ **Composants UI** avec shadcn/ui
- ✅ **Responsive Design** mobile-first
- ✅ **Animations** subtiles et performantes
- ✅ **Optimisation d'images** avec Next.js Image

### Backend
- ✅ **API Routes** Next.js serverless
- ✅ **Envoi d'emails** via Resend
- ✅ **Protection anti-spam** avec hCaptcha
- ✅ **Validation** côté serveur

### SEO & Performance
- ✅ **Métadonnées** dynamiques par page
- ✅ **OpenGraph** pour réseaux sociaux
- ✅ **Sitemap** automatique
- ✅ **Lighthouse Score**: 91-99/100
- ✅ **Core Web Vitals** optimisés

### Légal & Conformité
- ✅ **RGPD** compliant
- ✅ **CCPA/CPRA** compliant (Californie)
- ✅ **Pages légales** (Privacy, Legal)

---

## 🏗️ Architecture

### Stack Technique

```
Frontend:
├── Framework: Next.js 15 (React 19)
├── Language: TypeScript 5.x
├── Styling: Tailwind CSS 3.4
├── UI Components: shadcn/ui
└── i18n: next-intl

Backend:
├── Runtime: Node.js (Vercel Functions)
├── API Routes: Next.js App Router
├── Email Service: Resend
└── Captcha: hCaptcha

Hosting & Deployment:
├── Platform: Vercel
├── CDN: Vercel Edge Network
├── SSL: Let's Encrypt (auto)
└── DNS: Managed by registrar
```

### Schéma d'architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
└─────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)              │
└─────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────┐
│                Next.js Application                   │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │   Frontend (SSR) │  │  API Routes      │        │
│  │   - Pages        │  │  - /api/contact  │        │
│  │   - Components   │  │                  │        │
│  └──────────────────┘  └──────────────────┘        │
└─────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Resend     │  │   hCaptcha   │  │  Next-intl   │
│   (Emails)   │  │   (Captcha)  │  │    (i18n)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🚀 Installation

### Prérequis

- **Node.js**: >= 18.17.0
- **npm**: >= 9.0.0
- **Git**: Dernière version

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/DenisAIagent/camille.git
cd camille-osteopathe

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Configurer les variables (voir section Configuration)
nano .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

---

## 💻 Développement

### Scripts disponibles

```bash
# Développement (avec hot-reload)
npm run dev

# Build de production
npm run build

# Démarrer en mode production (après build)
npm start

# Linting
npm run lint

# Formattage du code
npm run format

# Type checking
npm run type-check
```

### Workflow de développement

1. Créer une branche depuis `main`
   ```bash
   git checkout -b feature/nom-de-la-feature
   ```

2. Développer et tester localement
   ```bash
   npm run dev
   ```

3. Vérifier le linting et le build
   ```bash
   npm run lint
   npm run build
   ```

4. Commit et push
   ```bash
   git add .
   git commit -m "feat: description de la feature"
   git push origin feature/nom-de-la-feature
   ```

5. Créer une Pull Request sur GitHub

### Conventions de commit

Suivre la spécification [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage, point-virgules manquants, etc.
refactor: Refactorisation du code
perf: Amélioration de performance
test: Ajout de tests
chore: Tâches de maintenance
```

---

## 🌍 Internationalisation

Le site supporte 3 langues :

- �� **Portugais** (défaut)
- �� **Français**
- 🇬🇧 **Anglais**

### Ajouter une traduction

1. Ouvrir `messages/{locale}.json`
2. Ajouter la clé de traduction
3. Utiliser dans les composants :

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

### Changer de langue

```tsx
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const router = useRouter();
const locale = useLocale();

// Changer vers le portugais
router.push('/pt');
```

---

## 📧 Backend & API

### API Routes

#### POST `/api/contact`

Envoie un email de contact.

**Request Body:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "message": "Bonjour, je souhaite prendre rendez-vous.",
  "captchaToken": "hcaptcha_token_here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message envoyé avec succès",
  "emailId": "email_id_from_resend"
}
```

**Response (Error):**
```json
{
  "error": "Invalid captcha"
}
```

**Status Codes:**
- `200`: Succès
- `400`: Données invalides
- `500`: Erreur serveur

### Configuration Email

L'envoi d'emails utilise [Resend](https://resend.com):

1. Créer un compte Resend
2. Obtenir une API key
3. Ajouter dans `.env.local`:

```env
RESEND_API_KEY=re_...
CONTACT_EMAIL=votre-email@exemple.com
```

Voir [BACKEND_CONFIG.md](./BACKEND_CONFIG.md) pour plus de détails.

---

## 🎨 Design System

### Palette de couleurs

**Inspirée des étangs Koi:**

```css
--primary: #EE6A22      /* Orange Koi */
--accent: #F2AF1D       /* Or Lumineux */
--secondary: #D3D6C3    /* Moon Mist */
--foreground: #6A6546   /* Kokoda */
--background: #FFFFFF   /* Blanc */
```

### Typographie

- **Sans-serif**: Outfit (Google Fonts)
- **Serif**: Playfair Display (titres)
- **Mono**: JetBrains Mono (code)

### Composants UI

Basés sur [shadcn/ui](https://ui.shadcn.com/):

```bash
# Ajouter un composant
npx shadcn-ui@latest add button
```

Composants disponibles dans `components/ui/`.

---

## 🔒 Sécurité

### Mesures implémentées

- ✅ **hCaptcha** sur formulaires
- ✅ **Validation serveur** stricte
- ✅ **Rate limiting** (via Vercel)
- ✅ **HTTPS** obligatoire
- ✅ **Secrets** via variables d'environnement
- ✅ **CSP Headers** (recommandé)

### Variables sensibles

⚠️ **Ne jamais commit:**
- `.env.local`
- `.env.production`
- Clés API
- Secrets

Les secrets doivent être dans Vercel Environment Variables.

---

## 📊 SEO & Performance

### Scores Lighthouse

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Performance | 91 | 99 |
| Accessibility | 95 | 96 |
| Best Practices | 100 | 100 |
| SEO | 92 | 92 |

### Optimisations

- ✅ Images WebP optimisées
- ✅ Lazy loading
- ✅ Code splitting automatique
- ✅ Prefetching des routes
- ✅ Compression Brotli/Gzip
- ✅ CDN Edge caching

### SEO Features

- Métadonnées dynamiques par page
- Sitemap XML automatique
- Robots.txt configuré
- Canonical URLs
- OpenGraph / Twitter Cards
- Schema.org markup (à venir)

---

## 🚢 Déploiement

### Vercel (Recommandé)

1. **Connecter le repository GitHub**
   - Aller sur [vercel.com/new](https://vercel.com/new)
   - Importer le repository
   - Configurer les variables d'environnement

2. **Variables d'environnement requises**
   ```
   RESEND_API_KEY=...
   HCAPTCHA_SECRET_KEY=...
   CONTACT_EMAIL=...
   NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
   ```

3. **Domaine personnalisé**
   - Settings → Domains
   - Ajouter `osteopatiaemlisboa.com`
   - Configurer DNS (voir [DOMAINE_CONFIG.md](./DOMAINE_CONFIG.md))

4. **Déploiement automatique**
   - Push sur `main` → Déploiement automatique

### Build manuel

```bash
npm run build
npm start
```

---

## 📁 Structure du Projet

```
camille-osteopathe/
├── app/
│   ├── [locale]/              # Pages avec routing i18n
│   │   ├── layout.tsx         # Layout racine
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── contact/
│   │   ├── osteopathie/
│   │   ├── trauma/
│   │   ├── legal/
│   │   └── privacy/
│   ├── api/                   # API Routes
│   │   └── contact/
│   │       └── route.ts
│   └── globals.css            # Styles globaux
├── components/
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/                  # Composants page accueil
│   ├── ui/                    # UI Components (shadcn)
│   └── contact/               # Composants contact
├── i18n/
│   ├── routing.ts             # Configuration i18n
│   └── request.ts
├── messages/                  # Fichiers de traduction
│   ├── fr.json
│   ├── pt.json
│   └── en.json
├── public/
│   └── images/
│       ├── photos/            # Photos du cabinet
│       └── opengraph-image.jpg
├── .env.example               # Template variables d'env
├── next.config.ts             # Configuration Next.js
├── tailwind.config.ts         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── package.json               # Dépendances
```

---

## 🔧 Configuration

### Variables d'environnement

Créer `.env.local` à la racine :

```env
# Email Service (Resend)
RESEND_API_KEY=re_...
CONTACT_EMAIL=contact@osteopatiaemlisboa.com

# Captcha (hCaptcha)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
HCAPTCHA_SECRET_KEY=...

# Analytics (optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...

# Site URL
NEXT_PUBLIC_SITE_URL=https://osteopatiaemlisboa.com
```

Voir [BACKEND_CONFIG.md](./BACKEND_CONFIG.md) pour obtenir les clés API.

---

## 🐛 Troubleshooting

### Le formulaire de contact ne fonctionne pas

**Problème:** Email non reçu

**Solutions:**
1. Vérifier que `RESEND_API_KEY` est configuré
2. Vérifier les logs Vercel (Functions → Logs)
3. Tester en mode développement (vérifier la console)
4. Vérifier que l'email `from` est autorisé dans Resend

### Erreur 404 sur `/contact`

**Problème:** Page non trouvée

**Solution:** Vérifier le middleware i18n
- L'URL correcte est `/fr/contact` (avec locale)
- Le middleware devrait rediriger `/contact` → `/fr/contact`

### Images ne s'affichent pas

**Problème:** Images cassées

**Solutions:**
1. Vérifier que les images sont dans `public/images/`
2. Utiliser le composant `next/image`
3. Vérifier les chemins (`/images/...` sans `public/`)

### Performance dégradée

**Solutions:**
1. Vérifier la taille des images (max 500KB)
2. Utiliser le format WebP
3. Activer le lazy loading
4. Vérifier les animations CSS (utiliser `will-change` avec parcimonie)

---

## 📚 Documentation

### Documentation Technique
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture détaillée
- [BACKEND_CONFIG.md](./BACKEND_CONFIG.md) - Configuration backend
- [DOMAINE_CONFIG.md](./DOMAINE_CONFIG.md) - Configuration DNS

### Documentation Projet
- [PLAN_DEVELOPPEMENT_DEVIS.md](./PLAN_DEVELOPPEMENT_DEVIS.md) - Plan & devis
- [AMELIORATIONS.md](./AMELIORATIONS.md) - Améliorations futures

### Ressources Externes
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Resend Docs](https://resend.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 👥 Équipe

**Développement:** Denis Adam  
**Design:** Denis Adam  
**Cliente:** Camille Labasse (Ostéopathe D.O.)

---

## 📄 License

Proprietary License - © 2025 Camille Labasse  
Tous droits réservés. Usage commercial interdit sans autorisation.

---

## 🙏 Remerciements

- [Vercel](https://vercel.com) pour l'hébergement
- [Resend](https://resend.com) pour le service d'email
- [shadcn](https://ui.shadcn.com/) pour les composants UI
- [hCaptcha](https://hcaptcha.com) pour la protection anti-spam

---

**Fait avec ❤️ à Lisbonne**
