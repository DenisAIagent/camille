import { useEffect, useState } from 'react';

/**
 * Hook pour détecter les media queries
 * Utile pour adapter le layout en fonction de la taille d'écran
 *
 * @param query - Media query string (ex: "(min-width: 768px)")
 * @returns boolean indiquant si la query match
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // S'assurer qu'on est côté client
        if (typeof window === 'undefined') return;

        // Créer le media query
        const media = window.matchMedia(query);

        // Fonction de mise à jour
        const updateMatch = () => {
            setMatches(media.matches);
        };

        // Initialiser la valeur
        updateMatch();

        // Écouter les changements
        if (media.addEventListener) {
            media.addEventListener('change', updateMatch);
        } else {
            // Fallback pour les vieux navigateurs
            media.addListener(updateMatch);
        }

        // Cleanup
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', updateMatch);
            } else {
                media.removeListener(updateMatch);
            }
        };
    }, [query]);

    return matches;
}

/**
 * Hooks prédéfinis pour les breakpoints courants
 */
export function useIsMobile() {
    return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
    return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1024px)');
}

export function useIsLargeDesktop() {
    return useMediaQuery('(min-width: 1536px)');
}

/**
 * Hook pour obtenir le breakpoint actuel
 */
export function useBreakpoint() {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const isDesktop = useIsDesktop();
    const isLargeDesktop = useIsLargeDesktop();

    if (isLargeDesktop) return 'xl';
    if (isDesktop) return 'lg';
    if (isTablet) return 'md';
    if (isMobile) return 'sm';
    return 'xs';
}

/**
 * Hook pour détecter l'orientation
 */
export function useOrientation() {
    const isPortrait = useMediaQuery('(orientation: portrait)');
    return isPortrait ? 'portrait' : 'landscape';
}

/**
 * Hook pour détecter les préférences d'accessibilité
 */
export function useAccessibilityPreferences() {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const prefersContrast = useMediaQuery('(prefers-contrast: high)');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return {
        prefersReducedMotion,
        prefersContrast,
        prefersDarkMode
    };
}