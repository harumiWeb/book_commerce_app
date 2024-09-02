import { createClient } from "microcms-js-sdk";
import { BookType } from "../../types/types";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID as string,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
});

export const getBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "e-book",
  });
  return allBooks;
  
};

export const getDetailBook = async (bookId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "e-book",
    contentId: bookId,
  });
  return detailBook;
};