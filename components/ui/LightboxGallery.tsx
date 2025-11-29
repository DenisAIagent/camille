"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxGalleryProps {
    images: string[];
    basePath?: string;
}

export default function LightboxGallery({ images, basePath = '/images/photos/' }: LightboxGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

    useEffect(() => {
        // Pattern standard React Portal - Nécessaire pour éviter les erreurs d'hydratation SSR
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

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
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90"
                aria-label="Fermer"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:-translate-x-1 hidden md:block"
                aria-label="Précédent"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:translate-x-1 hidden md:block"
                aria-label="Suivant"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image Container - Centrage absolu */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                    <div
                        key={selectedIndex}
                        className={`relative max-w-[90vw] max-h-[90vh] w-auto h-auto pointer-events-auto ${direction === 'next' ? 'animate-slide-in-right' :
                            direction === 'prev' ? 'animate-slide-in-left' :
                                'animate-scale-in'
                            }`}
                        style={{
                            maxWidth: 'calc(100vw - 2rem)',
                            maxHeight: 'calc(100vh - 8rem)'
                        }}
                    >
                        {/* Container avec aspect ratio préservé */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={`${basePath}${images[selectedIndex]}`}
                                alt={`Galerie photo ${selectedIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full w-auto h-auto object-contain"
                                sizes="90vw"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur rounded-full text-white text-sm font-medium z-20 pointer-events-auto">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {images.map((photo, index) => (
                    <div
                        key={photo}
                        className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer shadow-sm hover:shadow-premium transition-all duration-500 hover:-translate-y-1"
                        onClick={() => setSelectedIndex(index)}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 z-10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                        </div>
                        <Image
                            src={`${basePath}${photo}`}
                            alt={`Cabinet Camille Labasse ${index + 1}`}
                            width={400}
                            height={400}
                            quality={85}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                ))}
            </div>

            {mounted && selectedIndex !== null && createPortal(lightboxContent, document.body)}
        </>
    );
}
