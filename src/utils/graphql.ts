import 'cross-fetch/polyfill';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

import config from '@/config';
import { getToken } from '@/helpers/auth';

export const APOLLO_FETCH_POLICY = {
  DEFAULT: 'cache-first',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
  CACHE_AND_NETWORK: 'cache-and-network',
} as const;

const httpLink = new HttpLink({ uri: `${config.apiUrl}graphql` });
// const httpLink = new HttpLink({ uri: `50.18.85.58:6204/graphql` });
const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const cache = new InMemoryCache({
  addTypename: false,
});

// persistCache({
//   cache,
//   storage: localStorage as any,
// });

// if (localStorage['apollo-cache-persist']) {
//   let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
//   cache.restore(cacheData);
// }

const client = new ApolloClient({
  // name: 'aid25-web-client',
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first', // default
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
    // watchQuery: {
    //   fetchPolicy: 'cache-and-network',
    //   errorPolicy: 'ignore',
    // },
  },
});

export default client;

/*
[fetchPolicy]

1. cache-first: 항상 Cache를 먼저 확인한다. Cache 데이터가 없을경우 network 요청
2. network-first: Cache에서 초기데이터를 반환하지 않고 항상 network 요청
3. cache-only: Cache만 확인. Cache에 데이터가 없을 경우 Error를 반환한다.
4. cache-and-network: Cache를 확인하여 데이터를 반환. 이후 network요청을 하여 새로운 데이터를 가져와 Cache를 업데이트하며 Cache 데이터를 다시 반환한다.
5. no-cache: Cache를 확인하지 않고 항상 network 요청을 한다. network-only 정책과 달리 쿼리가 완료된 후 Cache 데이터를 읽지 않는다.

*/
