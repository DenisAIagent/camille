# Guide d'Installation

## Configuration requise

### Système
- **OS** : Windows 10+, macOS 10.15+, ou Linux
- **Node.js** : Version 18.17.0 ou supérieure
- **npm** : Version 9.0.0 ou supérieure
- **RAM** : Minimum 4GB (8GB recommandé)
- **Espace disque** : 500MB minimum

### Navigateurs supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Installation étape par étape

### 1. Installer Node.js

#### Windows
1. Télécharger depuis [nodejs.org](https://nodejs.org/)
2. Exécuter l'installateur
3. Vérifier l'installation :
```bash
node --version
npm --version
```

#### macOS
```bash
# Avec Homebrew
brew install node

# Ou télécharger depuis nodejs.org
```

#### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs
```

### 2. Cloner le projet

```bash
# Avec HTTPS
git clone https://github.com/[votre-repo]/camille-labasse.git

# Avec SSH
git clone git@github.com:[votre-repo]/camille-labasse.git

# Naviguer dans le dossier
cd camille-labasse
```

### 3. Installer les dépendances

```bash
# Installation standard
npm install

# Si problèmes de permissions (Linux/macOS)
sudo npm install --unsafe-perm

# Installation propre (supprime node_modules et package-lock.json)
rm -rf node_modules package-lock.json
npm install
```

### 4. Configuration des variables d'environnement

#### Créer le fichier .env.local
```bash
cp .env.example .env.local
```

#### Configurer Resend (emails)
1. Créer un compte sur [resend.com](https://resend.com)
2. Générer une API key
3. Ajouter à `.env.local` :
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=votre-email@exemple.com
```

#### Variables complètes
```env
# Resend API
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=contact@exemple.com

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=351912345678

# Google Maps (optionnel)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxxxxxxx

# Analytics (optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. Lancer le serveur de développement

```bash
# Mode développement
npm run dev

# Le site est accessible sur :
# http://localhost:3000
```

## Résolution de problèmes

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
PORT=3001 npm run dev

# Ou tuer le processus sur le port 3000
# Linux/macOS
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [numero_pid] /F
```

### Erreurs de dépendances
```bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problèmes de permissions (Linux/macOS)
```bash
# Changer le propriétaire npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Module not found
```bash
# Vérifier que toutes les dépendances sont installées
npm install

# Si le problème persiste
rm -rf .next
npm run dev
```

## Vérification de l'installation

### Tests de base
1. **Page d'accueil** : http://localhost:3000
2. **Changement de langue** : Cliquer sur le sélecteur de langue
3. **Formulaire de contact** : Tester l'envoi (nécessite Resend configuré)
4. **Navigation** : Vérifier tous les liens

### Commandes de vérification
```bash
# Vérifier la syntaxe TypeScript
npm run type-check

# Vérifier le linting
npm run lint

# Build de test
npm run build
```

## Configuration IDE recommandée

### VS Code
Extensions recommandées :
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript React code snippets

### Settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Support

Pour toute question d'installation, consulter :
- La documentation principale : [README.md](../README.md)
- Le guide de déploiement : [DEPLOYMENT.md](./DEPLOYMENT.md)
- Les issues GitHub du projet