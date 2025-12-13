import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono"
});

export const metadata: Metadata = {
    title: "VDD Audit Tool Premium | Valorisation Actifs Digitaux",
    description: "Outil professionnel d'audit Vendor Due Diligence pour actifs numériques français. Scoring automatisé, valorisation et rapport PDF.",
    keywords: "audit digital, due diligence, valorisation site web, M&A digital, SEO audit, performance web",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}>
                {children}
            </body>
        </html>
    );
}
