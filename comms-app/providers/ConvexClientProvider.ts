import { ConvexReactClient } from "convex/react";
import React from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

type Props = {
  children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
  return(
  <ClerkProvider publisableKey="pk_test_ZmFpci1lbGVwaGFudC0xMy5jbGVyay5hY2NvdW50cy5kZXYk">
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
)};

export default ConvexClientProvider;
