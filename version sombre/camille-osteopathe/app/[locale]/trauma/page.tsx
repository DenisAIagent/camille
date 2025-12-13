import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

            {/* Section 1 : Comment le corps stocke le trauma */}
            <section className="pt-12 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
                        {/* Image à gauche */}
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-53 - Grande.jpeg"
                                    alt="Comment le corps stocke le trauma"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
                        </div>
                        {/* Texte à droite */}
                        <div>
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_why_body')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_intro')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 : Comment se déroule le travail somatique */}
            <section className="py-20 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
                        {/* Texte à gauche */}
                        <div className="order-2 md:order-1">
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_how')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_work')}
                                </p>
                            </div>
                        </div>
                        {/* Image à droite */}
                        <div className="order-1 md:order-2 relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-06 - Grande.webp"
                                    alt="Travail somatique et ostéopathie"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 : Pour qui est cette approche */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-6xl mx-auto">
                        {/* Image à gauche */}
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-09 - Grande.webp"
                                    alt="Pour qui l'ostéopathie trauma"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                        </div>
                        {/* Texte à droite */}
                        <div className="flex items-center">
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_who_for')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_who')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Le rôle du corps - Mise en avant */}
            <section className="py-20 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth w-full">
                            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6 text-primary">{t('h2_role')}</h2>
                            <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line text-center">
                                {t('text_role')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/images/photos/camille-04 - Grande.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="absolute inset-0 bg-background/90"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
                        {t('cta_question')}
                    </h2>
                    <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
                        Prenez rendez-vous dès maintenant pour une consultation personnalisée
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="gradient-warm hover:shadow-glow text-white rounded-full px-16 py-8 text-xl h-auto transition-smooth hover-scale shadow-premium"
                    >
                        <Link href="/contact">{t('cta_button')}</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}