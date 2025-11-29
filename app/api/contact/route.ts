import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    captchaToken: string;
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

        // Send email using your preferred email service
        // For now, we'll log it and return success
        // You can integrate Resend, SendGrid, Nodemailer, etc.

        const emailContent = {
            to: process.env.CONTACT_EMAIL || 'camille@osteopathe-lisbonne.com',
            from: email,
            subject: `Nouveau message de ${name}`,
            text: `
Nom: ${name}
Email: ${email}

Message:
${message}
            `.trim(),
        };

        // TODO: Integrate your email service here
        // Example with Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send(emailContent);

        console.log('Contact form submission:', emailContent);

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully'
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
