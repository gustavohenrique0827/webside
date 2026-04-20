
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Determine the GraphQL URL based on environment
// In development (npm run dev): uses Vite proxy to forward /graphql to localhost:3000
// In production (Docker): nginx proxies /graphql to backend:3000
const getGraphQLUrl = () => {
  // Development: always use Vite proxy to backend port 3002
  if (import.meta.env.DEV) {
    console.log('✅ Development: Using Vite proxy /graphql → http://localhost:3002/graphql');
    return '/graphql';
  }
  // Production/Docker/nginx: use env or relative proxy
  if (import.meta.env.VITE_GRAPHQL_URL) {
    console.log(`Production: Using GraphQL URL ${import.meta.env.VITE_GRAPHQL_URL}`);
    return import.meta.env.VITE_GRAPHQL_URL;
  }
  console.log('Using relative /graphql (nginx proxy)');
  return '/graphql';
};

const httpLink = createHttpLink({
  uri: getGraphQLUrl(),
});

// Debug logging
console.log('GraphQL URL:', getGraphQLUrl());

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log('Auth token:', token ? 'Present' : 'None');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          leads: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          clientes: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          produtos: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          pedidos: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          orcamentos: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          contratos: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          faturas: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          implantacoes: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          colaboradores: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          empresas: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          status: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;

