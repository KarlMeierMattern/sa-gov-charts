"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import PropTypes from "prop-types";

const queryDefaults = {
  staleTime: 604800,
  gcTime: 604800,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: queryDefaults,
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
