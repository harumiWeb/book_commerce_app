import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next_auth/options";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  // const router = useRouter();

  // const handleSignOut = async () => {
  //   await signOut({ redirect: false });
  //   router.push("/login");
  // };

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            ホーム
          </Link>
          <Link
            href={session?.user ? "/profile" : "/login"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {session?.user ? "プロフィール" : "ログイン"}
          </Link>
          {session?.user && (
            <Link
              href="/api/auth/signout"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              ログアウト
            </Link>
          )}

          <Link href={session?.user ? "/profile" : "/login"}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={session?.user?.image || "/default_icon.png"}
              className="rounded-full"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;