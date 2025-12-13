'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import WhatsAppModal from './WhatsAppModal';
import EmailModal from './EmailModal';

export default function FloatingContactButtons() {
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);

    return (
        <>
            <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
                {/* WhatsApp Button */}
                <button
                    onClick={() => setIsWhatsAppOpen(true)}
                    className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                    aria-label="Contact via WhatsApp"
                >
                    <MessageCircle className="w-6 h-6" />

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        WhatsApp
                    </span>

                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
                </button>

                {/* Email Button */}
                <button
                    onClick={() => setIsEmailOpen(true)}
                    className="group relative flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                    aria-label="Contact via Email"
                >
                    <Mail className="w-6 h-6" />

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        Email
                    </span>
                </button>
            </div>

            {/* Modals */}
            <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
            <EmailModal isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />
        </>
    );
}
