import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const _t = await getTranslations({ locale, namespace: 'ContactPage' });

    const titles = {
        fr: 'Contact - Prendre Rendez-vous | Camille Labasse Ostéopathe',
        pt: 'Contacto - Marcar Consulta | Camille Labasse Osteopata',
        en: 'Contact - Book Appointment | Camille Labasse Osteopath'
    };

    const descriptions = {
        fr: 'Contactez Camille Labasse pour prendre rendez-vous. Cabinet d\'ostéopathie biodynamique à Lisbonne. Consultations 60€, séances trauma 60-100€. Tel: +351 930 505 939',
        pt: 'Contacte Camille Labasse para marcar consulta. Consultório de osteopatia biodinâmica em Lisboa. Consultas 60€, sessões trauma 60-100€. Tel: +351 930 505 939',
        en: 'Contact Camille Labasse to book an appointment. Biodynamic osteopathy practice in Lisbon. Consultations €60, trauma sessions €60-100. Tel: +351 930 505 939'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
        keywords: locale === 'fr'
            ? 'ostéopathe Lisbonne, contact ostéopathe, rendez-vous ostéopathie, Camille Labasse, Avenida de Roma, tarif ostéopathie, ostéopathe francophone Portugal'
            : locale === 'pt'
                ? 'osteopata Lisboa, contacto osteopata, marcar consulta osteopatia, Camille Labasse, Avenida de Roma, preço osteopatia, osteopata francês Portugal'
                : 'osteopath Lisbon, contact osteopath, book osteopathy appointment, Camille Labasse, Avenida de Roma, osteopathy price, French osteopath Portugal',
        openGraph: {
            title: titles[locale as keyof typeof titles] || titles.fr,
            description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
            url: `https://camille-osteopathe.com/${locale}/contact`,
            siteName: 'Camille Labasse Ostéopathe',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: '/images/photos/opengraph-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Camille Labasse Ostéopathe D.O - Cabinet Lisbonne',
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
            canonical: `https://camille-osteopathe.com/${locale}/contact`,
            languages: {
                'fr': 'https://camille-osteopathe.com/fr/contact',
                'pt': 'https://camille-osteopathe.com/pt/contact',
                'en': 'https://camille-osteopathe.com/en/contact',
            },
        },
    };
}

export default function ContactPage() {
    const t = useTranslations('ContactPage');

    return (
        <div className="flex flex-col gap-16 pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-12 text-center">{t('h1')}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Rates & Info */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-primary">{t('h2_rates')}</h2>
                            <div className="space-y-2">
                                <p className="text-lg text-foreground font-medium">{t('rate_consult')}</p>
                                <p className="text-muted-foreground">{t('rate_reduced')}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-primary">{t('h2_trauma_rates')}</h2>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>{t('trauma_social')}</li>
                                <li>{t('trauma_medium')}</li>
                                <li>{t('trauma_abundant')}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-primary">{t('h2_info')}</h2>

                            <div className="mb-6">
                                <h3 className="font-medium mb-2">{t('h3_address')}</h3>
                                <p className="text-muted-foreground">
                                    {t('address_line1')}<br />
                                    {t('address_line2')}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2 italic">{t('address_note')}</p>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">{t('h3_contact')}</h3>
                                <p className="text-muted-foreground">
                                    Tel: (00351) 930 505 939
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">{t('contact_phrase')}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-primary">{t('h2_cancellation')}</h2>
                            <p className="text-muted-foreground">{t('cancellation_policy')}</p>
                        </section>
                    </div>

                    {/* Right Column: Form & Map */}
                    <div className="space-y-12">
                        <section className="bg-card border rounded-xl p-8 shadow-sm">
                            <h2 className="text-2xl font-serif mb-6 text-center">{t('form_submit')}</h2>
                            <ContactForm />
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif mb-6 text-primary">{t('h3_address')}</h2>
                            <div className="aspect-video w-full rounded-xl overflow-hidden border shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.7836993866476!2d-9.148822123770277!3d38.722774756988294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337afac12609%3A0x7f1f71ef10b49b09!2sCamille%20Labasse%20Osteopata%20D.O!5e0!3m2!1sfr!2spt!4v1764194593653!5m2!1sfr!2spt"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
