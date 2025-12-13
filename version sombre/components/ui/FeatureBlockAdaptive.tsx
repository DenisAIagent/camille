'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Import dynamique des composants pour optimiser le bundle
const FeatureBlockOptimized = dynamic(() => import('./FeatureBlockOptimized'), {
    loading: () => <FeatureBlockSkeleton />,
});

const FeatureBlockMobile = dynamic(() => import('./FeatureBlockMobile'), {
    loading: () => <FeatureBlockSkeleton />,
});

// Skeleton loader pendant le chargement
function FeatureBlockSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-muted/30 rounded-2xl aspect-[16/9]" />
                <div className="bg-muted/30 rounded-2xl p-8">
                    <div className="h-8 bg-muted/50 rounded w-3/4 mb-4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-muted/50 rounded" />
                        <div className="h-4 bg-muted/50 rounded w-5/6" />
                        <div className="h-4 bg-muted/50 rounded w-4/6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FeatureBlockAdaptiveProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    layout?: 'image-left' | 'image-right';
    decorationPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    decorationDelay?: string;
    actionLabel?: string;
    actionHref?: string;
    priority?: boolean;
    forceVersion?: 'desktop' | 'mobile' | 'auto';
}

/**
 * Composant adaptatif qui choisit automatiquement la meilleure version
 * en fonction du device et des préférences utilisateur
 */
export default function FeatureBlockAdaptive({
    forceVersion = 'auto',
    ...props
}: FeatureBlockAdaptiveProps) {
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const isSlowConnection = useNetworkSpeed() === 'slow';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <FeatureBlockSkeleton />;
    }

    // Logique de sélection du composant
    const shouldUseMobileVersion = () => {
        if (forceVersion !== 'auto') {
            return forceVersion === 'mobile';
        }

        // Utiliser la version mobile si :
        // - On est sur mobile
        // - La connexion est lente
        // - L'utilisateur préfère moins d'animations
        return isMobile || isSlowConnection || prefersReducedMotion;
    };

    if (shouldUseMobileVersion()) {
        // Version mobile simplifiée
        return (
            <FeatureBlockMobile
                {...props}
                // Désactiver les animations si reduced motion
                decorationPosition={prefersReducedMotion ? undefined : props.decorationPosition}
            />
        );
    }

    // Version desktop optimisée
    return <FeatureBlockOptimized {...props} />;
}

/**
 * Hook custom pour détecter la vitesse de connexion
 */
function useNetworkSpeed(): 'fast' | 'slow' | 'unknown' {
    const [speed, setSpeed] = useState<'fast' | 'slow' | 'unknown'>('unknown');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Utiliser l'API Network Information si disponible
        const connection = (navigator as any).connection ||
                          (navigator as any).mozConnection ||
                          (navigator as any).webkitConnection;

        if (connection) {
            const updateSpeed = () => {
                const effectiveType = connection.effectiveType;

                // 4g = fast, 3g/2g/slow-2g = slow
                if (effectiveType === '4g') {
                    setSpeed('fast');
                } else if (effectiveType) {
                    setSpeed('slow');
                }

                // Vérifier aussi la bande passante
                if (connection.downlink && connection.downlink < 1) {
                    setSpeed('slow');
                }
            };

            updateSpeed();
            connection.addEventListener('change', updateSpeed);

            return () => {
                connection.removeEventListener('change', updateSpeed);
            };
        } else {
            // Fallback : tester le temps de chargement d'une petite image
            const testImage = new Image();
            const startTime = performance.now();

            testImage.onload = () => {
                const loadTime = performance.now() - startTime;
                setSpeed(loadTime > 500 ? 'slow' : 'fast');
            };

            testImage.onerror = () => {
                setSpeed('unknown');
            };

            // Image de test 1x1 pixel
            testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }
    }, []);

    return speed;
}