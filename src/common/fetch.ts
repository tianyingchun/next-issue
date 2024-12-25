import { getCookie, setCookie } from 'cookies-next';
import { cookieActiveLocale, cookieAuthTokenKey } from '@/config/constants';
import { getCookieOptions } from '@/config/getCookieOptions';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:4001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // Disabling RSC fetch caching
  fetchOptions: {
    next: {
      // (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
      revalidate: 60, // 1 minute
    },
  },
  fetch: async (uri, options) => {
    const headers = options?.headers || {};
    const languageCode = (headers as any)['languagecode'];
    if (languageCode) {
      uri = uri + '?languageCode=' + languageCode;
      delete (headers as any)['languagecode'];
    }
    const response = await fetch(uri, options);
    const respHeaders = response.headers;
    const token = respHeaders.get('auth-token');
    if (token) {
      const { maxAge, expires } = getCookieOptions();
      await setCookie(cookieAuthTokenKey, token, {
        maxAge,
        expires,
      });
    }
    return response;
  },
});

// https://github.com/apollographql/apollo-client/issues/2441
const authMiddleware = new ApolloLink((operation, forward) => {
  const { authToken, activeLanguage } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      languageCode: activeLanguage || 'en',
    },
  }));
  return forward(operation);
});

const withToken = setContext(async (_, prevContext) => {
  const activeLanguage =
    prevContext[cookieActiveLocale] || (await getCookie(cookieActiveLocale));
  const authToken = await getCookie(cookieAuthTokenKey);
  return { activeLanguage, authToken };
});

export const fetchClient = new ApolloClient({
  cache: new InMemoryCache({}),
  link: ApolloLink.from([withToken, authMiddleware.concat(httpLink)]),
  // https://www.apollographql.com/docs/react/api/core/ApolloClient#defaultoptions
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
