"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

type ProfileMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  handleLogout: () => void;
  router: ReturnType<typeof useRouter>;
};

function ProfileMenu({
  user,
  handleLogout,
  router,
}: ProfileMenuProps) {
  const [imageError, setImageError] = useState(false);

  const userName = user.name || "KindNest User";
  const userInitial = userName.charAt(0).toUpperCase();

  const profileImage =
    user.image && !imageError ? user.image : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-green-100 p-1.5 transition hover:bg-green-50">
        <Avatar className="h-10 w-10 border-2 border-green-200">
          {profileImage && (
            <AvatarImage
              src={profileImage}
              alt={userName}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          )}

          <AvatarFallback className="bg-green-100 font-bold text-green-800">
            {userInitial}
          </AvatarFallback>
        </Avatar>

        <ChevronDown size={16} className="mr-1 text-green-800" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-xl p-2">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                {profileImage && (
                  <AvatarImage
                    src={profileImage}
                    alt={userName}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                )}

                <AvatarFallback className="bg-green-100 font-bold text-green-800">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate font-semibold text-green-900">
                  {userName}
                </span>

                <span className="truncate text-xs font-normal text-gray-500">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/create-event")}
          className="cursor-pointer gap-3 py-3"
        >
          <PlusCircle size={18} className="text-green-700" />
          Create Event
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/manage-events")}
          className="cursor-pointer gap-3 py-3"
        >
          <LayoutDashboard size={18} className="text-green-700" />
          Manage Events
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/joined-events")}
          className="cursor-pointer gap-3 py-3"
        >
          <Heart size={18} className="text-green-700" />
          Joined Events
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer gap-3 py-3 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const closeMenu = () => setIsOpen(false);

  // Logout Function
  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed!");
        return;
      }

      closeMenu();

      toast.success("Logged out successfully!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <section className="sticky top-0 z-50 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-3 rounded-xl border border-green-100 p-2 text-green-900 hover:bg-green-50 md:hidden"
          aria-label="Toggle navigation"
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
              KindNest <span className="text-lime-500">.</span>
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

        {/* Desktop Profile / Login */}
        <div className="hidden items-center gap-4 md:flex">
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <ProfileMenu
              user={user}
              handleLogout={handleLogout}
              router={router}
            />
          ) : (
            <Link
              href="/login"
              className="flex items-center rounded-full bg-green-800 px-7 py-3 font-semibold text-white hover:bg-green-900"
            >
              <LogIn size={17} className="mr-2" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Profile */}
        <div className="ml-auto md:hidden">
          {!isPending &&
            (user ? (
              <ProfileMenu
                user={user}
                handleLogout={handleLogout}
                router={router}
              />
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-900"
              >
                Login
              </Link>
            ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-green-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-green-50"
            >
              Home
            </Link>

            <Link
              href="/upcoming-events"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-green-50"
            >
              <CalendarDays size={18} />
              Upcoming Events
            </Link>

            {user && (
              <>
                <div className="my-2 border-t border-gray-100" />

                <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  My Account
                </p>

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

                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="ghost"
                  className="justify-start gap-3 px-4 text-red-600 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}