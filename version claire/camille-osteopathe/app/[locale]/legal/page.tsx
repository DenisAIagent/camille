import { Metadata } from 'next';
import ContactModal from '@/components/ui/ContactModal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const titles = {
        fr: 'Mentions Légales | Camille Labasse Ostéopathe',
        pt: 'Aviso Legal | Camille Labasse Osteopata',
        en: 'Legal Notice | Camille Labasse Osteopath'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        robots: { index: false, follow: false },
    };
}

export default function LegalPage() {
    return (
        <div className="container mx-auto px-4 max-w-4xl py-16">
            <h1 className="text-4xl font-serif font-medium mb-8">
                Mentions Légales
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">1. Éditeur du site</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        <strong>Raison sociale</strong> : Camille Labasse (Profession libérale - Ostéopathe D.O)<br />
                        <strong>Adresse</strong> : Espaço Oneleaf, Rua Rodrigues Sampaio n76, 1º apartamento, 1150-278 Lisboa, Portugal<br />
                        <strong>Contact</strong> : <ContactModal trigger={<span className="text-primary hover:underline">Via formulaire de contact</span>} /><br />
                        <strong>Téléphone</strong> : +351 930 505 939<br />
                        <strong>Directeur de publication</strong> : Camille Labasse
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">2. Hébergement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Le site est hébergé sur une plateforme d'hébergement cloud professionnelle.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">3. Propriété intellectuelle</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        L&apos;ensemble du contenu de ce site (textes, images, vidéos, design, logos) est protégé par le droit d&apos;auteur
                        et appartient à Camille Labasse, sauf mention contraire.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        Toute reproduction, distribution, modification ou utilisation sans autorisation expresse est interdite
                        et constitue une contrefaçon sanctionnée par le Code de la Propriété Intellectuelle.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        © 2025 Camille Labasse - Tous droits réservés
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">4. Limitation de responsabilité</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Les informations fournies sur ce site le sont à titre informatif et ne constituent pas un diagnostic ostéopathique.
                        Seule une consultation en présentiel permet d&apos;établir un bilan ostéopathique complet et d&apos;adapter un traitement personnalisé.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Important</strong> : L&apos;ostéopathie est une pratique de santé manuelle complémentaire.
                        En cas de pathologie grave ou de doute, consultez votre médecin traitant.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        Nous nous efforçons de maintenir les informations à jour, mais ne pouvons garantir l&apos;exactitude,
                        l&apos;exhaustivité ou l&apos;actualité de toutes les informations présentes sur ce site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">5. Liens externes</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Ce site peut contenir des liens vers des sites externes. Nous ne sommes pas responsables du contenu,
                        de la disponibilité ou des pratiques de confidentialité de ces sites tiers.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">6. Droit applicable</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Le site est régi par le droit portugais. En cas de litige, les tribunaux de Lisbonne sont compétents.
                    </p>
                </section>

                <section className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground">
                        <strong>Dernière mise à jour</strong> : 28 novembre 2025
                    </p>
                </section>
            </div>
        </div>
    );
}
