import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Outfit, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";
import BackToTop from "@/components/ui/BackToTop";
import SkipToContent from "@/components/ui/SkipToContent";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    fr: 'Camille Labasse | Ostéopathe D.O. à Lisbonne',
    pt: 'Camille Labasse | Osteopata D.O. em Lisboa',
    en: 'Camille Labasse | Osteopath D.O. in Lisbon'
  };

  const descriptions = {
    fr: 'Cabinet d\'ostéopathie biodynamique à Lisbonne (Avenida de Roma). Soins pour adultes, enfants, femmes enceintes et sportifs. Prenez rendez-vous en ligne.',
    pt: 'Consultório de osteopatia biodinâmica em Lisboa (Avenida de Roma). Cuidados para adultos, crianças, grávidas e desportistas. Marque a sua consulta online.',
    en: 'Biodynamic osteopathy practice in Lisbon (Avenida de Roma). Care for adults, children, pregnant women and athletes. Book your appointment online.'
  };

  const title = titles[locale as keyof typeof titles] || titles.fr;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.fr;

  return {
    title: {
      default: title,
      template: `%s | Camille Labasse Ostéopathe`
    },
    description,
    metadataBase: new URL('https://camille-alpha.vercel.app'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'pt': '/pt',
        'en': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: 'Camille Labasse Ostéopathe',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/photos/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Camille Labasse Ostéopathe Lisbonne',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/photos/opengraph-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    verification: {
      google: 'votre-code-verification-google', // À remplacer plus tard
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <GoogleAnalytics />
          <NextIntlClientProvider messages={messages}>
            <SkipToContent />
            <Header locale={locale} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <FloatingContactButtons />
            <BackToTop />
            <Toaster position="top-right" richColors closeButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
