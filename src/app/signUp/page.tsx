
"use client";

import { useState } from "react";
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
import { authClient } from "../../lib/auth-client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordValid =
    hasUppercase && hasLowercase && hasMinLength;

  const handleEmailSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!passwordValid) return;

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(
      formData.entries()
    ) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto my-10">
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
              <Field>
                <Button variant="outline" type="button">
                  Login with Apple
                </Button>

                <Button variant="outline" type="button">
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter image url"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="space-y-1 text-sm mt-2">
                  <p className={cn(
                    "text-muted-foreground",
                    hasUppercase && "text-green-600"
                  )}>
                    {hasUppercase ? "✓" : "○"} At least one uppercase (A-Z)
                  </p>

                  <p className={cn(
                    "text-muted-foreground",
                    hasLowercase && "text-green-600"
                  )}>
                    {hasLowercase ? "✓" : "○"} At least one lowercase (a-z)
                  </p>

                  <p className={cn(
                    "text-muted-foreground",
                    hasMinLength && "text-green-600"
                  )}>
                    {hasMinLength ? "✓" : "○"} Minimum 6 characters length
                  </p>
                </div>
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={!passwordValid}
                >
                  Sign Up
                </Button>

                <FieldDescription className="text-center">
                  Have an account?{" "}
                  <Link href="/login" className="underline">
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
    </div>
  );
}
