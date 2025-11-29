import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Outfit, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

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
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <FloatingContactButtons />
          <Toaster position="top-right" richColors closeButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
