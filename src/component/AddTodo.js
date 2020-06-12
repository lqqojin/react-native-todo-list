import React, {useState} from 'react';
import {Button, TextInput, View, Alert} from 'react-native';
import {styles} from '../assets/basic';

function AddTodo(props) {
  const [data, onChangeText] = useState('');
  const {submit} = props;
  return (
    <View style={styles.fixToText}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
        placeholder="GraphQL Apollo React TodoList"
        maxLength={300}
        onChangeText={text => onChangeText(text)}
        value={data}
      />
      <Button
        onPress={() => {
          Alert.alert('저장할게요.');
          submit({desc: data, status: 'active'});
          onChangeText('');
        }}
        color="#f194ff"
        title="Add Todo"
      />
    </View>
    // </form>
  );
}

export default AddTodo;
