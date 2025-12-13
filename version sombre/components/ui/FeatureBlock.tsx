import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';

interface FeatureBlockProps {
    /**
     * Image source path
     */
    imageSrc: string;

    /**
     * Alt text for the image
     */
    imageAlt: string;

    /**
     * Title of the feature
     */
    title: string;

    /**
     * Description text
     */
    description: string;

    /**
     * Layout order: 'image-left' or 'image-right'
     * @default 'image-left'
     */
    layout?: 'image-left' | 'image-right';

    /**
     * Optional decorative element
     */
    decorationPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

    /**
     * Decoration delay for animation
     */
    decorationDelay?: string;

    /**
     * Optional action button label
     */
    actionLabel?: string;

    /**
     * Optional action button href
     */
    actionHref?: string;
}

export default function FeatureBlock({
    imageSrc,
    imageAlt,
    title,
    description,
    layout = 'image-left',
    decorationPosition,
    decorationDelay = '0s',
    actionLabel,
    actionHref
}: FeatureBlockProps) {
    // Decoration classes based on position
    const decorationClasses: Record<string, string> = {
        'top-right': '-top-4 -right-4 w-32 h-32 bg-accent/20',
        'top-left': '-top-4 -left-4 w-36 h-36 bg-primary/20',
        'bottom-right': '-bottom-4 -right-4 w-40 h-40 bg-primary/20',
        'bottom-left': '-bottom-4 -left-4 w-40 h-40 bg-primary/20',
    };

    const ImageBlock = (
        <div className="relative group w-full" style={{ aspectRatio: '16/9', transform: 'scale(1.05)' }}>
            {/* Image container with 16:9 aspect ratio */}
            <div className="relative w-full h-full overflow-hidden rounded-[2rem] shadow-premium transition-smooth">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Optional decorative element */}
            {decorationPosition && (
                <div
                    className={`absolute ${decorationClasses[decorationPosition]} rounded-full blur-3xl animate-float -z-10`}
                    style={{ animationDelay: decorationDelay }}
                />
            )}
        </div>
    );

    const TextBlock = (
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            {/* Text content matching image aspect ratio */}
            <div className="bg-card rounded-[2rem] p-8 md:p-12 shadow-premium hover:shadow-glow transition-smooth w-full h-full flex flex-col justify-center border border-border/50">
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-serif mb-4 md:mb-6 text-primary leading-tight">
                    {title}
                </h2>
                <div className="relative flex-1 flex items-center">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                        {description}
                    </p>
                </div>
                {actionLabel && actionHref && (
                    <div className="mt-6 md:mt-8 pt-4">
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-8 py-6 h-auto border-2 border-primary/30 hover:border-primary text-foreground hover:text-primary transition-smooth animated-underline text-base font-medium"
                        >
                            <Link href={actionHref}>{actionLabel}</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
