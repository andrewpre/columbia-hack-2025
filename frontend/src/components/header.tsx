"use client";

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
import Image from "next/image";
import { useState, useEffect } from "react";

export function Header() {
  const [userId, setUserId] = useState<string | null>(null); //localStorage.getItem("userId")
  const [status, setStatus] = useState<"authenticated" | "unauthenticated">(
    userId ? "authenticated" : "unauthenticated"
  );
  useEffect(() => {
    // Event listener for when localStorage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userId") {
        setUserId(event.newValue);
        setStatus("authenticated");
      }
      setStatus("unauthenticated");
    };

    // Adding the event listener when the component mounts
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array to only run on mount/unmount

  return (
    <header className="bg-white shadow-md p-6 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/saign_logo.svg"
            alt="s[A]ign Logo"
            width={45}
            height={15}
          />
          <span className="text-2xl font-bold text-blue-600">s[AI]gn</span>
        </Link>

        {/* Navbar Links */}
        <nav className="flex gap-10">
          <Link
            className="text-lg text-black font-semibold hover:text-blue-500 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-lg text-black font-semibold hover:text-blue-500 transition-colors"
            href="/course"
          >
            Course
          </Link>
          {/* <Link
            className="text-lg text-black font-semibold hover:text-blue-500 transition-colors"
            href="/leaderboard"
          >
            Leaderboard
          </Link> */}
          {/* <Link
            className="text-lg text-black font-semibold hover:text-blue-500 transition-colors"
            href="/game"
          >
            Game
          </Link> */}

          {status === "authenticated" && (
            <Link
              className="text-lg text-black font-semibold hover:text-blue-500 transition-colors"
              href="/game"
            >
              Play
            </Link>
          )}
        </nav>
      </div>

      <div className="flex gap-4">
        {status === "unauthenticated" ? (
          <>
            <Button
              className="px-8 py-2 border border-blue-500 text-blue-500 text-lg font-semibold rounded-full hover:bg-blue-100"
              onClick={() => redirect("/sign-in") /*signIn()*/}
            >
              Login
            </Button>
            <Button
              className="px-8 py-2 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600"
              onClick={() => redirect("/sign-up") /*signIn()*/}
            >
              Sign Up
            </Button>
          </>
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
                <Link className="flex items-center" href="/settings-page">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={
                  () =>
                    localStorage.removeItem(
                      "userId"
                    ) /*signOut({ callbackUrl: "/" }) */
                }
              >
                <span className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1">
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
