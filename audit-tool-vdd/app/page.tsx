"use client";

import { useState } from "react";
import { FileSearch, Download, TrendingUp, Shield, Zap, DollarSign, Globe, BarChart3 } from "lucide-react";

interface AuditScore {
    infrastructure: number;
    seo: number;
    ux: number;
    legal: number;
    commercial: number;
}

interface AuditResult {
    url: string;
    scores: AuditScore;
    globalScore: number;
    fmv: {
        min: number;
        max: number;
    };
    timestamp: Date;
}

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);

    const runAudit = async () => {
        if (!url) return;

        setLoading(true);

        // Simulation de l'audit (en production, appeler API backend)
        setTimeout(() => {
            const mockScores: AuditScore = {
                infrastructure: Math.floor(Math.random() * 30) + 70,
                seo: Math.floor(Math.random() * 30) + 60,
                ux: Math.floor(Math.random() * 30) + 65,
                legal: Math.floor(Math.random() * 40) + 50,
                commercial: Math.floor(Math.random() * 30) + 70,
            };

            const globalScore = Math.round(
                mockScores.infrastructure * 0.3 +
                mockScores.seo * 0.25 +
                mockScores.ux * 0.2 +
                mockScores.legal * 0.15 +
                mockScores.commercial * 0.1
            );

            const mockResult: AuditResult = {
                url,
                scores: mockScores,
                globalScore,
                fmv: {
                    min: globalScore * 150,
                    max: globalScore * 250,
                },
                timestamp: new Date(),
            };

            setResult(mockResult);
            setLoading(false);
        }, 3000);
    };

    const exportPDF = () => {
        alert("Export PDF en développement. En production: génération via jsPDF.");
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
        if (score >= 60) return "text-orange-600 bg-orange-50 border-orange-200";
        return "text-red-600 bg-red-50 border-red-200";
    };

    const getScoreGradient = (score: number) => {
        if (score >= 80) return "gradient-green";
        if (score >= 60) return "gradient-orange";
        return "gradient-red";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <FileSearch className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    VDD Audit Tool Premium
                                </h1>
                                <p className="text-sm text-muted-foreground">Valorisation d'actifs digitaux</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Édition Professionnelle</p>
                            <p className="text-sm font-semibold text-foreground">Marché France 2025</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Input Section */}
                <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Auditez votre actif digital
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Analyse technique, SEO, UX et valorisation en 60 secondes
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="url"
                                        placeholder="https://votre-site.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={runAudit}
                                disabled={loading || !url}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Analyse...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-5 w-5" />
                                        Lancer l'audit
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features pills */}
                        <div className="flex flex-wrap gap-2 mt-6 justify-center">
                            {[
                                "Scoring automatique",
                                "Valorisation FMV",
                                "Rapport exportable",
                                "Analyse RGPD",
                                "Performance Web Vitals",
                            ].map((feature) => (
                                <span
                                    key={feature}
                                    className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
                        {/* Global Score Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-border p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

                            <div className="relative flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Score Global VDD</p>
                                    <h3 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {result.globalScore}/100
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Analysé le {result.timestamp.toLocaleDateString('fr-FR')} à{' '}
                                        {result.timestamp.toLocaleTimeString('fr-FR')}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground mb-2">Fair Market Value Estimée</p>
                                    <p className="text-4xl font-bold text-green-600">
                                        {result.fmv.min.toLocaleString()}€ - {result.fmv.max.toLocaleString()}€
                                    </p>
                                    <button
                                        onClick={exportPDF}
                                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 ml-auto"
                                    >
                                        <Download className="h-4 w-4" />
                                        Exporter le rapport PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Scores */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    key: "infrastructure",
                                    label: "Infrastructure Technique",
                                    icon: Zap,
                                    weight: "30%",
                                },
                                {
                                    key: "seo",
                                    label: "SEO & Sémantique",
                                    icon: TrendingUp,
                                    weight: "25%",
                                },
                                {
                                    key: "ux",
                                    label: "UX/Performance",
                                    icon: BarChart3,
                                    weight: "20%",
                                },
                                {
                                    key: "legal",
                                    label: "Conformité Légale",
                                    icon: Shield,
                                    weight: "15%",
                                },
                                {
                                    key: "commercial",
                                    label: "Valeur Commerciale",
                                    icon: DollarSign,
                                    weight: "10%",
                                },
                            ].map(({ key, label, icon: Icon, weight }) => {
                                const score = result.scores[key as keyof AuditScore];
                                return (
                                    <div
                                        key={key}
                                        className="bg-white rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className={`h-12 w-12 rounded-xl ${getScoreGradient(
                                                    score
                                                )} flex items-center justify-center`}
                                            >
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                                {weight}
                                            </span>
                                        </div>

                                        <h4 className="font-semibold mb-2 text-foreground">{label}</h4>

                                        <div className="flex items-end justify-between">
                                            <span
                                                className={`text-3xl font-bold ${getScoreColor(score).split(' ')[0]}`}
                                            >
                                                {score}/100
                                            </span>
                                            <span
                                                className={`text-xs font-medium px-3 py-1 rounded-full border ${getScoreColor(
                                                    score
                                                )}`}
                                            >
                                                {score >= 80 ? "Excellent" : score >= 60 ? "Bon" : "À améliorer"}
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getScoreGradient(score)} transition-all duration-1000`}
                                                style={{ width: `${score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                </div>
                                Recommandations Prioritaires
                            </h3>

                            <div className="space-y-4">
                                {result.scores.infrastructure < 80 && (
                                    <div className="flex gap-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                        <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-orange-700 font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-orange-900 mb-1">
                                                Optimiser l'infrastructure technique
                                            </h4>
                                            <p className="text-sm text-orange-700">
                                                Score actuel : {result.scores.infrastructure}/100. Migrer vers Next.js 16,
                                                implémenter TypeScript strict, optimiser le build.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {result.scores.seo < 80 && (
                                    <div className="flex gap-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                        <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-orange-700 font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-orange-900 mb-1">
                                                Renforcer le référencement SEO
                                            </h4>
                                            <p className="text-sm text-orange-700">
                                                Score actuel : {result.scores.seo}/100. Ajouter Schema.org, compléter
                                                métadonnées, générer sitemap.xml.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {result.scores.legal < 70 && (
                                    <div className="flex gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-red-700 font-bold">!</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-red-900 mb-1">
                                                🚨 Conformité RGPD critique
                                            </h4>
                                            <p className="text-sm text-red-700">
                                                Score actuel : {result.scores.legal}/100. Implémenter cookie banner,
                                                politique de confidentialité, mentions légales (risque amende CNIL).
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {result.globalScore >= 80 && (
                                    <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-700 font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-green-900 mb-1">
                                                Excellent score global !
                                            </h4>
                                            <p className="text-sm text-green-700">
                                                Votre actif digital est de haute qualité. Focus sur l'optimisation continue
                                                et le suivi analytics.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t bg-white/50 backdrop-blur-lg mt-20 py-8">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>© 2025 VDD Audit Tool Premium - Elite Web Agency M&A Division</p>
                    <p className="mt-2">Valorisation professionnelle d'actifs digitaux français</p>
                </div>
            </footer>
        </div>
    );
}
