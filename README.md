# Site Vitrine - Camille Labasse Ostéopathe

Site web professionnel pour Camille Labasse, Ostéopathe D.O à Lisbonne.

## 🎨 Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: lucide-react
- **i18n**: next-intl (FR / PT / EN)
- **Validation**: Zod + react-hook-form
- **Fonts**: Outfit (sans-serif) + Playfair Display (serif)

## 🎨 Palette de Couleurs

Inspirée d'un bassin de koï :

- **Or lumineux**: `#F2AF1D` - Accents, CTA, hover
- **Orange koï**: `#EE6A22` - Primaire (boutons, liens)
- **Gris clair "Moon Mist"**: `#D3D6C3` - Secondaire, bordures
- **Gris profond "Kokoda"**: `#5A5C4F` - Texte principal
- **Blanc / nuances naturelles**: Fonds

## 📁 Structure du Projet

```
camille-osteopathe/
├── app/
│   ├── [locale]/              # Routes i18n
│   │   ├── page.tsx           # Accueil
│   │   ├── osteopathie/       # Page Ostéopathie
│   │   ├── trauma/            # Page Trauma
│   │   ├── contact/           # Page Contact
│   │   ├── layout.tsx         # Layout avec Header/Footer
│   │   └── not-found.tsx      # Page 404
│   └── globals.css            # Styles globaux
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx         # Navigation + LanguageSwitcher
│   │   ├── Footer.tsx         # Footer
│   │   └── LanguageSwitcher.tsx
│   └── contact/
│       └── ContactForm.tsx    # Formulaire de contact
├── messages/
│   ├── fr.json               # Traductions françaises
│   ├── pt.json               # Traductions portugaises
│   └── en.json               # Traductions anglaises
├── i18n/
│   ├── request.ts            # Config next-intl
│   └── routing.ts            # Navigation i18n
└── middleware.ts              # Middleware next-intl

```

## 🌍 Multilingue

Le site gère 3 langues : Français (défaut), Portugais, Anglais.

### Ajouter/Modifier des traductions

1. Ouvrir le fichier de langue dans `messages/` (fr.json, pt.json, en.json)
2. Modifier les clés de traduction
3. Sauvegarder - les changements sont immédiats

Exemple de structure :
```json
{
  "Navigation": {
    "home": "Accueil",
    "osteopathy": "L'Ostéopathie",
    ...
  },
  "HomePage": {
    "h1": "Ostéopathe à Lisbonne – Camille Labasse, D.O",
    ...
  }
}
```

Le sélecteur de langue est dans le Header (icône globe).

## 🚀 Installation et Lancement

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Accéder au site
# http://localhost:3000
```

Le site démarre automatiquement en français. Changez la langue via le sélecteur.

## 📄 Pages et Routes

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Présentation, pour qui, pourquoi consulter |
| Ostéopathie | `/osteopathie` | Définition, indications, parcours |
| Trauma | `/trauma` | Ostéopathie biodynamique et trauma |
| Contact | `/contact` | Tarifs, formulaire, carte Google Maps |

Routes localisées : `/{locale}/...` (ex: `/fr`, `/pt`, `/en`)

## 🎯 SEO

### Optimisations implémentées

- **Meta tags** : Title, description, keywords par page
- **Open Graph** : Partage social optimisé
- **Structure sémantique** : H1-H6 hiérarchisés selon le cahier des charges
- **Schema.org** (à ajouter) : LocalBusiness markup recommandé
- **Sitemap** (à ajouter) : Génération automatique
- **Robots.txt** (à ajouter)

### Amélioration SEO suggérée

Ajouter dans `app/[locale]/layout.tsx` :

```tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://votre-domaine.com'),
    alternates: {
      canonical: '/',
      languages: {
        'fr': '/fr',
        'pt': '/pt',
        'en': '/en',
      },
    },
  };
}
```

Ajouter Schema.org LocalBusiness dans le Footer :

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Camille Labasse Ostéopathe D.O",
  "image": "URL_LOGO",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Rodrigues Sampaio n76, 1o apartamento",
    "addressLocality": "Lisboa",
    "addressCountry": "PT"
  },
  "telephone": "+351930505939",
  "email": "camilleosteopatia@gmail.com"
}
</script>
```

## 🎨 Design

- **Mobile-first** : Responsive sur tous écrans
- **Accessibilité** : ARIA labels, contrastes conformes
- **Animations** : Transitions douces sur hover
- **Typographie** : Hiérarchie claire, espacement généreux
- **Border-radius** : 0.75rem (angles arrondis)
- **Ombres** : Douces sur cartes et composants

## 📝 Formulaire de Contact

Validation via Zod, soumission par `mailto:` (ouvre le client email).

Pour un backend réel, remplacer dans `components/contact/ContactForm.tsx` :

```tsx
function onSubmit(values) {
  // Envoyer à une API
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
```

## 🗺️ Google Maps

L'iframe est intégrée dans `/contact` avec l'adresse du cabinet.

## 🔧 Build de Production

```bash
npm run build
npm run start
```

## 📦 Deployment

Compatible avec :
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS Amplify**
- Tout hébergeur supportant Node.js

Variables d'environnement recommandées :
```
# Optionnel : URL du site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## 🎨 Personnalisation

### Modifier les couleurs

Éditer `app/globals.css` - section `:root` :

```css
:root {
  --primary: #EE6A22;
  --accent: #F2AF1D;
  ...
}
```

### Ajouter un composant shadcn/ui

```bash
npx shadcn@latest add [nom-composant]
```

## 📞 Contact

Camille Labasse  
Ostéopathe D.O  
Tel: (00351) 930 505 939  
Email: camilleosteopatia@gmail.com

---

**Développé avec Next.js, TypeScript, Tailwind CSS et shadcn/ui**
