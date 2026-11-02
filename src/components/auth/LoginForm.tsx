
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Leaf,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const requestedURL = searchParams.get("callbackURL");

  const callbackURL =
    requestedURL?.startsWith("/") &&
    !requestedURL.startsWith("//")
      ? requestedURL
      : "/";

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      if (data) {
        toast.success("Welcome back to KindNest!");

        router.replace(callbackURL);
        router.refresh();
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "Google login failed!");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Unable to login with Google!");
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-14",
        className
      )}
      {...props}
    >
      <div className="grid overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/5 lg:grid-cols-2">

        {/* Left Side - Welcome Section */}
        <div className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#173f30] via-[#245c43] to-[#34765a] p-10 text-white lg:flex xl:p-14">

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                KindNest
              </span>
            </Link>

            <div className="mt-24 max-w-md">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-green-50">
                <Sparkles className="h-4 w-4" />
                Together, We Make a Difference
              </span>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Small Acts.
                <br />
                <span className="text-green-200">
                  Big Changes.
                </span>
              </h1>

              <p className="mt-6 text-base leading-8 text-green-50/80">
                Join a community of kind hearts. Discover local
                volunteering events, support people in need, and
                make your community a better place.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Heart className="mb-3 h-6 w-6 text-green-200" />
              <p className="text-2xl font-bold">Spread Love</p>
              <p className="mt-1 text-sm text-green-50/70">
                Every little action matters.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Users className="mb-3 h-6 w-6 text-green-200" />
              <p className="text-2xl font-bold">Build Community</p>
              <p className="mt-1 text-sm text-green-50/70">
                Together we are stronger.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center bg-[#fcfdfb] px-5 py-12 sm:px-10 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-2 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-800 text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-green-900">
                KindNest
              </span>
            </Link>

            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                Welcome Back
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Continue your journey of making a positive
                difference in your community.
              </p>
            </div>

            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="hidden p-0">
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to KindNest</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleLogin}>
                  <FieldGroup className="gap-5">

                    {/* Google Login */}
                    <Field>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading || loading}
                        className="h-12 w-full gap-3 rounded-xl border-gray-200 bg-white font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                      >
                        {googleLoading ? (
                          <span className="animate-spin">◌</span>
                        ) : (
                          <svg
                            viewBox="0 0 48 48"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.77 7.18l7.73 6C44.4 37.98 46.98 31.78 46.98 24.55Z" />
                            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                          </svg>
                        )}

                        {googleLoading
                          ? "Connecting to Google..."
                          : "Continue with Google"}
                      </Button>
                    </Field>

                    <FieldSeparator className="text-xs text-gray-400">
                      OR CONTINUE WITH EMAIL
                    </FieldSeparator>

                    {/* Email */}
                    <Field className="gap-2">
                      <FieldLabel
                        htmlFor="email"
                        className="font-semibold text-gray-700"
                      >
                        Email Address
                      </FieldLabel>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <Input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                          className="h-12 rounded-xl border-gray-200 bg-white pl-10 focus-visible:border-green-600 focus-visible:ring-green-600/20"
                        />
                      </div>
                    </Field>

                    {/* Password */}
                    <Field className="gap-2">
                      <div className="flex items-center justify-between">
                        <FieldLabel
                          htmlFor="password"
                          className="font-semibold text-gray-700"
                        >
                          Password
                        </FieldLabel>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          required
                          autoComplete="current-password"
                          className="h-12 rounded-xl border-gray-200 bg-white pl-10 pr-11 focus-visible:border-green-600 focus-visible:ring-green-600/20"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-700"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </Field>

                    {/* Login Button */}
                    <Field>
                      <Button
                        type="submit"
                        disabled={loading || googleLoading}
                        className="h-12 w-full rounded-xl bg-[#34765a] text-base font-semibold text-white shadow-md shadow-green-900/10 transition hover:bg-[#285c45]"
                      >
                        {loading ? (
                          "Logging in..."
                        ) : (
                          <>
                            Login to KindNest
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </Field>

                    {/* Signup Link */}
                    <FieldDescription className="pt-2 text-center text-sm text-gray-500">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signUp"
                        className="font-bold text-green-700 hover:text-green-900 hover:underline"
                      >
                        Create an account
                      </Link>
                    </FieldDescription>

                  </FieldGroup>
                </form>
              </CardContent>
            </Card>

            <p className="mt-8 text-center text-xs leading-6 text-gray-400">
              By continuing, you agree to our{" "}
              <span className="font-medium text-green-700">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-medium text-green-700">
                Privacy Policy
              </span>.
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Heart className="h-3.5 w-3.5 text-green-600" />
              Made with kindness, powered by community.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
