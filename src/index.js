/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {connect} from 'react-redux'; // Provider 불러오기
import Subject from './component/Subject';
import TodoListContainer from './container/TodoListContainer';
import {styles} from './assets/basic';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

const Start = () => {
  return (
    <>
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
    </>
  );
};
// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  contents: state.todoReducer.contents,
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start);
