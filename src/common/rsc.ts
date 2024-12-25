import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { fetchClient } from './fetch';

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  return fetchClient;
});

export const rsc = getClient;
