import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // 環境変数名を修正
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	try {
		const body = await req.json();
		const { session_id } = body;
		if (!session_id) {
			return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
		}

		const session = await stripe.checkout.sessions.retrieve(session_id);
		const existingPurchase = await prisma.purchase.findFirst({
			where: {
				userId: session.client_reference_id,
				bookId: session.metadata.bookId,
			},
		});
		if (existingPurchase) {
			return NextResponse.json({ message: "購入済みです" });
		} else {
			const newPurchase = await prisma.purchase.create({
				data: {
					userId: session.client_reference_id,
					bookId: session.metadata.bookId,
					quantity: 1,
				},
			});
			return NextResponse.json({ newPurchase });
		}
	} catch (error) {
		return NextResponse.json({ message: "購入処理中にエラーが発生しました", error: error }, { status: 500 });
	}
}
