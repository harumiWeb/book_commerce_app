"use client";

import Image from "next/image";
import { BookType } from "../types/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line react/display-name
const Book = ({ book, isPurchased }: { book: BookType["book"], isPurchased: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const user: any = session?.user;
  const router = useRouter();
  const startCheckout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          price: book.price,
          bookId: book.id,
          userId: user?.id,
        }),
      }
    );
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    if(isPurchased){
      router.push(`/book/${book.id}`);
    }else{
      setIsModalOpen(true);
    }
  };
  const handlePurchaseConfirm = () => {
    if (!user) {
      setIsModalOpen(false);
      // ログインページにリダイレクト
      router.push("/login");
    } else {
      //Stripe決済する
      startCheckout();
    }
  };
  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4 max-w-sm">
        <a
          onClick={handleOpenModal}
          className="flex flex-col cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md object-cover"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
          </div>
        </a>

        {isModalOpen && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <h4 className="text-md mb-4">{book.title}</h4>
              <div className="flex justify-center">
                <button
                  onClick={handlePurchaseConfirm}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  購入する
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
