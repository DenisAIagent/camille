'use client';

import { X, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, FormEvent, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
    const t = useTranslations('ContactModals.email');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);

    const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
    const isHCaptchaConfigured = Boolean(hcaptchaSiteKey);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isHCaptchaConfigured && !captchaToken) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    captchaToken
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setCaptchaToken(null);
            captchaRef.current?.resetCaptcha();

            // Close modal after 2 seconds on success
            setTimeout(() => {
                onClose();
                setSubmitStatus('idle');
            }, 2000);
        } catch (err) {
            console.error('Error sending message:', err);
            setSubmitStatus('error');
            setCaptchaToken(null);
            captchaRef.current?.resetCaptcha();
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const onCaptchaExpire = () => {
        setCaptchaToken(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
                        <div className="bg-gradient-warm p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                                aria-label={t('close')}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-3 pr-10">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <Send className="w-7 h-7 text-primary" />
                                </div>
                                <div className="text-white">
                                    <h3 className="text-2xl font-semibold leading-tight">{t('title')}</h3>
                                    <p className="text-white/90 text-sm mt-1">{t('subtitle')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                                        {t('nameLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('namePlaceholder')}
                                        required
                                        className="w-full bg-muted/50 border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-base"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                                        {t('emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('emailPlaceholder')}
                                        required
                                        className="w-full bg-muted/50 border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-base"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                                        {t('messageLabel')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('messagePlaceholder')}
                                        required
                                        rows={5}
                                        className="w-full bg-muted/50 border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-base"
                                    />
                                </div>

                                {/* hCaptcha */}
                                {isHCaptchaConfigured ? (
                                    <div className="flex justify-center py-2">
                                        <HCaptcha
                                            ref={captchaRef}
                                            sitekey={hcaptchaSiteKey!}
                                            onVerify={onCaptchaVerify}
                                            onExpire={onCaptchaExpire}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-sm text-yellow-800">
                                        ⚠️ hCaptcha non configuré. Ajoutez NEXT_PUBLIC_HCAPTCHA_SITE_KEY à votre .env.local
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || (isHCaptchaConfigured && !captchaToken)}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 gradient-warm text-white rounded-xl font-medium transition-all hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>{isSubmitting ? t('sending') : t('send')}</span>
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <p className="text-sm text-green-600 text-center animate-fade-in font-medium">
                                        ✓ {t('success')}
                                    </p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-sm text-red-600 text-center animate-fade-in font-medium">
                                        ✗ {t('error')}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
