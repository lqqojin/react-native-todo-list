/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import client from './src/graphql/apolloClient';
import Subject from './src/component/Subject';
import TodoListContainer from './src/container/TodoListContainer';
import {styles} from './src/assets/basic';
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Subject />
              <TodoListContainer />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ApolloProvider>
    </>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
