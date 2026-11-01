"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

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

export default function SignUpPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
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
    <section className="mx-auto my-10 flex max-w-6xl flex-col gap-6 px-4">

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Create an Account
          </CardTitle>

          <CardDescription>
            Sign up with your Google account or email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignup}>
            <FieldGroup>

              {/* Google Signup */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={googleLoading || loading}
                  className="w-full"
                >
                  {googleLoading
                    ? "Connecting to Google..."
                    : "Continue with Google"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with email
              </FieldSeparator>

              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">
                  Name
                </FieldLabel>

                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              {/* Image */}
              <Field>
                <FieldLabel htmlFor="image">
                  Profile Image URL
                </FieldLabel>

                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter your image URL"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Password Rules */}
                <div className="mt-2 space-y-1 text-sm">

                  <p
                    className={cn(
                      "text-muted-foreground",
                      hasUppercase && "text-green-600"
                    )}
                  >
                    {hasUppercase ? "✓" : "○"} At least one uppercase (A-Z)
                  </p>

                  <p
                    className={cn(
                      "text-muted-foreground",
                      hasLowercase && "text-green-600"
                    )}
                  >
                    {hasLowercase ? "✓" : "○"} At least one lowercase (a-z)
                  </p>

                  <p
                    className={cn(
                      "text-muted-foreground",
                      hasMinLength && "text-green-600"
                    )}
                  >
                    {hasMinLength ? "✓" : "○"} Minimum 6 characters
                  </p>

                </div>
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  disabled={!passwordValid || loading || googleLoading}
                  className="w-full bg-green-800 hover:bg-green-900"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-green-700 underline"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our Terms of Service
        and Privacy Policy.
      </FieldDescription>

    </section>
  );
}