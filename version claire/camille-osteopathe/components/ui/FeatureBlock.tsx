import Image from 'next/image';
import { ReactNode } from 'react';

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
}

export default function FeatureBlock({
    imageSrc,
    imageAlt,
    title,
    description,
    layout = 'image-left',
    decorationPosition,
    decorationDelay = '0s'
}: FeatureBlockProps) {
    // Decoration classes based on position
    const decorationClasses: Record<string, string> = {
        'top-right': '-top-4 -right-4 w-32 h-32 bg-accent/20',
        'top-left': '-top-4 -left-4 w-36 h-36 bg-primary/20',
        'bottom-right': '-bottom-4 -right-4 w-40 h-40 bg-primary/20',
        'bottom-left': '-bottom-4 -left-4 w-40 h-40 bg-primary/20',
    };

    const ImageBlock = (
        <div className="relative group h-full">
            {/* Image container that fills the full height */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-premium hover-scale transition-smooth">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Optional decorative element */}
            {decorationPosition && (
                <div
                    className={`absolute ${decorationClasses[decorationPosition]} rounded-full blur-3xl animate-float`}
                    style={{ animationDelay: decorationDelay }}
                />
            )}
        </div>
    );

    const TextBlock = (
        <div className="h-full flex items-stretch">
            {/* Text content with flex centering */}
            <div className="gradient-subtle rounded-3xl p-8 md:p-10 lg:p-12 shadow-premium hover:shadow-glow transition-smooth w-full flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
                    {title}
                </h2>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                    {description}
                </p>
            </div>
        </div>
    );

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:h-[350px]">
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
