# 📝 Guide de Contribution

Merci de votre intérêt pour contribuer à ce projet ! Ce document fournit les guidelines pour contribuer efficacement.

---

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Standards de Code](#standards-de-code)
- [Workflow Git](#workflow-git)
- [Pull Requests](#pull-requests)
- [Tests](#tests)
- [Documentation](#documentation)

---

## Code de Conduite

En participant à ce projet, vous acceptez de respecter les principes suivants :

- ✅ Être respectueux et professionnel
- ✅ Accepter les critiques constructives
- ✅ Se concentrer sur ce qui est meilleur pour le projet
- ✅ Faire preuve d'empathie envers les autres contributeurs

---

## Comment Contribuer

### 🐛 Signaler un Bug

1. Vérifier si le bug n'est pas déjà signalé dans les Issues
2. Créer une nouvelle Issue avec le template `Bug Report`
3. Inclure :
   - Description claire du problème
   - Steps to reproduce
   - Comportement attendu vs actuel
   - Screenshots si pertinent
   - Environnement (OS, navigateur, version)

### 💡 Proposer une Fonctionnalité

1. Créer une Issue avec le template `Feature Request`
2. Décrire :
   - Le problème que ça résout
   - La solution proposée
   - Les alternatives considérées
   - Impact sur l'existant

### 🔧 Soumettre une Modification

1. **Fork** le repository
2. **Créer une branche** depuis `main`
3. **Développer** votre modification
4. **Tester** localement
5. **Commit** avec des messages clairs
6. **Push** vers votre fork
7. **Créer une Pull Request**

---

## Standards de Code

### TypeScript

```typescript
// ✅ BON
interface UserData {
  name: string;
  email: string;
}

function sendEmail(data: UserData): Promise<void> {
  // ...
}

// ❌ MAUVAIS
function sendEmail(data: any) {
  // ...
}
```

**Règles:**
- Pas de `any` (sauf cas exceptionnels documentés)
- Typage explicite des paramètres et retours
- Interfaces pour les objets complexes
- Enums pour les valeurs fixes

### React / Next.js

```tsx
// ✅ BON - Composant fonctionnel typé
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}

// ❌ MAUVAIS - Props non typées
export default function Button({ label, onClick, variant }) {
  // ...
}
```

**Règles:**
- Composants fonctionnels (pas de classes)
- Props typées avec interface
- Valeurs par défaut explicites
- Hooks au top du composant

### CSS / Tailwind

```tsx
// ✅ BON - Classes Tailwind composables
<div className="flex items-center justify-between p-4 bg-primary text-white rounded-lg">
  <h1 className="text-2xl font-bold">Titre</h1>
</div>

// ❌ MAUVAIS - Inline styles (sauf cas particulier)
<div style={{ display: 'flex', padding: '16px' }}>
  // ...
</div>
```

**Règles:**
- Privilégier Tailwind CSS
- Éviter les styles inline
- Utiliser les classes utilitaires du `globals.css`
- Responsive mobile-first

### Naming Conventions

```
Fichiers:
- Composants: PascalCase (Button.tsx)
- Utils: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)

Variables:
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Components: PascalCase
- Types/Interfaces: PascalCase
```

### Structure de Fichier

```typescript
// 1. Imports externes
import { useState } from 'react';
import { useTranslations } from 'next-intl';

// 2. Imports internes
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

// 3. Types/Interfaces
interface ComponentProps {
  // ...
}

// 4. Composant
export default function Component({ ...props }: ComponentProps) {
  // 4a. Hooks
  const t = useTranslations();
  const [state, setState] = useState();

  // 4b. Functions
  const handleClick = () => {
    // ...
  };

  // 4c. Render
  return (
    // JSX
  );
}
```

---

## Workflow Git

### Branches

```
main              # Production (protégée)
└── feature/...   # Nouvelles fonctionnalités
└── fix/...       # Corrections de bugs
└── refactor/...  # Refactorisation
└── docs/...      # Documentation
```

**Nommage des branches:**
```bash
feature/contact-form-validation
fix/mobile-menu-overflow
refactor/api-error-handling
docs/update-readme
```

### Commits

Suivre la spécification [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[body optionnel]

[footer optionnel]
```

**Types:**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactorisation
- `perf`: Amélioration de performance
- `test`: Ajout/modification de tests
- `chore`: Tâches de maintenance

**Exemples:**

```bash
feat(contact): add email validation
fix(mobile): correct menu overflow on small screens
docs(readme): update installation instructions
refactor(api): simplify error handling logic
perf(images): optimize WebP compression
```

### Commandes Git

```bash
# Créer une branche
git checkout -b feature/nom-feature

# Commit
git add .
git commit -m "feat: description"

# Push
git push origin feature/nom-feature

# Mettre à jour depuis main
git checkout main
git pull
git checkout feature/nom-feature
git rebase main

# Squash commits avant PR (optionnel)
git rebase -i HEAD~3
```

---

## Pull Requests

### Checklist avant soumission

- [ ] Code testé localement (`npm run dev`)
- [ ] Build réussi (`npm run build`)
- [ ] Linting passé (`npm run lint`)
- [ ] Commits bien formatés
- [ ] Branch à jour avec `main`
- [ ] Description claire dans la PR
- [ ] Screenshots si changement UI

### Template de PR

```markdown
## Description
Brève description des changements.

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Changements
- Liste des modifications majeures
- ...

## Screenshots (si applicable)
![Before](url)
![After](url)

## Tests
Comment avez-vous testé ?

## Checklist
- [ ] Code testé localement
- [ ] Build réussi
- [ ] Linting passé
- [ ] Documentation mise à jour
```

### Review Process

1. **Soumission:** Créer la PR avec description complète
2. **Review:** Attendre l'approbation d'un mainteneur
3. **Corrections:** Appliquer les changements demandés
4. **Merge:** Merge par un mainteneur après approbation

---

## Tests

### Tests Manuels Obligatoires

Avant chaque PR, tester :

1. **Formulaire de contact**
   - Soumettre avec données valides
   - Tester la validation (champs vides, email invalide)
   - Vérifier hCaptcha
   - Vérifier les messages de succès/erreur

2. **Navigation**
   - Tester tous les liens
   - Vérifier changement de langue (FR/PT/EN)
   - Mobile menu (ouvrir/fermer)

3. **Responsive**
   - Mobile (< 640px)
   - Tablet (640-1024px)
   - Desktop (> 1024px)

4. **Navigateurs**
   - Chrome/Edge (dernière version)
   - Firefox (dernière version)
   - Safari (si Mac)

### Tests Automatisés (à venir)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## Documentation

### Code Comments

```typescript
// ✅ BON - Commentaire utile
/**
 * Sends a contact form email via Resend API
 * @param data - Contact form data
 * @returns Email ID from Resend
 * @throws Error if captcha validation fails
 */
async function sendContactEmail(data: ContactFormData): Promise<string> {
  // ...
}

// ❌ MAUVAIS - Commentaire évident
// Increment counter by 1
counter = counter + 1;
```

**Règles:**
- Commenter le "pourquoi", pas le "quoi"
- JSDoc pour les fonctions publiques
- TODO avec issue number si applicable

### README Updates

Si vous ajoutez une fonctionnalité majeure :
1. Mettre à jour `README.md`
2. Ajouter dans la section Fonctionnalités
3. Documenter la configuration si nécessaire
4. Ajouter des exemples d'usage

---

## Questions ?

- 📧 Envoyer un email à [votre-email]
- 💬 Ouvrir une Discussion GitHub
- 📝 Créer une Issue

---

**Merci de contribuer ! 🙏**
