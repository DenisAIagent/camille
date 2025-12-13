"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ContactForm from '@/components/contact/ContactForm';
import { X } from 'lucide-react';

interface ContactModalProps {
    trigger: React.ReactNode;
}

export default function ContactModal({ trigger }: ContactModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Pattern standard React Portal - nécessaire pour éviter les erreurs d'hydratation
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Empêche le scroll du body quand la modale est ouverte
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const modalContent = (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="min-h-full flex items-center justify-center p-4">
                {/* Modal Content */}
                <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in-up my-8">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors touch-manipulation"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Modal Header */}
                    <div className="p-8 pb-6 border-b border-border">
                        <h2 className="text-3xl font-serif font-medium text-foreground pr-8">
                            Nous contacter
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Remplissez le formulaire ci-dessous pour exercer vos droits RGPD
                            ou toute autre demande.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="p-8">
                        <ContactForm onSuccess={() => setIsOpen(false)} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="text-primary hover:underline font-semibold inline-flex items-center"
                type="button"
            >
                {trigger}
            </button>

            {/* Modal Portal */}
            {mounted && isOpen && createPortal(modalContent, document.body)}
        </>
    );
}
