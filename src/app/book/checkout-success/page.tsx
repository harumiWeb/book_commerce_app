"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const PurchaseSuccess = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [bookUrl, setBookUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session_id) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`;

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.newPurchase && data.newPurchase.bookId) {
            setBookUrl(data.newPurchase.bookId);
          } else {
            console.error('Invalid response data:', data);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [session_id]);
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます！
        </h1>
        <p className="text-center text-gray-600">
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/book/${bookUrl}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;