
"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Mail,
  User,
  Image as ImageIcon,
  Check,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Password Validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordValid =
    hasUppercase && hasLowercase && hasMinLength;

  // Email Signup
  const handleEmailSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!passwordValid) {
      toast.error("Please enter a valid password!");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        image,
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error("Google signup failed!");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/5 lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#245c40] p-10 text-white lg:flex">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-10 bottom-20 h-52 w-52 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                KindNest
              </span>
            </Link>
          </div>

          <div className="relative z-10 my-12">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Be a part of something good
            </span>

            <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
              Small acts of kindness,
              <span className="text-green-200"> big changes.</span>
            </h1>

            <p className="mt-6 max-w-md leading-7 text-green-100">
              Create your account and connect with people who
              believe in helping communities and making a
              positive difference.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Discover community events near you",
                "Join meaningful social initiatives",
                "Create events and inspire others",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <Check className="h-4 w-4 text-green-200" />
                  </div>
                  <span className="text-sm text-green-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-green-200">
            Together, we can make kindness grow.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-5 py-9 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-2 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-800">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-[#245c40]">
                KindNest
              </span>
            </Link>

            <div className="mb-7">
              <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
                Get started today
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Join KindNest and start making a difference in
                your community.
              </p>
            </div>

            {/* Google Signup */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
              className="h-12 w-full gap-3 border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50"
            >
              {googleLoading ? (
                "Connecting to Google..."
              ) : (
                <>
                  <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 38.06 46.98 31.96 46.98 24.55Z" />
                    <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            {/* Separator */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Or sign up with email
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">

              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    disabled={loading || googleLoading}
                    className="h-12 border-gray-200 pl-10 focus-visible:ring-green-700"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    required
                    disabled={loading || googleLoading}
                    className="h-12 border-gray-200 pl-10 focus-visible:ring-green-700"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={loading || googleLoading}
                    className="h-12 border-gray-200 pl-10 focus-visible:ring-green-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading || googleLoading}
                    className="h-12 border-gray-200 pl-10 pr-11 focus-visible:ring-green-700"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Rules */}
                <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                  {[
                    { valid: hasUppercase, label: "One uppercase letter" },
                    { valid: hasLowercase, label: "One lowercase letter" },
                    { valid: hasMinLength, label: "At least 6 characters" },
                  ].map((rule) => (
                    <div
                      key={rule.label}
                      className={cn(
                        "flex items-center gap-2",
                        rule.valid ? "text-green-700" : "text-gray-400"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!passwordValid || loading || googleLoading}
                className="h-12 w-full gap-2 bg-[#245c40] text-base font-semibold text-white hover:bg-[#194b33] disabled:opacity-50"
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#245c40] hover:underline"
              >
                Login
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              By creating an account, you agree to our Terms of
              Service and Privacy Policy.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
