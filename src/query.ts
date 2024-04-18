import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

const QueryKey = {
  SEARCH: "search",
  LINKED_PROFILE: "linked-profile",
  PROFILE: "profile",
  METRICS: "metrics",
  EVENTS: "events",
}

export { queryClient, QueryKey };
