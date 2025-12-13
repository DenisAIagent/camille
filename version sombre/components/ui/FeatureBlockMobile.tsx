import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface FeatureBlockMobileProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    decorationPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    decorationDelay?: string;
    actionLabel?: string;
    actionHref?: string;
    priority?: boolean;
}

/**
 * Version mobile-first du FeatureBlock
 * - Layout vertical sur mobile
 * - Images en aspect 4:3 sur mobile
 * - Texte toujours visible sans scroll
 * - Performance optimisée pour les connexions lentes
 */
export default function FeatureBlockMobile({
    imageSrc,
    imageAlt,
    title,
    description,
    decorationPosition,
    decorationDelay = '0s',
    actionLabel,
    actionHref,
    priority = false
}: FeatureBlockMobileProps) {
    const decorationClasses: Record<string, string> = {
        'top-right': '-top-2 -right-2 w-24 h-24 md:w-32 md:h-32 bg-accent/10',
        'top-left': '-top-2 -left-2 w-28 h-28 md:w-36 md:h-36 bg-primary/10',
        'bottom-right': '-bottom-2 -right-2 w-32 h-32 md:w-40 md:h-40 bg-primary/10',
        'bottom-left': '-bottom-2 -left-2 w-32 h-32 md:w-40 md:h-40 bg-primary/10',
    };

    return (
        <section
            className="flex flex-col gap-4 md:gap-6"
            aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            {/* Image Section */}
            <div
                className="relative group w-full"
                role="img"
                aria-label={imageAlt}
            >
                {/* Aspect ratio responsive */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl md:rounded-2xl shadow-md md:shadow-lg">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        quality={priority ? 90 : 75}
                        priority={priority}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        loading={priority ? "eager" : "lazy"}
                    />

                    {/* Overlay léger pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
                </div>

                {/* Décoration optionnelle */}
                {decorationPosition && (
                    <div
                        className={cn(
                            "absolute rounded-full blur-2xl -z-10 opacity-60 md:opacity-100",
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

            {/* Text Section */}
            <article className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm md:shadow-md border border-border/30">
                <header className="mb-3 md:mb-4">
                    <h2
                        id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-xl md:text-2xl lg:text-3xl font-serif text-primary leading-tight"
                    >
                        {title}
                    </h2>
                </header>

                <div className="space-y-3">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                        {description}
                    </p>

                    {actionLabel && actionHref && (
                        <footer className="pt-3 md:pt-4">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full md:w-auto rounded-full border-primary/30 hover:border-primary hover:bg-primary/5"
                            >
                                <Link href={actionHref}>
                                    {actionLabel}
                                </Link>
                            </Button>
                        </footer>
                    )}
                </div>
            </article>
        </section>
    );
}