import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../assets/basic';
import {useMutation} from '@apollo/react-hooks';
import {LIKE_TODO} from '../graphql/todoQuery';

function TodoList(props) {
  let {id, desc, status, isLiked, onDelete, onUpdate} = props;
  const [toggleLikeTodo] = useMutation(LIKE_TODO, {
    variables: {id: id, isLiked},
  });

  console.log({id, desc, status, isLiked});
  return (
    <View style={styles.contentText}>
      {status === 'complete' ? (
        <Text
          style={styles.del}
          onPress={() => {
            status = status === 'active' ? 'complete' : 'active';
            onUpdate(id, {status});
          }}>
          {desc}
        </Text>
      ) : (
        <Text
          onPress={() => {
            status = status === 'active' ? 'complete' : 'active';
            onUpdate(id, {status});
          }}>
          {desc}
        </Text>
      )}
      <Button
        style={styles.button}
        onPress={() => {
          console.log('delete 클릭');
          onDelete(id);
        }}
        color="skyblue"
        title="&times;"
      />
      <Button onPress={toggleLikeTodo} title={isLiked ? 'UnLike' : 'Like'} />
    </View>
  );
}

export default TodoList;
