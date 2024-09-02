import Image from "next/image";
import React from "react";
import { getDetailBook } from "../../lib/microcms/client";
import { BookType } from "../../types/types";

const DetailBook = async ({ params }: { params: { bookID: string } }) => {
  const book: BookType["book"] | any= await getDetailBook(params.bookID);
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
          src={book.thumbnail.url}
          alt={book.title}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">公開日:{book.publishedAt.slice(0,10)}</span>
            <span className="text-sm text-gray-500">最終更新:{book.updatedAt.slice(0,10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;