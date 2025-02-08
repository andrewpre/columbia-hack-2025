"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { User, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

export function Header() {
  // const { data: session, status } = useSession();
  const status = "authenticated";

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <span className="sr-only">sAIgn</span>
      </Link>
      <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/course"
        >
          Course
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/leaderboard"
        >
          Leaderboard
        </Link>

        {status === "authenticated" && (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/"
            >
              Authenticated Tab
            </Link>
          </>
        )}
        {status === "unauthenticated" ? (
          <div>
            <Button
              className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1"
              onClick={() => redirect("/") /*signIn()*/}
            >
              Login
            </Button>
            <Button
              className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1"
              onClick={() => redirect("/") /*signIn()*/}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full border border-black"
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  className="flex flex-row justify-center items-center"
                  href="/settings-page"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <h1>Settings</h1>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={
                  () => redirect("/") /*signOut({ callbackUrl: "/" }) */
                }
              >
                <span className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1">
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
