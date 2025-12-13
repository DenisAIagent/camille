"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer({ locale }: { locale: string }) {
    const t = useTranslations("ContactPage");

    return (
        <footer className="relative bg-gradient-to-b from-muted/30 to-muted/50 border-t border-primary/10 py-16 mt-24 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-medium mb-4 text-gradient">Camille Labasse</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Ostéopathe D.O<br />
                            Ostéopathie biodynamique<br />
                            Lisbonne, Portugal
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg mb-4 text-primary">{t("h3_contact")}</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                <a href="tel:+351930505939" className="hover:text-primary transition-smooth">
                                    Tel: (00351) 930 505 939
                                </a>
                            </p>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <a
                                href="https://facebook.com/osteopatalisboa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-smooth hover-scale"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://instagram.com/camilleosteopatalisboa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-smooth hover-scale"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg mb-4 text-primary">{t("h3_address")}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            <span>
                                {t("address_line1")}<br />
                                {t("address_line2")}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="border-t border-primary/10 pt-8 mb-8">
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Accueil
                        </Link>
                        <Link href="/osteopathie" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Ostéopathie
                        </Link>
                        <Link href="/trauma" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Trauma
                        </Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Contact
                        </Link>
                        <span className="text-muted-foreground/30">|</span>
                        <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Confidentialité
                        </Link>
                        <Link href="/legal" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            Mentions légales
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Camille Labasse. Tous droits réservés.</p>
                </div>
            </div>

            {/* Schema.org LocalBusiness / Physician */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Physician",
                        "name": "Camille Labasse Ostéopathe D.O",
                        "alternateName": "Camille Osteopatia Lisboa",
                        "url": `https://camille-osteopathe.com/${locale}`,
                        "logo": "https://camille-osteopathe.com/logo.png",
                        "image": "https://camille-osteopathe.com/images/photos/camille-01%20-%20Grande.jpeg",
                        "description": locale === 'fr'
                            ? "Cabinet d'ostéopathie biodynamique à Lisbonne. Consultations pour adultes, enfants, femmes enceintes et sportifs."
                            : locale === 'pt'
                                ? "Consultório de osteopatia biodinâmica em Lisboa. Consultas para adultos, crianças, grávidas e desportistas."
                                : "Biodynamic osteopathy practice in Lisbon. Consultations for adults, children, pregnant women and athletes.",
                        "telephone": "+351930505939",
                        "email": "camilleosteopatia@gmail.com",
                        "priceRange": "60€-100€",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Avenida de Roma",
                            "addressLocality": "Lisboa",
                            "postalCode": "1000-000",
                            "addressCountry": "PT"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "38.7436",
                            "longitude": "-9.1436"
                        },
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                "opens": "09:00",
                                "closes": "19:00"
                            }
                        ],
                        "sameAs": [
                            "https://www.instagram.com/camille_osteopathe",
                            "https://www.linkedin.com/in/camille-labasse"
                        ]
                    })
                }}
            />
        </footer>
    );
}
