import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-4xl font-serif mb-4">404</h1>
            <p className="text-muted-foreground mb-8">Page not found</p>
            <Link href="/" className="text-primary hover:underline">Go back home</Link>
        </div>
    );
}
