import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import FeatureBlock from '@/components/ui/FeatureBlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const _t = await getTranslations({ locale, namespace: 'TraumaPage' });

    const titles = {
        fr: 'Thérapie Trauma & Ostéopathie Somatique Lisbonne | Camille Labasse',
        pt: 'Terapia de Trauma & Osteopatia Somática Lisboa | Camille Labasse',
        en: 'Trauma Therapy & Somatic Osteopathy Lisbon | Camille Labasse'
    };

    const descriptions = {
        fr: 'Spécialiste en libération des traumatismes à Lisbonne. Approche somatique et biodynamique pour traiter stress post-traumatique, anxiété et chocs émotionnels. Cabinet à Avenida de Roma.',
        pt: 'Especialista em libertação de traumas em Lisboa. Abordagem somática e biodinâmica para tratar stress pós-traumático, ansiedade e choques emocionais. Consultório na Avenida de Roma.',
        en: 'Trauma release specialist in Lisbon. Somatic and biodynamic approach to treat post-traumatic stress, anxiety and emotional shocks. Practice at Avenida de Roma.'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
        keywords: locale === 'fr'
            ? 'thérapie trauma Lisbonne, ostéopathie somatique, somatic experiencing, stress post-traumatique, guérison émotionnelle, Camille Labasse, Avenida de Roma'
            : locale === 'pt'
                ? 'terapia trauma Lisboa, osteopatia somática, somatic experiencing, stress pós-traumático, cura emocional, Camille Labasse, Avenida de Roma'
                : 'trauma therapy Lisbon, somatic osteopathy, somatic experiencing, post-traumatic stress, emotional healing, Camille Labasse, Avenida de Roma',
        openGraph: {
            title: titles[locale as keyof typeof titles] || titles.fr,
            description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
            url: `https://camille-osteopathe.com/${locale}/trauma`,
            siteName: 'Camille Labasse Ostéopathe',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: '/images/photos/opengraph-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Camille Labasse - Traitement des Traumatismes',
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
            canonical: `https://camille-osteopathe.com/${locale}/trauma`,
            languages: {
                'fr': 'https://camille-osteopathe.com/fr/trauma',
                'pt': 'https://camille-osteopathe.com/pt/trauma',
                'en': 'https://camille-osteopathe.com/en/trauma',
            },
        },
    };
}

export default async function TraumaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TraumaPage' });

    return (
        <div className="flex flex-col">
            {/* Schema.org MedicalWebPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalWebPage",
                        "name": "Thérapie Trauma & Ostéopathie Somatique",
                        "description": "Approche spécialisée pour la libération des traumatismes corporels et émotionnels.",
                        "medicalAudience": "Patients souffrant de stress post-traumatique, anxiété, chocs émotionnels",
                        "specialty": "Trauma Therapy"
                    })
                }}
            />

            {/* Hero Section avec image */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden parallax-container">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/images/photos/camille-51%20-%20Grande.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
                </div>

                <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-8 text-foreground drop-shadow-lg animate-fade-in-up">
                        {t('h1')}
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-6xl pt-6 pb-24">
                <div className="space-y-16 md:space-y-20">
                    {/* Comment le corps stocke le trauma */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-53 - Grande.jpeg"
                        imageAlt="Comment le corps stocke le trauma"
                        title={t('h2_why_body')}
                        description={t('text_intro')}
                        layout="image-left"
                        decorationPosition="bottom-left"
                    />

                    {/* Comment se déroule le travail somatique */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-06 - Grande.webp"
                        imageAlt="Travail somatique et ostéopathie"
                        title={t('h2_how')}
                        description={t('text_work')}
                        layout="image-right"
                        decorationPosition="top-right"
                        decorationDelay="1s"
                    />

                    {/* Pour qui est cette approche ? */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-09 - Grande.webp"
                        imageAlt="Pour qui l&apos;ostéopathie trauma"
                        title={t('h2_who_for')}
                        description={t('text_who')}
                        layout="image-left"
                        decorationPosition="bottom-left"
                        decorationDelay="2s"
                    />

                    {/* L'approche de Camille - Section Highlight */}
                    <section className="relative overflow-hidden">
                        <div
                            className="absolute inset-0 z-0 opacity-10"
                            style={{
                                backgroundImage: 'url(/images/photos/camille-04 - Grande.webp)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className="relative z-10 gradient-subtle p-12 rounded-3xl shadow-glow">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-8 text-primary">{t('h2_role')}</h2>
                                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_role')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Final */}
                    <section className="text-center pt-0 pb-12">
                        <h3 className="text-2xl font-serif mb-6 text-foreground">{t('cta_question')}</h3>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full gradient-warm text-white font-bold text-lg shadow-lg hover:shadow-glow transition-smooth hover-scale tracking-wide"
                        >
                            {t('cta_button')}
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}
