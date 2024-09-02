import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextAuthProvider } from "./lib/next_auth/NextAuthProvider";
import { Suspense } from "react";
import LoadingSpinner from "./loading";
const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });


export const metadata: Metadata = {
  title: "Book Commerce",
  description: "Book Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
