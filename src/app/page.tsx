import Book from "./components/Book";
import { getBooks } from "./lib/microcms/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next_auth/options";
import { UserType } from "./types/types";
// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getBooks();
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
      // console.log(purchases);
      bookIds = purchases.map((purchase: { bookId: string }) => purchase.bookId);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  }
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        <div className="grid grid-cols-3 grid-rows-auto">
        {contents.map((book: any) => (
            <Book key={book.id} book={book} isPurchased={bookIds.includes(book.id)}/>
          ))}
        </div>
      </main>
    </>
  );
}