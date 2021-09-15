import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { ReactNode } from "react";

export function GraphqlProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: 'include'
    });

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
          console.error( `[GraphQL error]: Message: ${message}`)
        });
      }
    
      if (networkError) console.log(`[Network error]: ${networkError}`);
      return forward(operation);
    });

    return new ApolloClient({
      defaultOptions: {
        query: {
          errorPolicy: 'none',
        },
        mutate: {
          errorPolicy: 'none'
        }
      },
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache()
    });
  }, []);

  return  (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}