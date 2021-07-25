import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { ReactNode } from "react";
import { useToasts } from "react-toast-notifications";
import { useSession } from "../hooks/session";

export function GraphqlProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToasts();
  // const { logout } = useSession();

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: 'include'
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
          if (extensions && extensions.code) {
            if (extensions.code === 'FORBIDDEN') {
              //logout();
            }
          }
          const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
          console.error(msg)
          addToast(message, { appearance: 'error', autoDismiss: true })
        });
      }
    
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    return new ApolloClient({
      defaultOptions: {
        query: {
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      },
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache()
    });
  }, [addToast]);

  return  (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}