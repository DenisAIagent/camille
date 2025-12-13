import { Metadata } from 'next';
import ContactModal from '@/components/ui/ContactModal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const titles = {
        fr: 'Politique de Confidentialité | Camille Labasse Ostéopathe',
        pt: 'Política de Privacidade | Camille Labasse Osteopata',
        en: 'Privacy Policy | Camille Labasse Osteopath'
    };

    return {
        title: titles[locale as keyof typeof titles] || titles.fr,
        robots: { index: false, follow: false },
    };
}

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 max-w-4xl py-16">
            <h1 className="text-4xl font-serif font-medium mb-8">
                Politique de Confidentialité
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">1. Responsable du traitement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        <strong>Responsable du traitement</strong> : Camille Labasse<br />
                        <strong>Contact</strong> : <ContactModal trigger={<span>Via formulaire de contact</span>} /><br />
                        <strong>Téléphone</strong> : +351 930 505 939<br />
                        <strong>Adresse</strong> : Espaço Oneleaf, Rua Rodrigues Sampaio n76, 1º, 1150-278 Lisboa, Portugal
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">2. Données personnelles collectées</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Nous collectons les données personnelles suivantes :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Formulaire de contact</strong> : Nom, email, message (base légale : consentement)</li>
                        <li><strong>Cookies analytics</strong> : Données de navigation anonymisées (base légale : consentement)</li>
                        <li><strong>Durée de conservation</strong> : 3 ans après dernier contact</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">3. Vos droits RGPD</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Droit d&apos;accès</strong> : Obtenir une copie de vos données</li>
                        <li><strong>Droit de rectification</strong> : Corriger vos données inexactes</li>
                        <li><strong>Droit à l&apos;effacement</strong> : Supprimer vos données</li>
                        <li><strong>Droit à la portabilité</strong> : Recevoir vos données dans un format structuré</li>
                        <li><strong>Droit d&apos;opposition</strong> : Vous opposer au traitement de vos données</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        Pour exercer ces droits, <ContactModal trigger={<span>contactez-nous via notre formulaire</span>} />.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">4. Cookies utilisés</h2>
                    <table className="w-full border-collapse border border-border">
                        <thead>
                            <tr className="bg-muted">
                                <th className="border border-border p-3 text-left">Cookie</th>
                                <th className="border border-border p-3 text-left">Finalité</th>
                                <th className="border border-border p-3 text-left">Durée</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-border p-3">_ga</td>
                                <td className="border border-border p-3">Google Analytics (mesure audience)</td>
                                <td className="border border-border p-3">2 ans</td>
                            </tr>
                            <tr>
                                <td className="border border-border p-3">cookieconsent</td>
                                <td className="border border-border p-3">Enregistrement du consentement cookies</td>
                                <td className="border border-border p-3">1 an</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-sm text-muted-foreground mt-4">
                        Vous pouvez gérer vos préférences cookies à tout moment via le bandeau de consentement.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">5. Transferts hors UE</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Certaines données peuvent être transférées hors Union Européenne (ex: Google Analytics, USA).
                        Ces transferts sont encadrés par les clauses contractuelles types approuvées par la Commission Européenne.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">6. Sécurité</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour
                        garantir un niveau de sécurité adapté au risque (chiffrement SSL/TLS, accès restreints, etc.).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">7. Outils d&apos;analyse (Analytics)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Ce site utilise Google Analytics, un service d&apos;analyse web fourni par Google Inc. Google Analytics
                        utilise des cookies pour analyser l&apos;utilisation du site par les visiteurs.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        <strong>Données collectées</strong> : Pages visitées, durée de visite, type d&apos;appareil, localisation géographique (ville), source de trafic.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        <strong>Finalité</strong> : Améliorer le contenu du site et comprendre le comportement des visiteurs.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Vous pouvez désactiver Google Analytics en installant le module complémentaire de navigateur pour la désactivation de Google Analytics :
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                            https://tools.google.com/dlpage/gaoptout
                        </a>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">8. Publicités et Marketing</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Ce site est susceptible d&apos;utiliser des services de publicité en ligne (Google, Meta, etc.)
                        pour promouvoir les consultations d&apos;ostéopathie, avec votre consentement préalable via cookies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">9. Prestataires de services de paiement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Les consultations sont réglées directement au cabinet par <strong>espèces, MBWay, carte bancaire ou transfert bancaire instantané</strong>.
                        Aucune transaction en ligne n&apos;est effectuée via ce site web.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Aucune donnée bancaire n&apos;est collectée, stockée ou traitée par ce site.</strong>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">10. Remarketing et ciblage publicitaire</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Des outils de remarketing (pixels de suivi) peuvent être utilisés pour vous afficher des publicités ciblées
                        sur d&apos;autres sites web, uniquement avec votre consentement.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">11. RGPD - Responsable du traitement</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), le responsable du traitement est :
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                        <p className="text-muted-foreground">
                            <strong>Camille Labasse</strong><br />
                            Espaço Oneleaf, Rua Rodrigues Sampaio n76, 1º<br />
                            1150-278 Lisboa, Portugal<br />
                            Contact : <ContactModal trigger={<span className="font-medium">Formulaire de contact</span>} /><br />
                            Téléphone : +351 930 505 939
                        </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Base légale des traitements</strong> : Consentement (formulaire de contact), Intérêt légitime (analytics anonymisé).
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Délégué à la Protection des Données (DPO)</strong> : Non requis (activité de petite taille sans traitement de données sensibles à grande échelle).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">12. CPRA et CCPA (Californie - USA)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Conformément au <strong>California Privacy Rights Act (CPRA)</strong> et au <strong>California Consumer Privacy Act (CCPA)</strong>,
                        les résidents de Californie disposent des droits suivants :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Droit de savoir</strong> : Connaître les catégories et données personnelles collectées</li>
                        <li><strong>Droit de suppression</strong> : Demander la suppression de vos données personnelles</li>
                        <li><strong>Droit d&apos;opposition à la vente</strong> : <strong>Note : Nous ne vendons aucune donnée personnelle</strong></li>
                        <li><strong>Droit de non-discrimination</strong> : Aucune discrimination pour exercice de vos droits</li>
                        <li><strong>Droit de corriger</strong> : Rectifier vos données inexactes</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        Pour exercer ces droits, <ContactModal trigger={<span className="font-semibold">utilisez notre formulaire de contact</span>} />.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Catégories de données collectées</strong> : Identifiants (nom, email), Données de navigation (pages vues, durée).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">13. CalOPPA (California Online Privacy Protection Act)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Conformément à la <strong>CalOPPA</strong>, nous déclarons :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Les utilisateurs peuvent visiter notre site de manière anonyme</li>
                        <li>Cette Politique de Confidentialité décrit comment nous gérons les informations personnelles</li>
                        <li>Notre Politique de Confidentialité est accessible via un lien dans le footer de chaque page</li>
                        <li>Les utilisateurs seront notifiés de tout changement de cette politique via mise à jour de cette page avec nouvelle date</li>
                        <li>Les utilisateurs peuvent modifier leurs informations personnelles en nous contactant par email</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Signal &quot;Do Not Track&quot;</strong> : Nous respectons les signaux Do Not Track (DNT).
                        Si votre navigateur envoie un signal DNT, nous ne suivons pas votre navigation à des fins publicitaires.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">14. Protection des mineurs</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Ce site ne collecte pas sciemment de données personnelles auprès de mineurs de moins de 16 ans.
                        Si vous êtes parent/tuteur et pensez que votre enfant nous a fourni des données, contactez-nous pour suppression.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">15. Modifications de la politique</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment.
                        Les modifications substantielles seront communiquées via mise à jour de la date ci-dessous et/ou notification sur le site.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>Votre utilisation continue du site après modification vaut acceptation de la nouvelle politique.</strong>
                    </p>
                </section>

                <section className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground">
                        <strong>Dernière mise à jour</strong> : 28 novembre 2025<br />
                        <strong>Version</strong> : 1.0<br />
                        Cette politique peut être modifiée. Les changements significatifs seront communiqués sur cette page.
                    </p>
                </section>
            </div>
        </div>
    );
}
