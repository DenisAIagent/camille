"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface CategoryContent {
    key: string;
    title: string;
    description: string;
    benefits: string[];
    conditions: string[];
}

export default function WhoIsItFor() {
    const t = useTranslations('HomePage');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = [
        'who_babies',
        'who_adults',
        'who_sports',
        'who_pregnant',
        'who_chronic'
    ];

    // Contenu SEO détaillé pour chaque catégorie
    const getCategoryContent = (key: string): CategoryContent => {
        const content: Record<string, CategoryContent> = {
            who_babies: {
                key: 'who_babies',
                title: t('who_babies'),
                description: "L'ostéopathie accompagne les bébés et enfants dès les premiers jours de vie. Les techniques douces et adaptées aident à soulager les tensions liées à la naissance, favorisent un développement harmonieux et préviennent les troubles fonctionnels.",
                benefits: [
                    "Soulagement des coliques et troubles digestifs",
                    "Amélioration de la qualité du sommeil",
                    "Traitement des plagiocéphalies (tête plate)",
                    "Accompagnement du développement moteur",
                    "Soutien lors des poussées dentaires"
                ],
                conditions: [
                    "Troubles du sommeil et pleurs excessifs",
                    "Difficultés d'allaitement ou de succion",
                    "Reflux gastro-œsophagien",
                    "Torticolis congénital",
                    "Retard de développement moteur"
                ]
            },
            who_adults: {
                key: 'who_adults',
                title: t('who_adults'),
                description: "L'ostéopathie pour adultes et seniors offre une approche globale pour maintenir la mobilité, soulager les douleurs chroniques et améliorer la qualité de vie. Elle s'adapte aux besoins spécifiques de chaque âge et condition physique.",
                benefits: [
                    "Amélioration de la mobilité articulaire",
                    "Réduction des douleurs chroniques",
                    "Meilleure posture et équilibre",
                    "Prévention des troubles liés à l'âge",
                    "Renforcement du système immunitaire"
                ],
                conditions: [
                    "Douleurs vertébrales (cervicalgies, lombalgies)",
                    "Arthrose et raideurs articulaires",
                    "Troubles de l'équilibre",
                    "Maux de tête et migraines",
                    "Fatigue chronique"
                ]
            },
            who_sports: {
                key: 'who_sports',
                title: t('who_sports'),
                description: "L'ostéopathie sportive optimise les performances, prévient les blessures et accélère la récupération. Elle s'adresse à tous les sportifs, du amateur au professionnel, en tenant compte des spécificités de chaque discipline.",
                benefits: [
                    "Optimisation de la performance sportive",
                    "Prévention des blessures",
                    "Récupération accélérée après l'effort",
                    "Amélioration de la flexibilité et de l'amplitude",
                    "Traitement et prévention des tendinites"
                ],
                conditions: [
                    "Entorses et traumatismes sportifs",
                    "Tendinites (épaule, coude, genou, cheville)",
                    "Contractures et tensions musculaires",
                    "Périostites et douleurs de croissance",
                    "Préparation et récupération de compétition"
                ]
            },
            who_pregnant: {
                key: 'who_pregnant',
                title: t('who_pregnant'),
                description: "L'ostéopathie périnatale accompagne les femmes enceintes tout au long de la grossesse et après l'accouchement. Elle aide à soulager les inconforts liés aux changements du corps et prépare le bassin pour l'accouchement.",
                benefits: [
                    "Soulagement des douleurs lombaires et pelviennes",
                    "Amélioration de la circulation sanguine",
                    "Préparation du bassin pour l'accouchement",
                    "Réduction des nausées et troubles digestifs",
                    "Récupération post-partum optimale"
                ],
                conditions: [
                    "Sciatiques et douleurs pelviennes",
                    "Troubles digestifs de la grossesse",
                    "Douleurs costales et difficultés respiratoires",
                    "Œdèmes et circulation veineuse",
                    "Récupération après césarienne ou épisiotomie"
                ]
            },
            who_chronic: {
                key: 'who_chronic',
                title: t('who_chronic'),
                description: "L'ostéopathie offre une approche complémentaire dans la prise en charge des pathologies chroniques. Elle vise à améliorer le confort de vie, réduire les symptômes et soutenir les capacités d'auto-régulation du corps.",
                benefits: [
                    "Réduction des douleurs chroniques",
                    "Amélioration de la qualité de vie",
                    "Soutien du système immunitaire",
                    "Meilleure gestion du stress",
                    "Complémentarité avec les traitements médicaux"
                ],
                conditions: [
                    "Fibromyalgie et syndrome de fatigue chronique",
                    "Maladies auto-immunes",
                    "Troubles digestifs chroniques",
                    "Migraines et céphalées récurrentes",
                    "Pathologies rhumatismales"
                ]
            }
        };

        return content[key] || content.who_adults;
    };

    const selectedContent = selectedCategory ? getCategoryContent(selectedCategory) : null;

    return (
        <section className="py-24 bg-gradient-subtle relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gradient">{t('h2_who')}</h2>
                <p className="text-center text-muted-foreground mb-16 text-lg">Pour toute la famille, à chaque étape de la vie</p>

                {/* Mobile View: Accordion */}
                <div className="md:hidden space-y-4">
                    {categories.map((key) => {
                        const content = getCategoryContent(key);
                        const isSelected = selectedCategory === key;

                        return (
                            <div key={key} className="bg-card/60 backdrop-blur-xl border-2 border-border/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                                <button
                                    onClick={() => setSelectedCategory(isSelected ? null : key)}
                                    className={`w-full p-6 flex items-center justify-between text-left transition-colors ${isSelected ? 'bg-primary/5 text-primary' : 'text-foreground'}`}
                                    aria-expanded={isSelected}
                                >
                                    <span className="font-semibold text-lg">{t(key)}</span>
                                    <span className={`transform transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 border-t border-border/50">
                                            <p className="text-foreground/90 mb-6 leading-relaxed mt-4">
                                                {content.description}
                                            </p>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="font-semibold mb-3 text-primary flex items-center gap-2 text-sm uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                        Bénéfices
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {content.benefits.map((benefit, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                                                <span className="text-accent mt-1">✓</span>
                                                                <span>{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-3 text-primary flex items-center gap-2 text-sm uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                                        Conditions
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {content.conditions.map((condition, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                                                <span className="text-primary mt-1">•</span>
                                                                <span>{condition}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-border text-center">
                                                <Link
                                                    href="/contact"
                                                    className="inline-flex items-center justify-center px-8 py-3 rounded-full gradient-warm text-white font-medium text-sm shadow-lg w-full"
                                                >
                                                    Prendre rendez-vous
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop View: Tabs */}
                <div className="hidden md:block">
                    {/* Cards Grid */}
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {categories.map((key, index) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                                className={`group relative animate-fade-in-up cursor-pointer transition-all ${selectedCategory === key ? 'scale-105' : ''
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                aria-expanded={selectedCategory === key}
                                aria-controls={`content-${key}`}
                            >
                                {/* Glow effect on hover */}
                                <div className={`absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl transition-all duration-700 ${selectedCategory === key ? 'opacity-100 blur-2xl' : 'opacity-0 group-hover:opacity-100 group-hover:blur-2xl'
                                    }`}></div>

                                {/* Card */}
                                <div className={`relative bg-card/60 backdrop-blur-xl border-2 rounded-2xl p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 min-h-[160px] flex items-center justify-center ${selectedCategory === key
                                    ? 'border-primary shadow-2xl bg-card/80'
                                    : 'border-border/50 group-hover:border-primary/50 group-hover:shadow-2xl'
                                    }`}>
                                    {/* Subtle gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl transition-opacity duration-500 ${selectedCategory === key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}></div>

                                    {/* Floating decorative elements */}
                                    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-700 ${selectedCategory === key
                                        ? 'bg-primary scale-150'
                                        : 'bg-primary/30 group-hover:scale-150 group-hover:bg-primary/60'
                                        }`}></div>
                                    <div
                                        className={`absolute bottom-3 left-3 w-3 h-3 rounded-full transition-all duration-700 ${selectedCategory === key
                                            ? 'bg-accent scale-150'
                                            : 'bg-accent/30 group-hover:scale-150 group-hover:bg-accent/60'
                                            }`}
                                        style={{ transitionDelay: '100ms' }}
                                    ></div>

                                    {/* Text */}
                                    <span className={`relative font-semibold text-center leading-tight transition-colors duration-300 ${selectedCategory === key ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                        }`}>
                                        {t(key)}
                                    </span>

                                    {/* Shimmer effect */}
                                    <div className={`absolute inset-0 rounded-2xl shimmer pointer-events-none ${selectedCategory === key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* SEO Content Section (Desktop) */}
                    {selectedContent && (
                        <div
                            id={`content-${selectedContent.key}`}
                            className="mt-16 max-w-4xl mx-auto animate-fade-in-up"
                        >
                            <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-12 shadow-premium border-2 border-primary/30">
                                <h3 className="text-3xl font-serif mb-6 text-gradient">{selectedContent.title}</h3>

                                <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                                    {selectedContent.description}
                                </p>

                                <div className="grid grid-cols-2 gap-8">
                                    {/* Bénéfices */}
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                                            Bénéfices de l&apos;ostéopathie
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedContent.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-foreground/80">
                                                    <span className="text-accent mt-1.5 font-semibold">✓</span>
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Conditions traitées */}
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                                            Conditions traitées
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedContent.conditions.map((condition, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-foreground/80">
                                                    <span className="text-primary mt-1.5 font-semibold">•</span>
                                                    <span>{condition}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-8 pt-8 border-t border-border text-center">
                                    <p className="text-foreground font-medium mb-6 text-lg">
                                        Prenez soin de votre santé dès aujourd&apos;hui
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center px-10 py-4 rounded-full gradient-warm text-white font-bold text-lg shadow-lg hover:shadow-glow transition-smooth hover-scale tracking-wide"
                                    >
                                        Prendre rendez-vous
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
