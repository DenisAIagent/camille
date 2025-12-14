import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { contactRateLimiter, contactHourlyLimiter } from '@/lib/redis';

// Zod schema for strong validation
const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long')
        .trim()
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters'),
    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email is too long')
        .toLowerCase()
        .trim(),
    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(5000, 'Message is too long')
        .trim(),
    captchaToken: z.string()
        .min(1, 'Captcha token is required'),
});

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Email HTML Template with escaped content
function getEmailTemplate(name: string, email: string, message: string): string {
    // Escape all user-provided content
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f1;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #EE6A22 0%, #F2AF1D 100%); border-radius: 12px 12px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                📬 Nouveau Message
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                Depuis le formulaire de contact
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <!-- Sender Info -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f3f4f1; border-radius: 8px;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6a6546; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Expéditeur</p>
                                        <p style="margin: 0; font-size: 18px; color: #2a2c25; font-weight: 600;">${safeName}</p>
                                        <p style="margin: 8px 0 0 0; font-size: 14px; color: #EE6A22;">
                                            <a href="mailto:${safeEmail}" style="color: #EE6A22; text-decoration: none;">${safeEmail}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message -->
                            <div style="margin-bottom: 30px;">
                                <p style="margin: 0 0 12px 0; font-size: 12px; color: #6a6546; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Message</p>
                                <div style="padding: 20px; background-color: #f9f9f8; border-left: 4px solid #EE6A22; border-radius: 4px;">
                                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #2a2c25; white-space: pre-wrap;">${safeMessage}</p>
                                </div>
                            </div>

                            <!-- Action Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="mailto:${safeEmail}?subject=Re: Votre demande de contact"
                                           style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #EE6A22 0%, #F2AF1D 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(238, 106, 34, 0.3);">
                                            Répondre par email
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #e5e5e5; background-color: #fafafa; border-radius: 0 0 12px 12px;">
                            <p style="margin: 0 0 8px 0; font-size: 14px; color: #6a6546;">
                                <strong>Camille Labasse</strong> - Ostéopathe D.O.
                            </p>
                            <p style="margin: 0; font-size: 13px; color: #7a7c6f;">
                                Espaço Oneleaf, Rua Rodrigues Sampaio n76, 1º<br>
                                1150-278 Lisboa, Portugal
                            </p>
                            <p style="margin: 12px 0 0 0; font-size: 12px; color: #a3a693;">
                                Cet email a été envoyé automatiquement depuis camille-osteopathe.com
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Helper function for fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeout);
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                   request.headers.get('x-real-ip') ||
                   'anonymous';

        // Apply rate limiting (only if Redis is configured)
        if (contactRateLimiter && contactHourlyLimiter) {
            // Check short-term limit (3 requests per 10 seconds)
            const { success: shortTermSuccess, reset: shortTermReset } = await contactRateLimiter.limit(ip);

            if (!shortTermSuccess) {
                const waitSeconds = Math.ceil((shortTermReset - Date.now()) / 1000);
                return NextResponse.json(
                    {
                        error: 'Too many requests. Please wait before trying again.',
                        retryAfter: waitSeconds
                    },
                    {
                        status: 429,
                        headers: {
                            'Retry-After': waitSeconds.toString(),
                            'X-RateLimit-Limit': '3',
                            'X-RateLimit-Remaining': '0',
                        }
                    }
                );
            }

            // Check hourly limit (10 requests per hour)
            const { success: hourlySuccess, reset: hourlyReset } = await contactHourlyLimiter.limit(ip);

            if (!hourlySuccess) {
                const waitSeconds = Math.ceil((hourlyReset - Date.now()) / 1000);
                return NextResponse.json(
                    {
                        error: 'Hourly limit exceeded. Please try again later.',
                        retryAfter: waitSeconds
                    },
                    {
                        status: 429,
                        headers: {
                            'Retry-After': waitSeconds.toString(),
                            'X-RateLimit-Limit': '10',
                            'X-RateLimit-Remaining': '0',
                        }
                    }
                );
            }
        }

        // Parse and validate request body
        const body = await request.json();

        // Validate with Zod
        const validationResult = contactFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Validation error',
                    details: validationResult.error.issues[0].message
                },
                { status: 400 }
            );
        }

        const { name, email, message, captchaToken } = validationResult.data;

        // Verify hCaptcha token with timeout
        const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;

        if (!hcaptchaSecret) {
            // Log error without exposing to client
            if (process.env.NODE_ENV === 'development') {
                console.error('[DEV] HCAPTCHA_SECRET_KEY is not configured');
            }
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        let verifyResponse;
        try {
            verifyResponse = await fetchWithTimeout(
                'https://hcaptcha.com/siteverify',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `secret=${hcaptchaSecret}&response=${captchaToken}`,
                },
                10000 // 10 second timeout
            );
        } catch (error) {
            // Don't log sensitive data in production
            if (process.env.NODE_ENV === 'development') {
                console.error('[DEV] hCaptcha verification timeout or error:', error);
            }
            return NextResponse.json(
                { error: 'Captcha verification failed' },
                { status: 500 }
            );
        }

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            return NextResponse.json(
                { error: 'Invalid captcha. Please try again.' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL || 'contact@camille-osteopathe.com';

        if (!resendApiKey) {
            // Development mode - don't log sensitive data
            if (process.env.NODE_ENV === 'development') {
                console.log('[DEV] Contact form submitted (RESEND_API_KEY not configured)');
                console.log('[DEV] Name length:', name.length, '| Email domain:', email.split('@')[1]);
            }
            return NextResponse.json(
                {
                    success: true,
                    message: 'Message reçu (mode développement)',
                    dev_mode: true
                },
                { status: 200 }
            );
        }

        const resend = new Resend(resendApiKey);

        // Send email with text fallback (all content is HTML-escaped)
        const { data, error } = await resend.emails.send({
            from: 'Site Web <noreply@camille-osteopathe.com>',
            to: [contactEmail],
            replyTo: email,
            subject: `📬 Nouveau message de ${name}`,
            html: getEmailTemplate(name, email, message),
            text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}

Message:
${message}

---
Cet email a été envoyé depuis le formulaire de contact sur camille-osteopathe.com
            `.trim(),
        });

        if (error) {
            // Log error without sensitive data
            if (process.env.NODE_ENV === 'development') {
                console.error('[DEV] Resend API Error:', error);
            }
            return NextResponse.json(
                { error: 'Failed to send email. Please try again.' },
                { status: 500 }
            );
        }

        // Success - only log in development, no sensitive data
        if (process.env.NODE_ENV === 'development') {
            console.log('[DEV] Email sent successfully, ID:', data?.id);
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Message envoyé avec succès',
            },
            { status: 200 }
        );

    } catch (error) {
        // Generic error handling without exposing details
        if (process.env.NODE_ENV === 'development') {
            console.error('[DEV] Error processing contact form:', error);
        }
        return NextResponse.json(
            { error: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
