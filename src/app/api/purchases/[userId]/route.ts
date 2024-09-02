import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
//購入履歴検索API
export async function GET(req: Request, {params}: {params: {userId: string}}) {
  const userId = params.userId;

  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(purchases);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
