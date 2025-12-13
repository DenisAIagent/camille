import { useTranslations } from 'next-intl';

export default function SkipToContent() {
    const t = useTranslations('Navigation');

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:font-medium transition-all"
        >
            {t('skip_to_content')}
        </a>
    );
}
