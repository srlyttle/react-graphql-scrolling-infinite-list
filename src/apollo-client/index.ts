import ApolloClient from 'apollo-boost';
import { githubKey } from '../config/keys';

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${githubKey}`,
  },
});
