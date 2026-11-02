"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
  Sparkles,
  ArrowUpRight,
  Moon,
  Sun,
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

// ========================================
// DARK / LIGHT MODE TOGGLE
// ========================================

function subscribeToNothing() {
  return () => {};
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-green-800 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300"
      >
        <Moon size={19} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-green-800 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300 dark:hover:bg-slate-700"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

// ========================================
// PROFILE MENU
// ========================================

type ProfileMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  handleLogout: () => void;
  isLoggingOut: boolean;
};

function ProfileMenu({
  user,
  handleLogout,
  isLoggingOut,
}: ProfileMenuProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const userName = user.name || "KindNest User";
  const userInitial = userName.charAt(0).toUpperCase();

  const profileImage =
    user.image && !imageError ? user.image : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full border border-green-100 bg-white p-1.5 pr-3 shadow-sm transition-all duration-300 hover:border-green-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">

        <Avatar className="h-10 w-10 border-2 border-green-100 dark:border-slate-700">
          {profileImage && (
            <AvatarImage
              src={profileImage}
              alt={userName}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          )}

          <AvatarFallback className="bg-green-100 font-bold text-green-800 dark:bg-slate-700 dark:text-green-300">
            {userInitial}
          </AvatarFallback>
        </Avatar>

        <div className="hidden max-w-28 text-left sm:block">
          <p className="truncate text-sm font-bold text-green-950 dark:text-white">
            {userName}
          </p>

          <p className="text-[10px] font-medium text-green-600 dark:text-green-400">
            My Account
          </p>
        </div>

        <ChevronDown
          size={16}
          className="text-green-700 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-green-400"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72 rounded-2xl border border-green-100 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-green-100 dark:border-slate-700">
                {profileImage && (
                  <AvatarImage
                    src={profileImage}
                    alt={userName}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                )}

                <AvatarFallback className="bg-green-100 text-lg font-bold text-green-800 dark:bg-slate-700 dark:text-green-300">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-green-950 dark:text-white">
                  {userName}
                </p>

                <p className="truncate text-xs font-normal text-gray-500 dark:text-slate-400">
                  {user.email}
                </p>

                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Active Account
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-green-100 dark:bg-slate-700" />

        <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 dark:text-slate-500">
          Event Management
        </div>

        <DropdownMenuItem
          onClick={() => router.push("/create-event")}
          className="cursor-pointer gap-3 rounded-xl px-3 py-3 focus:bg-green-50 dark:focus:bg-slate-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
            <PlusCircle size={18} />
          </span>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Create Event
            </p>

            <p className="text-[11px] text-gray-500 dark:text-slate-400">
              Organize a new event
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/manage-events")}
          className="cursor-pointer gap-3 rounded-xl px-3 py-3 focus:bg-green-50 dark:focus:bg-slate-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <LayoutDashboard size={18} />
          </span>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Manage Events
            </p>

            <p className="text-[11px] text-gray-500 dark:text-slate-400">
              Manage your activities
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/joined-events")}
          className="cursor-pointer gap-3 rounded-xl px-3 py-3 focus:bg-green-50 dark:focus:bg-slate-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
            <Heart size={18} />
          </span>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Joined Events
            </p>

            <p className="text-[11px] text-gray-500 dark:text-slate-400">
              Events you have joined
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-green-100 dark:bg-slate-700" />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer gap-3 rounded-xl px-3 py-3 text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/40 dark:focus:text-red-400"
        >
          <LogOut size={18} />

          <span className="font-semibold">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ========================================
// MAIN NAVBAR
// ========================================

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => pathname === path;

  // LOGOUT
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

  const navLinks = [
    {
      name: "Upcoming Events",
      href: "/upcoming-events",
      icon: CalendarDays,
    },
  ];

  return (
    

    <header className="sticky top-0 z-50 border-b border-green-100/80 bg-white/90 shadow-[0_4px_25px_rgba(31,78,53,0.05)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">

      <nav className="mx-auto flex h-19 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 text-green-900 transition hover:bg-green-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="relative">
            <Image
              src="/image/kindnest.jpg"
              alt="KindNest Logo"
              width={46}
              height={46}
              priority
              className="h-11 w-11 rounded-xl object-cover shadow-sm transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105"
            />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-lime-400">
              <Sparkles size={8} className="text-green-900" />
            </span>
          </div>

          <div>
            <h1 className="text-[22px] font-extrabold leading-none tracking-tight text-green-950 dark:text-white sm:text-2xl">
              KindNest<span className="text-lime-500">.</span>
            </h1>

            <p className="mt-1 text-[9px] font-bold tracking-[2.5px] text-green-700 dark:text-green-400">
              SPREAD KINDNESS
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-300"
                }`}
              >
                <Icon size={17} />
                {item.name}

                {active && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP AUTHENTICATION + THEME */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-green-50 dark:bg-slate-800" />
          ) : user ? (
            <ProfileMenu
              user={user}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-green-800 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-green-800/15 transition-all hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
            >
              <LogIn size={17} />
              Login
              <ArrowUpRight size={15} />
            </Link>
          )}

          <ThemeToggle />
        </div>

        {/* MOBILE AUTHENTICATION + THEME */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          {!isPending &&
            (user ? (
              <ProfileMenu
                user={user}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-green-800 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-green-900"
              >
                Login
              </Link>
            ))}

          <ThemeToggle />
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isOpen && (
        <div className="animate-in slide-in-from-top-2 border-t border-green-100 bg-white px-4 py-5 shadow-xl duration-200 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            <div className="mb-2 rounded-2xl bg-linear-to-r from-green-50 to-lime-50 p-4 dark:from-slate-800 dark:to-slate-900">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                <Heart size={18} />

                <p className="text-sm font-bold">
                  Small acts, big changes.
                </p>
              </div>

              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                Be part of something meaningful.
              </p>
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "text-gray-700 hover:bg-green-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="my-2 border-t border-green-100 dark:border-slate-800" />

                <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-slate-500">
                  My Account
                </p>

                <Link
                  href="/create-event"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <PlusCircle size={19} className="text-green-700 dark:text-green-400" />
                  Create Event
                </Link>

                <Link
                  href="/manage-events"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <LayoutDashboard size={19} className="text-blue-600 dark:text-blue-400" />
                  Manage Events
                </Link>

                <Link
                  href="/joined-events"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Heart size={19} className="text-rose-600 dark:text-rose-400" />
                  Joined Events
                </Link>

                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="ghost"
                  className="mt-1 h-11 justify-start gap-3 rounded-xl px-4 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                >
                  <LogOut size={19} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link
                  href="/signUp"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl border border-green-200 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50 dark:border-slate-700 dark:text-green-300 dark:hover:bg-slate-800"
                >
                  Sign Up
                </Link>

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-800 py-3 text-sm font-bold text-white transition hover:bg-green-900"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}