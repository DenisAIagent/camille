"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';

interface LightboxGalleryProps {
    images: string[];
    basePath?: string;
}

export default function LightboxGallery({ images, basePath = '/images/photos/' }: LightboxGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        // Pattern standard React Portal - Nécessaire pour éviter les erreurs d'hydratation SSR
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    // Reset loading state when image changes
    useEffect(() => {
        if (selectedIndex !== null) {
            setImageLoading(true);
        }
    }, [selectedIndex]);

    // Gestion du scroll body
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedIndex]);

    const onClose = useCallback(() => {
        setSelectedIndex(null);
        setDirection(null);
        setImageLoading(true);
    }, []);

    const onPrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        setDirection('prev');
        setSelectedIndex((prev) =>
            prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null
        );
    }, [images.length]);

    const onNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        setDirection('next');
        setSelectedIndex((prev) =>
            prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null
        );
    }, [images.length]);

    // Gestion du swipe tactile pour mobile
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        const isLeftSwipe = distanceX > minSwipeDistance;
        const isRightSwipe = distanceX < -minSwipeDistance;
        const isDownSwipe = distanceY < -minSwipeDistance;

        // Priorité au swipe vertical (fermer) si détecté
        if (isDownSwipe && Math.abs(distanceY) > Math.abs(distanceX)) {
            onClose();
        } else if (isLeftSwipe) {
            onNext();
        } else if (isRightSwipe) {
            onPrev();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Navigation clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev(e);
            if (e.key === 'ArrowRight') onNext(e);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, onClose, onPrev, onNext]);

    const lightboxContent = selectedIndex !== null && (
        <div
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-lg animate-fade-in"
            onClick={onClose}
        >
            {/* Image Container - Méthode Infaillible : Fill + Object-Contain */}
            <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-md">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 hover:scale-110 shadow-2xl"
                    aria-label="Fermer"
                >
                    <X className="w-7 h-7" />
                </button>

                {/* Navigation Buttons */}
                <button
                    onClick={onPrev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 shadow-2xl hidden md:block"
                    aria-label="Précédent"
                >
                    <ChevronLeft className="w-10 h-10" />
                </button>

                <button
                    onClick={onNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 shadow-2xl hidden md:block"
                    aria-label="Suivant"
                >
                    <ChevronRight className="w-10 h-10" />
                </button>

                {/* Zone d'affichage de l'image - Prend tout l'écran moins le padding */}
                <div
                    className="relative w-full h-full max-w-[95vw] max-h-[90vh] p-4 md:p-8"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Loading indicator */}
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        </div>
                    )}

                    <Image
                        key={selectedIndex}
                        src={`${basePath}${images[selectedIndex]}`}
                        alt={`Cabinet Camille Labasse - Photo ${selectedIndex + 1}`}
                        fill
                        className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        sizes="95vw"
                        quality={100}
                        priority
                        onLoad={() => setImageLoading(false)}
                    />
                </div>

                {/* Counter */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-base font-medium shadow-2xl border border-white/20 z-50">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>

            {/* Instructions pour mobile */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/60 text-sm md:hidden text-center">
                Glissez horizontalement pour naviguer<br />Glissez vers le bas pour fermer
            </div>
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {images.map((photo, index) => (
                    <div
                        key={photo}
                        className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        onClick={() => setSelectedIndex(index)}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 group-hover:from-black/60 z-10 transition-all duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 z-10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                <ZoomIn className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <Image
                            src={`${basePath}${photo}`}
                            alt={`Cabinet Camille Labasse ${index + 1}`}
                            width={478}
                            height={319}
                            quality={70}
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                ))}
            </div>

            {mounted && selectedIndex !== null && createPortal(lightboxContent, document.body)}
        </>
    );
}
