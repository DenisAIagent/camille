# 🌐 Guide de Connexion du Domaine Personnalisé

## Domaine Final: `osteopatiaemlisboa.com`

Ce guide explique comment connecter le domaine personnalisé à la plateforme d'hébergement une fois le projet validé.

---

## ✅ Prérequis

- Domaine `osteopatiaemlisboa.com` déjà acheté ✓
- Accès au registrar (GoDaddy, OVH, Namecheap, etc.)
- Projet déployé sur la plateforme d'hébergement

---

## 📋 Étapes de Configuration

### 1. Ajouter le domaine dans la plateforme d'hébergement

1. Se connecter au dashboard de la plateforme d'hébergement
2. Sélectionner le projet **camille-osteopathe**
3. Aller dans **Settings** → **Domains** (ou section équivalente)
4. Cliquer sur **Add Domain**
5. Entrer `osteopatiaemlisboa.com`
6. La plateforme va demander de vérifier la propriété du domaine

### 2. Configurer les DNS chez le Registrar

La plateforme d'hébergement vous donnera les enregistrements DNS à ajouter. Voici les valeurs typiques (à adapter selon les instructions de votre plateforme) :

#### Option A: Domaine racine (`osteopatiaemlisboa.com`)

**Type A Record:**
```
Type: A
Name: @ (ou laisser vide)
Value: 76.76.21.21
TTL: 3600
```

**Type AAAA Record (IPv6, optionnel):**
```
Type: AAAA
Name: @
Value: 2606:4700:4400::6812:2c15
TTL: 3600
```

#### Option B: Avec www (`www.osteopatiaemlisboa.com`)

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Redirection www → non-www (ou inverse):**
La plateforme d'hébergement gère automatiquement la redirection entre `www` et non-www une fois configuré (ou à configurer selon les options disponibles).

---

### 3. Vérification

1. Attendre la propagation DNS (5 min à 48h, généralement 15-30 min)
2. Vérifier sur [DNS Checker](https://dnschecker.org/)
3. Tester `https://osteopatiaemlisboa.com`
4. Vérifier le certificat SSL (automatique avec la plateforme d'hébergement)

---

## 🔧 Configuration Recommandée

### Redirection conseillée:
- **`www.osteopatiaemlisboa.com` → `osteopatiaemlisboa.com`** (sans www)
- Raison: URLs plus courtes, meilleur pour le SEO

### SSL/HTTPS:
✅ Automatique avec la plateforme d'hébergement (Let's Encrypt)
✅ Renouvellement automatique
✅ Force HTTPS par défaut

---

## 📝 Modifications Code Post-Connexion

Une fois le domaine connecté, je devrai mettre à jour:

### 1. `app/[locale]/layout.tsx`
```typescript
metadataBase: new URL('https://osteopatiaemlisboa.com'),
```

### 2. Toutes les pages avec métadonnées
- `app/[locale]/page.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/osteopathie/page.tsx`
- `app/[locale]/trauma/page.tsx`

### 3. Variables d'environnement
```
NEXT_PUBLIC_SITE_URL=https://osteopatiaemlisboa.com
```

### 4. Template email
Footer avec le bon domaine dans `app/api/contact/route.ts`

---

## 🚨 Common Issues

### "Domain not verified"
**Solution:** Vérifier que les DNS sont bien configurés avec `nslookup osteopatiaemlisboa.com`

### "SSL Certificate Error"
**Solution:** Attendre 5-10 minutes, la plateforme d'hébergement génère automatiquement le certificat

### "DNS not propagating"
**Solution:** 
- Vider le cache DNS: `ipconfig /flushdns` (Windows) ou `sudo dscacheutil -flushcache` (Mac)
- Utiliser un DNS public (8.8.8.8 Google)
- Patienter jusqu'à 24-48h dans le pire des cas

---

## 📊 Checklist Post-Déploiement

- [ ] Domaine accessible via HTTPS
- [ ] Redirection www → non-www fonctionnelle
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Toutes les pages chargent correctement
- [ ] Formulaire de contact fonctionne
- [ ] Images s'affichent
- [ ] Changement de langue fonctionne (FR/PT/EN)
- [ ] Meta tags OpenGraph correctes (test Facebook Debugger)
- [ ] Google Search Console configuré
- [ ] Google Analytics configuré (si souhaité)

---

## 🎯 Timeline Estimée

| Étape | Durée |
|-------|-------|
| Ajout domaine | 2 min |
| Configuration DNS chez registrar | 5 min |
| Propagation DNS | 15 min - 48h |
| Génération SSL automatique | 5-10 min |
| Modifications code + redéploiement | 10 min |
| Tests finaux | 15 min |
| **TOTAL** | **~1h** (+ temps propagation DNS) |

---

## 💡 Recommandations

1. **Faire la migration un vendredi soir** (moins de trafic le weekend si problème)
2. **Garder l'ancienne URL active** pendant 1 semaine en parallèle si possible
3. **Tester le formulaire de contact** en premier après migration
4. **Soumettre le nouveau domaine à Google Search Console** dès qu'il est live

---

## 📞 Support

En cas de problème lors de la connexion du domaine:
- Consulter la documentation de votre plateforme d'hébergement pour la configuration des domaines
- Contacter le support de votre plateforme via le dashboard
