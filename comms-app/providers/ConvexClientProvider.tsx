"use client";

import React from "react";
import { ClerkProvider, useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import LoadingLogo from "@/components/shared/LoadingLogo";

type Props = {
  children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CONVEX_URL || !CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing environment variables for Convex or Clerk.");
}

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <RedirectToSignIn />
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
