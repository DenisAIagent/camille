import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'OsteopathyPage' });

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
                    url: 'https://camille-osteopathe.com/images/photos/camille-22%20-%20Grande.jpeg',
                    width: 1200,
                    height: 630,
                    alt: 'Ostéopathie Biodynamique & Fonctionnelle - Camille Labasse',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[locale as keyof typeof titles] || titles.fr,
            description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
            images: ['https://camille-osteopathe.com/images/photos/camille-22%20-%20Grande.jpeg'],
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

export default function OsteopathyPage() {
    const t = useTranslations('OsteopathyPage');

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

            {/* Hero Section avec image */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden parallax-container">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/images/photos/camille-45%20-%20Grande.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
                </div>

                <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground drop-shadow-lg animate-fade-in-up mb-24">
                        {t('h1')}
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto drop-shadow mt-24">
                        Le soin d'ostéopathie, en plus d'aider à résoudre le symptôme et sa cause, régule le système nerveux et recharge profondément l'organisme.
                    </p>
                </div>
            </section>

            {/* Section 1 : Comprendre l'Ostéopathie */}
            <section className="pt-12 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
                        {/* Texte à gauche */}
                        <div className="order-2 md:order-1">
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_understand')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_understand')}
                                </p>
                            </div>
                        </div>
                        {/* Image à droite */}
                        <div className="order-1 md:order-2 relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-22 - Grande.webp"
                                    alt="Comprendre l'ostéopathie"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float"></div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 : Ostéopathie Fonctionnelle */}
            <section className="py-20 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
                        {/* Image à gauche */}
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-27 - Grande.webp"
                                    alt="Ostéopathie fonctionnelle"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -top-6 -left-6 w-36 h-36 bg-primary/20 rounded-full blur-3xl animate-float"></div>
                        </div>
                        {/* Texte à droite */}
                        <div>
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_functional')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_functional')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 : Pathologies */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-6xl mx-auto">
                        {/* Texte à gauche */}
                        <div className="flex items-center">
                            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth aspect-[4/3] flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                                    {t('h2_pathologies')}
                                </h2>
                                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_pathologies')}
                                </p>
                            </div>
                        </div>
                        {/* Image à droite */}
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth aspect-[4/3]">
                                <Image
                                    src="/images/photos/camille-28 - Grande.webp"
                                    alt="Pathologies traitées"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={90}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Biodynamique - Mise en avant */}
            <section className="py-20 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth w-full">
                            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6 text-primary">{t('h2_bio')}</h2>
                            <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line text-center">
                                {t('text_bio')}
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
                        backgroundImage: 'url(/images/photos/camille-38%20-%20Grande.jpeg)',
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