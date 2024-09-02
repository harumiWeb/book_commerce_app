import Image from "next/image";
import React from "react";
import { UserType } from "../types/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next_auth/options";
import { getDetailBook } from "../lib/microcms/client";
import { BookType } from "../types/types";
import PurchaseBookCard from "../components/PurchaseBookCard";

let purchasesDetailBooks: BookType[] = [];

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions);
  const user: UserType = session?.user;
  let bookIds: string[] = [];
  if(user){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const purchases = await response.json();
      bookIds = purchases.map((purchase: { bookId: string }) => purchase.bookId);
      purchasesDetailBooks = await Promise.all(bookIds.map(async (bookId) => {
        return await getDetailBook(bookId);
      }));
      console.log(purchasesDetailBooks);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">{user.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="flex items-center gap-6">
        {purchasesDetailBooks.map((book: any) => (
          <PurchaseBookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}