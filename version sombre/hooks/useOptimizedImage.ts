import { useState, useEffect, useCallback } from 'react';

interface UseOptimizedImageOptions {
    src: string;
    quality?: number;
    blur?: boolean;
    priority?: boolean;
}

interface UseOptimizedImageReturn {
    isLoading: boolean;
    isError: boolean;
    optimizedSrc: string;
    preloadImage: () => void;
    getSrcSet: () => string;
    getSizes: () => string;
}

/**
 * Hook pour gérer le chargement optimisé des images
 * - Gestion du lazy loading
 * - Support des formats WebP/AVIF
 * - Génération automatique de srcset
 * - Préchargement intelligent
 */
export function useOptimizedImage({
    src,
    quality = 85,
    blur = false,
    priority = false
}: UseOptimizedImageOptions): UseOptimizedImageReturn {
    const [isLoading, setIsLoading] = useState(!priority);
    const [isError, setIsError] = useState(false);

    // Générer l'URL optimisée basée sur Next.js Image Optimization
    const getOptimizedSrc = useCallback((width?: number) => {
        if (!src) return '';

        // Si c'est déjà une URL Next.js optimisée
        if (src.includes('/_next/image')) return src;

        // Pour les images externes
        if (src.startsWith('http')) return src;

        // Pour les images locales, utiliser le format WebP si possible
        const baseUrl = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        if (width) {
            // Next.js image optimization API
            return `/_next/image?url=${encodeURIComponent(baseUrl)}&w=${width}&q=${quality}`;
        }

        return baseUrl;
    }, [src, quality]);

    // Générer le srcset pour responsive images
    const getSrcSet = useCallback(() => {
        const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

        return widths
            .map(w => {
                const optimized = getOptimizedSrc(w);
                return `${optimized} ${w}w`;
            })
            .join(', ');
    }, [getOptimizedSrc]);

    // Générer les sizes pour responsive images
    const getSizes = useCallback(() => {
        return `
            (max-width: 640px) 100vw,
            (max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            (max-width: 1536px) 33vw,
            600px
        `.trim();
    }, []);

    // Précharger l'image
    const preloadImage = useCallback(() => {
        if (!src || typeof window === 'undefined') return;

        const img = new Image();

        img.onload = () => {
            setIsLoading(false);
            setIsError(false);
        };

        img.onerror = () => {
            setIsLoading(false);
            setIsError(true);
            console.error(`Failed to load image: ${src}`);
        };

        // Utiliser srcset si supporté
        if ('srcset' in img) {
            img.srcset = getSrcSet();
            img.sizes = getSizes();
        }

        img.src = getOptimizedSrc();

        // Définir la priorité de chargement
        if (priority && 'loading' in img) {
            (img as any).loading = 'eager';
            (img as any).fetchPriority = 'high';
        }
    }, [src, priority, getOptimizedSrc, getSrcSet, getSizes]);

    // Effet pour le chargement automatique
    useEffect(() => {
        if (priority || !blur) {
            preloadImage();
        }
    }, [priority, blur, preloadImage]);

    // Observer pour le lazy loading
    useEffect(() => {
        if (priority || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        preloadImage();
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Précharger 50px avant d'être visible
                threshold: 0.01
            }
        );

        // Observer l'élément image (à connecter dans le composant)
        const imageElement = document.querySelector(`img[src*="${src}"]`);
        if (imageElement) {
            observer.observe(imageElement);
        }

        return () => observer.disconnect();
    }, [src, priority, preloadImage]);

    return {
        isLoading,
        isError,
        optimizedSrc: getOptimizedSrc(),
        preloadImage,
        getSrcSet,
        getSizes
    };
}

/**
 * Hook pour détecter le support WebP/AVIF
 */
export function useImageFormatSupport() {
    const [supportsWebP, setSupportsWebP] = useState(false);
    const [supportsAVIF, setSupportsAVIF] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Détecter le support WebP
        const webpTest = new Image();
        webpTest.onload = () => setSupportsWebP(true);
        webpTest.onerror = () => setSupportsWebP(false);
        webpTest.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

        // Détecter le support AVIF
        const avifTest = new Image();
        avifTest.onload = () => setSupportsAVIF(true);
        avifTest.onerror = () => setSupportsAVIF(false);
        avifTest.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }, []);

    return { supportsWebP, supportsAVIF };
}