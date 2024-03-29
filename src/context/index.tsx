"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./authContext";

function GlobalProviders({ children }: React.PropsWithChildren) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}

export default GlobalProviders;
