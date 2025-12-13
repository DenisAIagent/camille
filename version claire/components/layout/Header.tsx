"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Header({ locale }: { locale: string }) {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: t("home"), href: "/" },
        { label: t("osteopathy"), href: "/osteopathie" },
        { label: t("trauma"), href: "/trauma" },
        { label: t("contact"), href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 glass backdrop-blur-xl shadow-sm">
            <div className="container flex h-20 items-center justify-between mx-auto px-4">
                <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-foreground hover:text-primary transition-smooth animated-underline">
                    Camille Labasse
                    <span className="text-sm block text-muted-foreground font-sans font-normal">Ostéopathe D.O</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-smooth animated-underline ${isActive
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground hover:text-primary"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <ThemeToggle />
                    <LanguageSwitcher locale={locale} />
                    <Button asChild className="gradient-warm hover:shadow-glow text-white rounded-full px-6 transition-smooth hover-scale">
                        <Link href="/contact">{t("bookAppointment")}</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <LanguageSwitcher locale={locale} />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-smooth">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="glass-dark backdrop-blur-xl border-primary/20">
                            <nav className="flex flex-col gap-6 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-lg font-medium hover:text-primary transition-smooth"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4 gradient-warm text-white rounded-full">
                                    <Link href="/contact" onClick={() => setIsOpen(false)}>{t("bookAppointment")}</Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
