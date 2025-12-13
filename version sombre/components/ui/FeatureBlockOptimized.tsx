'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FeatureBlockOptimizedProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    layout?: 'image-left' | 'image-right';
    decorationPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    decorationDelay?: string;
    actionLabel?: string;
    actionHref?: string;
    priority?: boolean; // Pour les images above the fold
}

export default function FeatureBlockOptimized({
    imageSrc,
    imageAlt,
    title,
    description,
    layout = 'image-left',
    decorationPosition,
    decorationDelay = '0s',
    actionLabel,
    actionHref,
    priority = false
}: FeatureBlockOptimizedProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Synchroniser les hauteurs uniquement sur desktop
    useEffect(() => {
        const syncHeights = () => {
            if (!textRef.current || !imageRef.current) return;

            // Sur mobile, laisser les hauteurs naturelles
            if (window.innerWidth < 768) {
                setContentHeight('auto');
                return;
            }

            // Calculer la hauteur optimale
            const textHeight = textRef.current.scrollHeight;
            const imageAspectHeight = imageRef.current.offsetWidth * (9 / 16);

            // Utiliser la plus grande hauteur avec un minimum
            const optimalHeight = Math.max(textHeight, imageAspectHeight, 350);
            setContentHeight(optimalHeight);
        };

        syncHeights();
        window.addEventListener('resize', syncHeights);

        // Observer pour les changements de contenu
        const resizeObserver = new ResizeObserver(syncHeights);
        if (textRef.current) resizeObserver.observe(textRef.current);

        return () => {
            window.removeEventListener('resize', syncHeights);
            resizeObserver.disconnect();
        };
    }, [description, title]);

    // Classes de décoration optimisées
    const decorationClasses: Record<string, string> = {
        'top-right': '-top-4 -right-4 w-32 h-32 bg-accent/10 dark:bg-accent/20',
        'top-left': '-top-4 -left-4 w-36 h-36 bg-primary/10 dark:bg-primary/20',
        'bottom-right': '-bottom-4 -right-4 w-40 h-40 bg-primary/10 dark:bg-primary/20',
        'bottom-left': '-bottom-4 -left-4 w-40 h-40 bg-primary/10 dark:bg-primary/20',
    };

    const ImageBlock = (
        <div
            ref={imageRef}
            className="relative group w-full"
            style={{
                height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
                minHeight: '300px'
            }}
            role="img"
            aria-label={imageAlt}
        >
            {/* Container avec overflow pour gérer le scale */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Image avec scale optimisé */}
                <div className={cn(
                    "relative w-full h-full transition-transform duration-700",
                    "group-hover:scale-105"
                )}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        quality={85}
                        priority={priority}
                        className={cn(
                            "object-cover transition-opacity duration-500",
                            isImageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        onLoad={() => setIsImageLoaded(true)}
                        loading={priority ? "eager" : "lazy"}
                    />
                </div>

                {/* Overlay gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Décoration avec animation optimisée */}
            {decorationPosition && (
                <div
                    className={cn(
                        "absolute rounded-full blur-2xl lg:blur-3xl -z-10",
                        decorationClasses[decorationPosition],
                        "animate-pulse-subtle"
                    )}
                    style={{
                        animationDelay: decorationDelay,
                        animationDuration: '6s'
                    }}
                />
            )}
        </div>
    );

    const TextBlock = (
        <div
            ref={textRef}
            className="relative w-full flex items-stretch"
            style={{
                height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
                minHeight: '300px'
            }}
        >
            {/* Card avec meilleure gestion du contenu */}
            <article className="bg-card rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 w-full flex flex-col justify-between border border-border/30 dark:border-border/50 group">
                {/* Contenu principal */}
                <div className="flex-1 flex flex-col">
                    <header>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 md:mb-6 text-primary leading-tight group-hover:text-primary/90 transition-colors duration-300">
                            {title}
                        </h2>
                    </header>

                    {/* Description avec scroll si nécessaire */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border/30 scrollbar-track-transparent pr-2">
                        <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Action button avec meilleur positionnement */}
                {actionLabel && actionHref && (
                    <footer className="mt-6 pt-4 border-t border-border/20">
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-6 md:px-8 py-5 md:py-6 h-auto border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-foreground hover:text-primary transition-all duration-300 text-sm md:text-base font-medium w-full md:w-auto"
                        >
                            <Link href={actionHref}>
                                <span className="relative">
                                    {actionLabel}
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </span>
                            </Link>
                        </Button>
                    </footer>
                )}
            </article>
        </div>
    );

    return (
        <section
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12",
                "animate-fade-in-up"
            )}
            aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            {layout === 'image-left' ? (
                <>
                    {ImageBlock}
                    {TextBlock}
                </>
            ) : (
                <>
                    {TextBlock}
                    {ImageBlock}
                </>
            )}
        </section>
    );
}