import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  // Get the secret token from the environment variable
  const secret = process.env.STRAPI_WEBHOOK_SECRET;

  // Get the header from the request
  const strapiSecret = req.headers.get('x-strapi-webhook-secret');

  // Validate the secret
  if (strapiSecret !== secret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Process the webhook payload
  const data = await req.json();
  console.log('Received webhook:', data);

  // Revalidate major paths
  revalidatePath('/');
  revalidatePath('/reads');
  revalidatePath('/events');
  revalidatePath('/videos');
  revalidatePath('/reads/[slug]', 'page');
  revalidatePath('/events/[slug]', 'page');

  // Respond with a success status
  return NextResponse.json({
    message: 'Webhook received and paths revalidated successfully',
  });
}
