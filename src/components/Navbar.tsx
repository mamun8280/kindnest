
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Menu,
  X,
  CalendarDays,
  PlusCircle,
  LayoutDashboard,
  Heart,
  LogIn,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface User {
  name: string;
  image?: string | null;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Temporary user - পরে Better Auth connect করব
  const user: User | null = null;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile Hamburger - Left Side */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-3 rounded-xl border border-green-100 p-2 text-green-900 transition hover:bg-green-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/image/kindnest.jpg"
            alt="KindNest Logo"
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-green-900">
              <Link
            href="/" >KindNest </Link>  <span className="text-lime-500">.</span>
            </h1>

            <p className="text-[10px] font-semibold tracking-[2px] text-gray-500">
              SPREAD KINDNESS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
         
            
        

          <Link
            href="/upcoming-events"
            className="font-medium text-gray-700 transition hover:text-green-700"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="group relative">

              <button
                className="flex items-center gap-2 rounded-full border border-green-100 p-1.5 transition hover:bg-green-50"
                aria-label="User profile menu"
              >
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-green-200 object-cover"
                />

                <ChevronDown
                  size={16}
                  className="mr-1 text-green-800"
                />
              </button>

              {/* User Name */}
              <span className="pointer-events-none absolute right-0 top-14 hidden whitespace-nowrap rounded-lg bg-green-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                {user.name}
              </span>

              {/* Profile Dropdown */}
              <div className="invisible absolute right-0 top-14 w-56 translate-y-2 rounded-xl border border-green-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

                <Link
                  href="/create-event"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                >
                  <PlusCircle size={18} />
                  Create Event
                </Link>

                <Link
                  href="/manage-events"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                >
                  <LayoutDashboard size={18} />
                  Manage Events
                </Link>

                <Link
                  href="/joined-events"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                >
                  <Heart size={18} />
                  Joined Events
                </Link>

                <div className="my-1 border-t border-gray-100" />

                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <Button className="rounded-full bg-green-800 px-7 py-5 font-semibold text-white shadow-md transition hover:bg-green-900">
                <LogIn size={17} className="mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Profile */}
        {user && (
          <div className="ml-auto md:hidden">
            <Image
              src={user.image || "/default-avatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-green-200 object-cover"
            />
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-green-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-800"
            >
              Home
            </Link>

            <Link
              href="/upcoming-events"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-800"
            >
              <CalendarDays size={18} />
              Upcoming Events
            </Link>

            {user ? (
              <>
                <div className="my-2 border-t border-gray-100" />

                <div className="flex items-center gap-3 px-4 py-2">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span className="font-semibold text-green-900">
                    {user.name}
                  </span>
                </div>

                <Link
                  href="/create-event"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                >
                  <PlusCircle size={18} />
                  Create Event
                </Link>

                <Link
                  href="/manage-events"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                >
                  <LayoutDashboard size={18} />
                  Manage Events
                </Link>

                <Link
                  href="/joined-events"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50"
                >
                  <Heart size={18} />
                  Joined Events
                </Link>

                <button
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-3"
              >
                <Button className="w-full rounded-full bg-green-800 py-5 text-white hover:bg-green-900">
                  <LogIn size={18} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
