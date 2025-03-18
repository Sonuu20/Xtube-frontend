import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }) {
  return <QueryClient client={queryClient}>{children}</QueryClient>;
}
