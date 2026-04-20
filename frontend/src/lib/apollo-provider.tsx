'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloWebPostoProvider({ children }: ApolloProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
