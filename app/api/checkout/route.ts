import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import config from '@/config';

export const dynamic = "force-dynamic";

export async function POST(req: NextResponse) {
  const LEMONSQUEEZY_ENDPOINT = "https://api.lemonsqueezy.com/v1/checkouts";
  const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID?.toString();
  const API_KEY = process.env.LEMONSQUEEZY_API_KEY;

  try {
    const reqData = await req.json();
    const { email, productId, user_id } = reqData;

    // Validate the request body before proceeding

    // if (!productId) {
    //   console.error("Product ID is missing");
    //   return NextResponse.json({ message: "Refresh the page and try again" }, { status: 400 });
    // }

    if (!email) {
      console.error("Email is missing");
      return NextResponse.json({ message: "Refresh the page and try again"}, { status: 400 });
    }

    const response = await fetch(LEMONSQUEEZY_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: {
                redirect_url: `${config.domainUrl}/dashboard/settings`, // Redirect URL after successful purchase
            },
            checkout_data: {
              custom: {
                // Data that will be sent back to the webhook
                email: email,
                user_id: user_id,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: config.lemonsqueezy.productID,
              },
            },
          },
        },
      }),
    });

    // Handle the response from the Lemon Squeezy API
    if (!response.ok) {
      console.error("Error in POST /api/checkout:", response.statusText);
      return NextResponse.json({ message: "An error occurred" }, { status: response.status });
    }

    const responseData = await response.json();
    const checkoutUrl = responseData.data.attributes.url;

    // Handle the response from the Lemon Squeezy API
    return NextResponse.json({ checkoutUrl });

  } catch (error) {
    console.error("Error in POST /api/checkout:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
