import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../assets/basic';

function TodoList(props) {
  let {id, desc, status, onDelete, onUpdate} = props;
  console.log(id, desc, status);
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
    </View>
  );
}

export default TodoList;
