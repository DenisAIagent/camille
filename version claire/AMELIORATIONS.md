# Améliorations SEO et UX Supplémentaires

## 🎯 SEO On-Page Avancé

### 1. Schema.org LocalBusiness Markup

Ajouter dans `components/layout/Footer.tsx` :

```tsx
export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("ContactPage");
  
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://votre-domaine.com",
            "name": "Camille Labasse Ostéopathe D.O",
            "image": "https://votre-domaine.com/social-preview.jpg",
            "url": "https://votre-domaine.com",
            "telephone": "+351930505939",
            "email": "camilleosteopatia@gmail.com",
            "priceRange": "50€-80€",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Rodrigues Sampaio n76, 1o apartamento",
              "addressLocality": "Lisboa",
              "postalCode": "1150-277",
              "addressCountry": "PT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "38.722774756988294",
              "longitude": "-9.148822123770277"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "sameAs": [
              "https://facebook.com/osteopatalisboa",
              "https://instagram.com/camilleosteopatalisboa"
            ]
          })
        }}
      />
      <footer className="bg-muted/50 border-t py-12 mt-12">
        {/* ... reste du footer */}
      </footer>
    </>
  );
}
```

### 2. Sitemap.xml Automatique

Créer `app/sitemap.ts` :

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://votre-domaine.com';
  const locales = ['fr', 'pt', 'en'];
  const pages = ['', 'osteopathie', 'trauma', 'contact'];

  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page ? `/${page}` : ''}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page ? `/${page}` : ''}`])
          ),
        },
      });
    });
  });

  return routes;
}
```

### 3. Robots.txt

Créer `app/robots.ts` :

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://votre-domaine.com/sitemap.xml',
  };
}
```

### 4. Métadonnées Root Layout

Ajouter dans `app/[locale]/layout.tsx` :

```tsx
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  
  return {
    metadataBase: new URL('https://votre-domaine.com'),
    title: {
      default: 'Camille Labasse - Ostéopathe D.O à Lisbonne',
      template: '%s | Camille Labasse Ostéopathe'
    },
    description: 'Cabinet d\'ostéopathie à Lisbonne. Camille Labasse, ostéopathe D.O certifiée, techniques douces et fonctionnelles.',
    keywords: ['ostéopathe', 'Lisbonne', 'Lisboa', 'osteopathy', 'osteopatia', 'Camille Labasse', 'trauma', 'biodynamique'],
    authors: [{name: 'Camille Labasse'}],
    creator: 'Camille Labasse',
    publisher: 'Camille Labasse',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'pt': '/pt',
        'en': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://votre-domaine.com',
      siteName: 'Camille Labasse Ostéopathe',
      images: [
        {
          url: '/social-preview.jpg',
          width: 1200,
          height: 630,
          alt: 'Camille Labasse Ostéopathe D.O Lisbonne',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Camille Labasse - Ostéopathe D.O à Lisbonne',
      description: 'Cabinet d\'ostéopathie à Lisbonne',
      images: ['/social-preview.jpg'],
    },
    verification: {
      google: 'votre-code-verification-google',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

### 5. Image Open Graph

Créer une image sociale `public/social-preview.jpg` :
- Dimensions : 1200x630px
- Contenu : Logo/Nom + "Ostéopathe D.O - Lisbonne"
- Design épuré avec palette koï

---

## 🎨 Améliorations UX

### 1. Scroll Smooth

Ajouter dans `app/globals.css` :

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  * {
    @apply border-border outline-ring/50;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
```

### 2. Animation d'Entrée des Sections

Créer `components/ui/FadeIn.tsx` :

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}
```

Utiliser dans les pages :

```tsx
<FadeIn>
  <section>...</section>
</FadeIn>

<FadeIn delay={100}>
  <section>...</section>
</FadeIn>
```

### 3. Loading States et Skeleton

Créer `app/[locale]/loading.tsx` :

```tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-muted rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 4. Indicateur de Page Active dans Navigation

Modifier `components/layout/Header.tsx` :

```tsx
"use client";

import { usePathname } from "@/i18n/routing";

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("osteopathy"), href: "/osteopathie" },
    { label: t("trauma"), href: "/trauma" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header>
      {/* ... */}
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              pathname === item.href
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

### 5. Bouton "Retour en Haut"

Créer `components/ui/BackToTop.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg bg-primary hover:bg-primary/90"
      aria-label="Retour en haut"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
```

Ajouter dans `app/[locale]/layout.tsx` :

```tsx
import BackToTop from "@/components/ui/BackToTop";

// Dans le return
<body>
  <NextIntlClientProvider messages={messages}>
    <Header locale={locale} />
    <main className="flex-1">{children}</main>
    <Footer locale={locale} />
    <BackToTop />
  </NextIntlClientProvider>
</body>
```

### 6. Toast Notifications pour le Formulaire

Installer :
```bash
npx shadcn@latest add toast
```

Modifier `components/contact/ContactForm.tsx` :

```tsx
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const { toast } = useToast();
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = `Contact from ${values.name}`;
    const body = `${values.message}\n\nFrom: ${values.name} (${values.email})`;
    
    // mailto
    window.location.href = `mailto:camilleosteopatia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Toast de confirmation
    toast({
      title: "Message envoyé",
      description: "Votre client email va s'ouvrir. Merci de votre intérêt !",
    });
  }
}
```

### 7. Mode Sombre (Dark Mode) - Optionnel

Créer `components/layout/ThemeToggle.tsx` :

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

Installer next-themes :
```bash
npm install next-themes
```

---

## 📊 Analytics et Tracking

### 1. Google Analytics 4

Créer `app/GoogleAnalytics.tsx` :

```tsx
import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}
```

Ajouter dans layout :
```tsx
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### 2. Microsoft Clarity (Heatmaps gratuits)

```tsx
<Script
  id="microsoft-clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "VOTRE_ID_CLARITY");
    `,
  }}
/>
```

---

## ♿ Accessibilité Avancée

### 1. Skip Navigation

Ajouter dans `components/layout/Header.tsx` :

```tsx
<header>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
  >
    Aller au contenu principal
  </a>
  {/* ... reste du header */}
</header>
```

Et dans layout :
```tsx
<main id="main-content" className="flex-1">
  {children}
</main>
```

### 2. Focus Visible amélioré

Dans `app/globals.css` :

```css
@layer base {
  *:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}
```

---

## 🚀 Performance

### 1. Lazy Loading Composants Lourds

```tsx
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded"></div>
});
```

### 2. Optimisation Images Google Maps

Remplacer iframe par image statique avec lien :

```tsx
<a href="https://maps.google.com/..." target="_blank" rel="noopener">
  <Image
    src="/map-preview.jpg"
    alt="Localisation cabinet"
    width={600}
    height={400}
    className="rounded-xl"
  />
</a>
```

### 3. Preload Fonts

Dans `app/[locale]/layout.tsx` :

```tsx
<head>
  <link
    rel="preload"
    href="/fonts/outfit.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

---

## 📝 Checklist Déploiement

- [ ] Remplacer `https://votre-domaine.com` par le vrai domaine
- [ ] Ajouter Google Analytics ID
- [ ] Générer et ajouter social-preview.jpg (1200x630)
- [ ] Tester sur mobile réel (iOS + Android)
- [ ] Tester accessibilité (WAVE, axe DevTools)
- [ ] Lighthouse : viser score >90 partout
- [ ] Tester les 3 langues
- [ ] Vérifier formulaire de contact
- [ ] Tester Google Maps iframe
- [ ] Configurer domaine custom
- [ ] SSL certificate (auto avec Vercel)
- [ ] Soumettre sitemap à Google Search Console
- [ ] Configurer redirections (www → non-www ou inverse)

---

**Ces améliorations sont optionnelles mais fortement recommandées pour un site professionnel optimal** ✨
