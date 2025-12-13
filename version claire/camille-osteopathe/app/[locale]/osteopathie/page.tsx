import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import FeatureBlock from '@/components/ui/FeatureBlock';

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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-8 text-foreground drop-shadow-lg animate-fade-in-up">
                        {t('h1')}
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-6xl py-24">
                <div className="space-y-24">
                    {/* Comprendre l'Ostéopathie */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-22 - Grande.webp"
                        imageAlt="Comprendre l'ostéopathie"
                        title={t('h2_understand')}
                        description={t('text_understand')}
                        layout="image-right"
                        decorationPosition="top-right"
                    />

                    {/* Ostéopathie Fonctionnelle */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-27 - Grande.webp"
                        imageAlt="Ostéopathie fonctionnelle"
                        title={t('h2_functional')}
                        description={t('text_functional')}
                        layout="image-left"
                        decorationPosition="bottom-left"
                        decorationDelay="1s"
                    />

                    {/* Pathologies Traitées */}
                    <FeatureBlock
                        imageSrc="/images/photos/camille-28 - Grande.webp"
                        imageAlt="Pathologies traitées"
                        title={t('h2_pathologies')}
                        description={t('text_pathologies')}
                        layout="image-right"
                        decorationPosition="top-left"
                        decorationDelay="2s"
                    />

                    {/* Ostéopathie Biodynamique - Highlighted */}
                    <section className="relative overflow-hidden">
                        <div
                            className="absolute inset-0 z-0 opacity-10"
                            style={{
                                backgroundImage: 'url(/images/photos/camille-38%20-%20Grande.jpeg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className="relative z-10 gradient-subtle p-12 rounded-3xl shadow-glow">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-serif mb-8 text-primary">{t('h2_bio')}</h2>
                                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {t('text_bio')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Final */}
                    <section className="text-center py-12">
                        <h3 className="text-2xl font-serif mb-6 text-foreground">Besoin d'une consultation ?</h3>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full gradient-warm text-white font-bold text-lg shadow-lg hover:shadow-glow transition-smooth hover-scale tracking-wide"
                        >
                            Prendre rendez-vous
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
