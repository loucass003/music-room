import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
import { useMemo } from "react";
import { ReactNode } from "react";

export function GraphqlProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: 'include'
    });

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: {
        reconnect: true,
      }
      
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

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );

    return new ApolloClient({
      defaultOptions: {
        query: {
          errorPolicy: 'none',
        },
        mutate: {
          errorPolicy: 'none'
        }
      },
      link: from([errorLink, splitLink]),
      cache: new InMemoryCache()
    });
  }, []);

  return  (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}