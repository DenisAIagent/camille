# Site Web - Camille Labasse Ostéopathe

Site web professionnel multilingue pour Camille Labasse, ostéopathe à Lisbonne, Portugal.

## Description

Application web moderne développée avec Next.js 15, offrant une présentation professionnelle des services d'ostéopathie avec support multilingue (Portugais, Français, Anglais).

## Fonctionnalités principales

- **Site multilingue** : PT, FR, EN avec détection automatique
- **Design responsive** : Optimisé pour tous les appareils
- **Galerie photos** : Présentation visuelle du cabinet
- **Page FAQ** : Questions fréquentes détaillées
- **Formulaire de contact** : Avec envoi d'emails automatisé
- **Intégrations** : WhatsApp, Google Maps
- **Optimisation SEO** : Métadonnées multilingues, sitemap automatique
- **Performance** : Score PageSpeed 90+

## Technologies utilisées

- **Framework** : Next.js 16.0.10
- **UI** : React 18, TypeScript
- **Styles** : Tailwind CSS
- **Internationalisation** : next-intl
- **Emails** : Resend API
- **Déploiement** : Vercel

## Structure du projet

```
.
├── app/                    # Application Next.js
│   ├── [locale]/          # Pages par langue
│   ├── api/               # Routes API
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── contact/          # Formulaire de contact
│   ├── home/             # Composants page d'accueil
│   ├── layout/           # Header, Footer
│   └── ui/               # Composants UI réutilisables
├── messages/             # Traductions JSON
│   ├── fr.json
│   ├── pt.json
│   └── en.json
├── public/               # Assets statiques
│   └── images/           # Images optimisées
└── lib/                  # Utilitaires
```

## Installation

### Prérequis

- Node.js 18+ et npm
- Compte Resend pour l'envoi d'emails
- Compte Vercel pour le déploiement (optionnel)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone [url-du-repo]
cd [nom-du-dossier]
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Copier le fichier `.env.example` vers `.env.local` :
```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos clés :
```env
# API Resend pour l'envoi d'emails
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email de réception des formulaires
CONTACT_EMAIL=votre-email@exemple.com

# URL du site (production)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com

# WhatsApp (format international)
NEXT_PUBLIC_WHATSAPP_NUMBER=351930505939
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible à l'adresse : `http://localhost:3000`

## Scripts disponibles

```bash
npm run dev        # Développement avec hot-reload
npm run build      # Build de production
npm run start      # Lancer la production locale
npm run lint       # Vérification du code
```

## Configuration

### Personnalisation du contenu

1. **Traductions** : Modifier les fichiers dans `messages/`
2. **Images** : Remplacer les images dans `public/images/`
3. **Métadonnées SEO** : Éditer dans `app/[locale]/layout.tsx`
4. **Informations de contact** : Mettre à jour dans les fichiers de traduction

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `RESEND_API_KEY` | Clé API Resend | `re_123...` |
| `CONTACT_EMAIL` | Email de réception | `contact@exemple.com` |
| `NEXT_PUBLIC_SITE_URL` | URL de production | `https://exemple.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp | `351930505939` |

## Déploiement

### Déploiement sur Vercel (recommandé)

1. Créer un compte sur [Vercel](https://vercel.com)
2. Importer le projet depuis GitHub
3. Configurer les variables d'environnement
4. Déployer

### Déploiement manuel

1. **Build de production**
```bash
npm run build
```

2. **Lancer le serveur**
```bash
npm run start
```

Le serveur écoute sur le port 3000 par défaut.

## Maintenance

### Mise à jour des dépendances

```bash
npm update              # Mises à jour mineures
npm update --save-dev   # Dev dependencies
```

### Monitoring

- Analytics : Google Analytics 4 intégré
- Performance : Vercel Analytics (si déployé sur Vercel)
- Erreurs : Console du navigateur et logs serveur

## Support

Pour toute question technique concernant ce site, veuillez contacter le développeur.

## Licence

© 2024 Camille Labasse - Tous droits réservés

---

Développé par MDMC OÜ | [camille2.vercel.app](https://camille2.vercel.app)