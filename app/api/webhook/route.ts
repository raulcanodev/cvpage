import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { handlePremiumPurchase } from '@/actions';

const verifySignature = (rawBody: Buffer, signature: string, secret: string): boolean => {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const receivedSignature = Buffer.from(signature, 'utf8');

    return crypto.timingSafeEqual(digest, receivedSignature);
};

export async function POST(req: NextRequest) {
    try {
        if (req.method !== 'POST') {
            return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }

        const rawBody = await req.arrayBuffer();
        const buffer = Buffer.from(rawBody);

        const signature = req.headers.get('x-signature') || '';
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

        if (!verifySignature(buffer, signature, secret)) {
            throw new Error('Invalid signature.');
        }

        const event = JSON.parse(buffer.toString());
        const eventType = event.meta.event_name;

        if (eventType === 'order_created') {
            const email = event.meta.custom_data.email;

            await handlePremiumPurchase(email);
        }

        return NextResponse.json({ message: 'Webhook received and processed' });
    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error al procesar el webhook:', err.message);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}