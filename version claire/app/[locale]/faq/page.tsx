import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const _t = await getTranslations({ locale, namespace: 'FAQPage' });

    const titles = {
        fr: 'FAQ - Questions Fréquentes sur l\'Ostéopathie | Camille Labasse',
        pt: 'FAQ - Perguntas Frequentes sobre Osteopatia | Camille Labasse',
        en: 'FAQ - Frequently Asked Questions about Osteopathy | Camille Labasse'
    };

    const descriptions = {
        fr: 'Réponses aux questions fréquentes sur l\'ostéopathie à Lisbonne : tarifs, durée, remboursement, efficacité. Cabinet Camille Labasse.',
        pt: 'Respostas às perguntas frequentes sobre osteopatia em Lisboa: preços, duração, reembolso, eficácia. Consultório Camille Labasse.',
        en: 'Answers to frequently asked questions about osteopathy in Lisbon: rates, duration, reimbursement, effectiveness. Camille Labasse practice.'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
        keywords: locale === 'fr'
            ? 'FAQ ostéopathie, questions ostéopathe, tarif ostéopathe Lisbonne, remboursement ostéopathie, nombre de séances'
            : locale === 'pt'
                ? 'FAQ osteopatia, perguntas osteopata, preço osteopata Lisboa, reembolso osteopatia, número de sessões'
                : 'FAQ osteopathy, osteopath questions, osteopath rates Lisbon, osteopathy reimbursement, number of sessions',
        openGraph: {
            title: titles[locale as keyof typeof titles] || titles.fr,
            description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
            url: `https://camille-osteopathe.com/${locale}/faq`,
            siteName: 'Camille Labasse Ostéopathe',
            locale: locale,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `https://camille-osteopathe.com/${locale}/faq`,
            languages: {
                'fr': 'https://camille-osteopathe.com/fr/faq',
                'pt': 'https://camille-osteopathe.com/pt/faq',
                'en': 'https://camille-osteopathe.com/en/faq',
            },
        },
    };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FAQPage' });

    const faqs = [
        { id: 'q1', question: t('q1'), answer: t.raw('a1') },
        { id: 'q2', question: t('q2'), answer: t.raw('a2') },
        { id: 'q3', question: t('q3'), answer: t.raw('a3') },
        { id: 'q4', question: t('q4'), answer: t.raw('a4') },
        { id: 'q5', question: t('q5'), answer: t.raw('a5') },
        { id: 'q6', question: t('q6'), answer: t.raw('a6') },
        { id: 'q7', question: t('q7'), answer: t.raw('a7') },
        { id: 'q8', question: t('q8'), answer: t.raw('a8') },
    ];

    return (
        <div className="flex flex-col">
            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-muted/30 to-background py-16 md:py-24">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-gradient animate-fade-in-up">
                        {t('h1')}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <div className="container mx-auto px-4 max-w-4xl py-12 pb-16">
                <div className="space-y-8">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-card border-2 border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-smooth"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <h2 className="text-2xl font-serif text-primary mb-4 flex items-start gap-3">
                                <span className="text-accent font-bold">{index + 1}.</span>
                                <span>{faq.question}</span>
                            </h2>
                            <div
                                className="text-lg text-foreground/80 leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <section className="text-center mt-16">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border-2 border-primary/10">
                        <h2 className="text-3xl font-serif mb-4 text-foreground">{t('cta_question')}</h2>
                        <p className="text-lg text-muted-foreground mb-8">{t('cta_subtitle')}</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full gradient-warm text-white font-bold text-lg shadow-lg hover:shadow-glow transition-smooth hover-scale tracking-wide"
                        >
                            {t('cta_button')}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
