"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer({ locale }: { locale: string }) {
    const t = useTranslations("ContactPage");

    return (
        <footer className="relative bg-gradient-to-b from-muted/30 to-muted/50 border-t border-primary/10 py-16 mt-24 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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

                    {/* Google Reviews Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg mb-4 text-primary">Avis Clients</h3>
                        <a
                            href="https://maps.app.goo.gl/4UZom8xau583N1796"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            {/* Stars Rating */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-500 text-lg">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span className="font-bold text-foreground">5.0/5</span>
                            </div>

                            {/* Review Count */}
                            <p className="text-sm text-muted-foreground mb-4">
                                Basé sur 12 avis Google
                            </p>

                            {/* Button */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border-2 border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-smooth group-hover:border-primary">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span>Voir les avis</span>
                            </div>
                        </a>
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
                        <Link href="/faq" className="text-muted-foreground hover:text-primary transition-smooth animated-underline">
                            FAQ
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
