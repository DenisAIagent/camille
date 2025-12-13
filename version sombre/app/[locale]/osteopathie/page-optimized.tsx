import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import FeatureBlockAdaptive from '@/components/ui/FeatureBlockAdaptive';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const _t = await getTranslations({ locale, namespace: 'OsteopathyPage' });

    const titles = {
        fr: 'Ostéopathe Lisbonne - Biodynamique & Fonctionnel | Camille Labasse',
        pt: 'Osteopata Lisboa - Biodinâmica & Funcional | Camille Labasse',
        en: 'Osteopath Lisbon - Biodynamic & Functional | Camille Labasse'
    };

    const descriptions = {
        fr: 'Cabinet d\'ostéopathie à Lisbonne (Avenida de Roma). Approche douce et biodynamique pour bébés, adultes et femmes enceintes. Traitement des douleurs, stress et troubles fonctionnels.',
        pt: 'Consultório de osteopatia em Lisboa (Avenida de Roma). Abordagem suave e biodinâmica para bebés, adultos e grávidas. Tratamento de dores, stress e distúrbios funcionais.',
        en: 'Osteopathy practice in Lisbon (Avenida de Roma). Gentle biodynamic approach for babies, adults and pregnant women. Treatment of pain, stress and functional disorders.'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
        keywords: locale === 'fr'
            ? 'ostéopathe Lisbonne, ostéopathie biodynamique, ostéopathie bébé Lisbonne, mal de dos, urgence ostéopathe, Camille Labasse, Avenida de Roma'
            : locale === 'pt'
                ? 'osteopata Lisboa, osteopatia biodinâmica, osteopatia bebé Lisboa, dor nas costas, urgência osteopata, Camille Labasse, Avenida de Roma'
                : 'osteopath Lisbon, biodynamic osteopathy, baby osteopath Lisbon, back pain, emergency osteopath, Camille Labasse, Avenida de Roma',
        openGraph: {
            title: titles[locale as keyof typeof titles] || titles.fr,
            description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
            url: `https://camille-osteopathe.com/${locale}/osteopathie`,
            siteName: 'Camille Labasse Ostéopathe',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: '/images/photos/opengraph-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Camille Labasse - Ostéopathie Biodynamique',
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
            canonical: `https://camille-osteopathe.com/${locale}/osteopathie`,
            languages: {
                'fr': 'https://camille-osteopathe.com/fr/osteopathie',
                'pt': 'https://camille-osteopathe.com/pt/osteopathie',
                'en': 'https://camille-osteopathe.com/en/osteopathie',
            },
        },
    };
}

export default async function OsteopathyPageOptimized({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'OsteopathyPage' });

    return (
        <div className="flex flex-col">
            {/* Schema.org MedicalSpecialty */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalSpecialty",
                        "name": "Ostéopathie Biodynamique & Fonctionnelle",
                        "description": "Approche thérapeutique manuelle douce pour rétablir l'équilibre du corps.",
                        "medicalSpecialty": "Osteopathic",
                        "availableService": {
                            "@type": "MedicalTherapy",
                            "name": "Consultation Ostéopathie"
                        }
                    })
                }}
            />

            {/* Hero Section optimisée avec lazy loading */}
            <section
                className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden"
                aria-label="Hero section"
            >
                {/* Image de fond optimisée */}
                <div className="absolute inset-0 z-0">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet="/images/photos/camille-45 - Grande.webp?w=768&q=75"
                        />
                        <source
                            media="(min-width: 769px)"
                            srcSet="/images/photos/camille-45 - Grande.webp?w=1920&q=85"
                        />
                        <img
                            src="/images/photos/camille-45 - Grande.jpeg"
                            alt="Camille Labasse - Cabinet d'ostéopathie"
                            className="w-full h-full object-cover"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
                </div>

                <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium mb-6 md:mb-8 text-foreground drop-shadow-lg animate-fade-in-up">
                        {t('h1')}
                    </h1>
                </div>
            </section>

            <main className="container mx-auto px-4 max-w-6xl pt-8 pb-16 md:pb-24">
                <div className="space-y-12 md:space-y-16 lg:space-y-20">
                    {/* Comprendre l'Ostéopathie - Premier bloc avec priorité */}
                    <FeatureBlockAdaptive
                        imageSrc="/images/photos/camille-22 - Grande.webp"
                        imageAlt="Comprendre l'ostéopathie"
                        title={t('h2_understand')}
                        description={t('text_understand')}
                        layout="image-right"
                        decorationPosition="top-right"
                        priority={true}
                    />

                    {/* Ostéopathie Fonctionnelle */}
                    <FeatureBlockAdaptive
                        imageSrc="/images/photos/camille-27 - Grande.webp"
                        imageAlt="Ostéopathie fonctionnelle"
                        title={t('h2_functional')}
                        description={t('text_functional')}
                        layout="image-left"
                        decorationPosition="bottom-left"
                        decorationDelay="1s"
                    />

                    {/* Pathologies Traitées */}
                    <FeatureBlockAdaptive
                        imageSrc="/images/photos/camille-28 - Grande.webp"
                        imageAlt="Pathologies traitées"
                        title={t('h2_pathologies')}
                        description={t('text_pathologies')}
                        layout="image-right"
                        decorationPosition="top-left"
                        decorationDelay="2s"
                    />

                    {/* Ostéopathie Biodynamique - Section mise en valeur */}
                    <section
                        className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl"
                        aria-labelledby="biodynamic-osteopathy"
                    >
                        {/* Background avec parallax effect léger */}
                        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
                            <picture>
                                <source
                                    type="image/webp"
                                    srcSet="/images/photos/camille-38 - Grande.webp"
                                />
                                <img
                                    src="/images/photos/camille-38 - Grande.jpeg"
                                    alt=""
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </picture>
                        </div>

                        <div className="relative z-10 p-6 md:p-12 lg:p-16 flex items-center justify-center min-h-[350px] md:min-h-[400px]">
                            <article className="max-w-4xl mx-auto text-center bg-card/95 dark:bg-card/90 backdrop-blur-md p-6 md:p-10 lg:p-12 rounded-xl lg:rounded-2xl shadow-lg border border-border/30">
                                <h2
                                    id="biodynamic-osteopathy"
                                    className="text-2xl md:text-3xl lg:text-4xl font-serif mb-6 md:mb-8 text-primary font-medium"
                                >
                                    {t('h2_bio')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
                                    {t('text_bio')}
                                </p>
                            </article>
                        </div>
                    </section>

                    {/* CTA Final optimisé */}
                    <section
                        className="text-center pt-4 md:pt-8"
                        aria-labelledby="cta-section"
                    >
                        <h3
                            id="cta-section"
                            className="text-xl md:text-2xl font-serif mb-4 md:mb-6 text-foreground"
                        >
                            {t('cta_question')}
                        </h3>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full gradient-warm text-white font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 tracking-wide focus-visible-ring"
                            aria-label={t('cta_button')}
                        >
                            {t('cta_button')}
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    );
}