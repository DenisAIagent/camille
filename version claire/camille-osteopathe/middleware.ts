import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Middleware i18n de base
const intlMiddleware = createMiddleware(routing);

// Wrapper pour sécuriser les cookies
export default async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // Sécuriser le cookie NEXT_LOCALE
    const locale = request.cookies.get('NEXT_LOCALE');
    if (locale && response instanceof NextResponse) {
        response.cookies.set('NEXT_LOCALE', locale.value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 31536000, // 1 an
            path: '/',
        });
    }

    return response;
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
