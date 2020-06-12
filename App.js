/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {Provider} from 'react-redux'; // Provider 불러오기
import configureStore from './src/store';
import client from './src/graphql/apolloClient';
import {AppRegistry} from 'react-native';
import Start from './src';

const App: () => React$Node = () => {
  return (
    <Provider store={configureStore()}>
      <ApolloProvider client={client}>
        <Start />
      </ApolloProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
