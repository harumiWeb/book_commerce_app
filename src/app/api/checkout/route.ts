import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, res: Response) {
  const { title, price, bookId, userId } = await req.json();
  console.log(userId);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId: bookId,
      },
      client_reference_id: userId,
      line_items: [
        {
        price_data: {
          currency: "jpy",
          product_data: {
            name: title,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000",
  });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
