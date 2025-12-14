# Guide de Déploiement

## Déploiement sur Vercel (Recommandé)

### Prérequis
- Compte GitHub avec le code du projet
- Compte Vercel (gratuit)
- Variables d'environnement configurées

### Étapes de déploiement

#### 1. Connexion Vercel-GitHub

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer le repository GitHub

#### 2. Configuration du projet

```yaml
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 3. Variables d'environnement

Dans Vercel Dashboard > Settings > Environment Variables :

```env
# Production
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=contact@exemple.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_WHATSAPP_NUMBER=351912345678

# Optionnel
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 4. Domaines personnalisés

1. Settings > Domains
2. Add Domain
3. Entrer votre domaine : `exemple.com`
4. Configurer DNS :

```dns
# Enregistrements A
A     @     76.76.21.21
A     www   76.76.21.21

# Ou CNAME (recommandé)
CNAME    @      cname.vercel-dns.com
CNAME    www    cname.vercel-dns.com
```

#### 5. Déploiement automatique

- **Production** : Push sur `main` → Déploiement automatique
- **Preview** : Pull Request → URL de preview automatique

### Commandes Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Connexion
vercel login

# Déploiement manuel
vercel

# Déploiement production
vercel --prod

# Variables d'environnement
vercel env add RESEND_API_KEY
vercel env pull .env.local
```

## Déploiement sur autres plateformes

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway

```bash
# Installation
npm install -g @railway/cli

# Connexion
railway login

# Déploiement
railway up
```

Variables dans Railway Dashboard :
- Ajouter toutes les variables d'environnement
- Définir `PORT=3000`

### DigitalOcean App Platform

1. Créer une nouvelle App
2. Connecter GitHub
3. Configuration :
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: 3000

## Build de production local

### Préparation

```bash
# Nettoyer les builds précédents
rm -rf .next

# Installer les dépendances de production
npm ci --production

# Build
npm run build
```

### Lancement

```bash
# Mode production
npm start

# Avec PM2
pm2 start npm --name "camille-site" -- start
pm2 save
pm2 startup
```

### Configuration Nginx (reverse proxy)

```nginx
server {
    listen 80;
    server_name exemple.com www.exemple.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Configuration SSL

### Avec Vercel
SSL automatique avec Let's Encrypt

### Avec Certbot (serveur personnel)

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtenir certificat
sudo certbot --nginx -d exemple.com -d www.exemple.com

# Renouvellement automatique
sudo certbot renew --dry-run
```

## Optimisations de production

### Variables d'environnement de production

```env
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Configuration Next.js

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['votre-domaine.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### Headers de sécurité

```javascript
// next.config.js
async headers() {
  return [{
    source: '/:path*',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      }
    ]
  }]
}
```

## Monitoring et maintenance

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Logs et debugging

```bash
# Logs Vercel
vercel logs

# Logs PM2
pm2 logs camille-site

# Monitoring PM2
pm2 monit
```

### Sauvegardes

```bash
# Backup de la base de données (si applicable)
pg_dump database_name > backup.sql

# Backup des fichiers
tar -czf backup.tar.gz ./public/uploads

# Sync avec S3
aws s3 sync ./public/uploads s3://bucket-name
```

## Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Build de production sans erreurs
- [ ] Tests fonctionnels passés
- [ ] SSL configuré
- [ ] DNS configuré
- [ ] Emails testés
- [ ] Analytics configuré
- [ ] Backup configuré
- [ ] Monitoring activé
- [ ] Documentation à jour

## Rollback

### Sur Vercel

```bash
# Lister les déploiements
vercel ls

# Promouvoir un déploiement précédent
vercel promote [deployment-url]
```

### Avec Git

```bash
# Revenir à un commit précédent
git revert HEAD
git push origin main

# Ou reset hard (attention!)
git reset --hard [commit-hash]
git push --force origin main
```

## Support

- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
- Status des services : [vercel.com/status](https://vercel.com/status)