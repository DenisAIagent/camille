'use client';

import { X, Copy, Check, Smartphone, Monitor } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
    const tContact = useTranslations('Contact');
    const t = useTranslations('ContactModals.whatsapp');
    const [copied, setCopied] = useState(false);

    const whatsappNumber = tContact('whatsapp');
    const whatsappMessage = encodeURIComponent(tContact('whatsappMessage'));

    // Format le numéro pour l'affichage (ex: +351 912 345 678)
    const formatPhoneNumber = (number: string) => {
        // Ajoute le + au début et formate le numéro
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.startsWith('351')) {
            return `+351 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
        }
        return `+${cleaned}`;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`+${whatsappNumber}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
    };

    const handleOpenWhatsApp = (type: 'web' | 'mobile') => {
        const url = type === 'web'
            ? `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`
            : `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        window.open(url, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Container with Scroll */}
            <div className="fixed inset-0 z-[70] overflow-y-auto">
                <div className="min-h-full flex items-center justify-center p-4">
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden animate-scale-in my-8">
                        {/* Header */}
                        <div className="bg-[#25D366] p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                                aria-label={t('close')}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-3 pr-10">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#25D366">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <h3 className="text-2xl font-semibold leading-tight">{t('title')}</h3>
                                    <p className="text-white/90 text-sm mt-1">{t('subtitle')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Numéro avec bouton copier */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{t('phoneLabel')}</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-muted/50 border-2 border-border rounded-lg px-4 py-3 font-mono text-lg">
                                        {formatPhoneNumber(whatsappNumber)}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors border-2 border-border touch-manipulation"
                                        aria-label={t('phoneLabel')}
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Copy className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {copied && (
                                    <p className="text-sm text-green-600 animate-fade-in">✓ {t('copied')}</p>
                                )}
                            </div>

                            {/* Boutons d'action */}
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-muted-foreground">{t('openIn')}</p>

                                {/* Bouton Mobile */}
                                <button
                                    onClick={() => handleOpenWhatsApp('mobile')}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                                >
                                    <Smartphone className="w-5 h-5" />
                                    <span>{t('openApp')}</span>
                                </button>

                                {/* Bouton Web */}
                                <button
                                    onClick={() => handleOpenWhatsApp('web')}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 touch-manipulation"
                                >
                                    <Monitor className="w-5 h-5" />
                                    <span>{t('openWeb')}</span>
                                </button>
                            </div>

                            {/* Info */}
                            <p className="text-xs text-muted-foreground text-center pt-2">
                                {t('info')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
