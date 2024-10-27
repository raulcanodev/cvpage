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
    console.log('Webhook received');
    try {
        if (req.method !== 'POST') {
            console.log('Method not allowed');
            return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }

        const rawBody = await req.arrayBuffer();
        const buffer = Buffer.from(rawBody);

        const signature = req.headers.get('x-signature') || '';
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

        console.log('Verifying signature');
        if (!verifySignature(buffer, signature, secret)) {
            console.log('Invalid signature');
            throw new Error('Invalid signature.');
        }

        console.log('Signature verified');
        const event = JSON.parse(buffer.toString());
        console.log('Event parsed:', event);
        const eventType = event.meta.event_name;
        console.log('Event type:', eventType);

        if (eventType === 'order_created') {
            const email = event.meta.custom_data.email;
            console.log('Processing order for email:', email);

            await handlePremiumPurchase(email);
            console.log('Premium purchase handled');
        }

        console.log('Webhook processing completed');
        return NextResponse.json({ message: 'Webhook received and processed' });
    } catch (error: unknown) {
        const err = error as Error;
        console.error('Error processing webhook:', err.message);
        console.error('Error stack:', err.stack);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}