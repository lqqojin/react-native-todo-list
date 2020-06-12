import {ApolloClient} from 'apollo-boost'; // 수정
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory'; // 수정
const httpLink = new createHttpLink({
  uri: 'http://192.168.0.19:2999/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
