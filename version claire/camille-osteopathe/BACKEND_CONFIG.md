# 🔧 Configuration Backend - Guide de Démarrage

## Variables d'Environnement Requises

Pour faire fonctionner le backend du site (API Contact), vous devez configurer les variables d'environnement suivantes dans votre plateforme d'hébergement ou dans votre fichier `.env.local` (en développement).

### 1. Service d'Email (Resend) - OBLIGATOIRE

```env
RESEND_API_KEY=re_votre_clé_api_ici
CONTACT_EMAIL=votre-email@exemple.com
```

**Comment obtenir ces clés :**
1. Se créer un compte gratuit sur [Resend](https://resend.com)
2. Aller dans **API Keys** et créer une nouvelle clé
3. Copier la clé et la coller dans `RESEND_API_KEY`
4. Mettre votre email professionnel dans `CONTACT_EMAIL`

**Note :** Le plan gratuit Resend offre 3000 emails/mois, largement suffisant pour un site vitrine.

### 2. Protection Anti-Spam (hCaptcha) - OBLIGATOIRE

```env
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
HCAPTCHA_SECRET_KEY=0x0000000000000000000000000000000000000000
```

**Comment obtenir ces clés :**
1. Se créer un compte gratuit sur [hCaptcha](https://dashboard.hcaptcha.com/)
2. Créer un nouveau site
3. Copier la **Site Key** dans `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
4. Copier la **Secret Key** dans `HCAPTCHA_SECRET_KEY`

### 3. Analytics (Optionnel)

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Pour Google Analytics 4.

---

## Configuration dans la plateforme d'hébergement

1. Aller dans votre projet sur la plateforme d'hébergement
2. **Settings** → **Environment Variables** (ou section équivalente)
3. Ajouter chaque variable une par une
4. Choisir l'environnement (Production, Preview, Development)
5. **Save** et **Redéployer** le site

---

## Test en Local

Créer un fichier `.env.local` à la racine du projet :

```bash
# .env.local
RESEND_API_KEY=re_...
CONTACT_EMAIL=votre-email@exemple.com
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
HCAPTCHA_SECRET_KEY=...
```

Puis lancer le serveur :

```bash
npm run dev
```

---

## Vérification du Bon Fonctionnement

1. Aller sur `http://localhost:3000/fr/contact` (ou votre site déployé)
2. Remplir le formulaire
3. Vérifier que vous recevez l'email à l'adresse configurée dans `CONTACT_EMAIL`

Si la clé Resend n'est pas configurée, le formulaire fonctionnera en "mode développement" (les soumissions seront loguées dans la console mais pas envoyées par email).

---

## Template Email

Le backend envoie un email HTML professionnel avec :
- Header gradientarme (couleurs de la charte)
- Informations de l'expéditeur bien visibles
- Bouton "Répondre par email"
- Footer avec les coordonnées du cabinet

Le template est responsive et s'affiche parfaitement sur tous les clients email (Gmail, Outlook, Apple Mail, etc.).

---

## Sécurité

✅ Validation des champs côté serveur  
✅ Protection anti-spam via hCaptcha  
✅ Validation d'email avec regex  
✅ Gestion d'erreur robuste  
✅ Logs sécurisés (pas de données sensibles)

---

## Support

En cas de problème, vérifier :
1. Les clés API sont bien actives
2. Le domaine est autorisé dans hCaptcha
3. Les logs dans la plateforme d'hébergement (section Logs du dashboard)
