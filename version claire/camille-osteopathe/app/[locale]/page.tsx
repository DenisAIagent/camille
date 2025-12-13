import type { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
// import FeatureBlock from '@/components/ui/FeatureBlock';
import LightboxGallery from '@/components/ui/LightboxGallery';
import { Button } from '@/components/ui/button';
import WhoIsItFor from '@/components/home/WhoIsItFor';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: 'HomePage' });

  const titles = {
    fr: 'Ostéopathe Lisbonne | Camille Labasse - Cabinet Avenida de Roma',
    pt: 'Osteopata Lisboa | Camille Labasse - Consultório Avenida de Roma',
    en: 'Osteopath Lisbon | Camille Labasse - Avenida de Roma Practice'
  };

  const descriptions = {
    fr: 'Camille Labasse, Ostéopathe D.O. à Lisbonne (Avenida de Roma). Ostéopathie biodynamique, pédiatrique et traitement des traumatismes. Prenez rendez-vous en ligne.',
    pt: 'Camille Labasse, Osteopata D.O. em Lisboa (Avenida de Roma). Osteopatia biodinâmica, pediátrica e tratamento de traumas. Marque a sua consulta online.',
    en: 'Camille Labasse, Osteopath D.O. in Lisbon (Avenida de Roma). Biodynamic osteopathy, pediatric care and trauma treatment. Book your appointment online.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.fr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
    keywords: locale === 'fr'
      ? 'ostéopathe Lisbonne, ostéopathe français Lisbonne, ostéopathie biodynamique, urgence ostéopathe, Camille Labasse, Avenida de Roma'
      : locale === 'pt'
        ? 'osteopata Lisboa, osteopata francês Lisboa, osteopatia biodinâmica, urgência osteopata, Camille Labasse, Avenida de Roma'
        : 'osteopath Lisbon, french osteopath Lisbon, biodynamic osteopathy, emergency osteopath, Camille Labasse, Avenida de Roma',
    authors: [{ name: 'Camille Labasse' }],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.fr,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
      type: 'website',
      locale: locale,
      alternateLocale: ['fr', 'pt', 'en'].filter(l => l !== locale),
      images: [
        {
          url: '/images/photos/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Camille Labasse - Ostéopathe Lisbonne',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.fr,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
      images: ['/images/photos/opengraph-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://camille-osteopathe.com/${locale}`,
      languages: {
        'fr': 'https://camille-osteopathe.com/fr',
        'pt': 'https://camille-osteopathe.com/pt',
        'en': 'https://camille-osteopathe.com/en',
      },
    },
  };
}

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col">
      {/* Schema.org LocalBusiness / Physician */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": "Camille Labasse Ostéopathe",
            "image": "https://camille-osteopathe.com/images/photos/camille-24%20-%20Grande.webp",
            "@id": "https://camille-osteopathe.com",
            "url": "https://camille-osteopathe.com",
            "telephone": "+351912345678", // À remplacer par le vrai numéro si disponible
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenida de Roma",
              "addressLocality": "Lisboa",
              "postalCode": "1000-000", // À ajuster
              "addressCountry": "PT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.7436, // Coordonnées approx Av de Roma
              "longitude": -9.1436
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "19:00"
            },
            "sameAs": [
              "https://www.instagram.com/camille_osteopathe", // Exemple
              "https://www.linkedin.com/in/camille-labasse" // Exemple
            ],
            "priceRange": "$$"
          })
        }}
      />

      {/* Hero Section - Parallax avec image de fond */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden parallax-container pb-16">
        {/* Background Image avec parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/photos/camille-01%20-%20Grande.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight mb-8 text-foreground drop-shadow-lg">
              {t('h1')}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto mb-12 drop-shadow">
              {t('intro')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center w-full px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="gradient-warm hover:shadow-glow text-white rounded-full px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg h-auto transition-smooth hover-scale shadow-premium w-full sm:w-auto whitespace-normal text-center leading-tight"
              >
                <Link href="/contact">{t('h2_book')}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-[#6a6546] text-[#6a6546] hover:bg-[#6a6546] hover:text-white rounded-full px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg h-auto transition-smooth hover-scale shadow-premium w-full sm:w-auto whitespace-normal text-center leading-tight"
              >
                <Link href="/osteopathie">{t('h2_osteopathy')}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-float"></div>
          </div>
        </div>
      </section>

      {/* Section À propos avec photo */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Photo professionnelle */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth">
                <Image
                  src="/images/photos/camille-24 - Grande.webp"
                  alt="Camille Labasse - Ostéopathe"
                  width={800}
                  height={1200}
                  quality={90}
                  priority
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Texte de bienvenue */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gradient">
                {t('h2_welcome')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('welcome')}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 h-auto border-2 border-primary/30 hover:border-primary transition-smooth animated-underline flex items-center justify-center"
                >
                  <Link href="/osteopathie" className="flex items-center">En savoir plus sur l&apos;ostéopathie</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Who is it for? - Interactive with SEO content */}
      <WhoIsItFor />

      {/* Why Consult? - Redesign moderne */}
      <section className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gradient">{t('h2_why')}</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Des solutions pour vos maux du quotidien</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              'why_muscle',
              'why_digestive',
              'why_stress',
              'why_tinnitus',
              'why_women'
            ].map((key, index) => (
              <div
                key={key}
                className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-8 shadow-sm hover:shadow-premium transition-smooth"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-lg text-foreground leading-relaxed block">{t(key)}</span>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 shimmer pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie visuelle */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gradient">Un cadre apaisant</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Mon cabinet à Lisbonne</p>

          <LightboxGallery
            images={[
              'camille-04 - Grande.webp',
              'camille-06 - Grande.webp',
              'camille-07 - Grande.webp',
              'camille-09 - Grande.webp',
              'camille-22 - Grande.webp',
              'camille-27 - Grande.webp',
              'camille-28 - Grande.webp',
              'camille-38 - Grande.webp'
            ]}
          />
        </div>
      </section>

      {/* CTA Final - Premium */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/photos/camille-50%20-%20Grande.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-foreground/90"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-background">
            Prêt à prendre soin de vous ?
          </h2>
          <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto">
            Prenez rendez-vous dès maintenant pour une consultation personnalisée
          </p>
          <Button
            asChild
            size="lg"
            className="gradient-warm hover:shadow-glow text-white rounded-full px-16 py-8 text-xl h-auto transition-smooth hover-scale shadow-premium"
          >
            <Link href="/contact">{t('h2_book')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
