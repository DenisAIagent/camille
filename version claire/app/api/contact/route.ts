import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    captchaToken: string;
}

// Email HTML Template
function getEmailTemplate(name: string, email: string, message: string): string {
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
                                        <p style="margin: 0; font-size: 18px; color: #2a2c25; font-weight: 600;">${name}</p>
                                        <p style="margin: 8px 0 0 0; font-size: 14px; color: #EE6A22;">
                                            <a href="mailto:${email}" style="color: #EE6A22; text-decoration: none;">${email}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message -->
                            <div style="margin-bottom: 30px;">
                                <p style="margin: 0 0 12px 0; font-size: 12px; color: #6a6546; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Message</p>
                                <div style="padding: 20px; background-color: #f9f9f8; border-left: 4px solid #EE6A22; border-radius: 4px;">
                                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #2a2c25; white-space: pre-wrap;">${message}</p>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="mailto:${email}?subject=Re: Votre demande de contact" 
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

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, message, captchaToken } = body;

        // Validate required fields
        if (!name || !email || !message || !captchaToken) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Verify hCaptcha token
        const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;

        if (!hcaptchaSecret) {
            console.error('HCAPTCHA_SECRET_KEY is not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${hcaptchaSecret}&response=${captchaToken}`,
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            return NextResponse.json(
                { error: 'Invalid captcha' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL || 'contact@camille-osteopathe.com';

        if (!resendApiKey) {
            console.error('RESEND_API_KEY is not configured');
            // Log locally for development
            console.log('📧 Contact Form (Development Mode):', { name, email, message });
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
            console.error('Resend API Error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        console.log('✅ Email sent successfully:', data);

        return NextResponse.json(
            {
                success: true,
                message: 'Message envoyé avec succès',
                emailId: data?.id
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
