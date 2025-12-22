import { QueryClient } from "@tanstack/react-query";



export const Client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000 * 5,
            gcTime: 60 * 1000 * 10,
            retry: 4,
            refetchOnReconnect: true
        }
    }
});