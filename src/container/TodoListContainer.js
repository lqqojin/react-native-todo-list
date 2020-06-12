import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import TodoList from '../component/TodoList.js';
import AddTodo from '../component/AddTodo';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {
  Q_TODO_LIST,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from '../graphql/todoQuery';

const filter = (data, predicate) => {
  let newArray = [];
  let i = 0;
  let len = data.length;
  while (i < len) {
    if (predicate(data[i], i)) {
      newArray.push(data[i]);
    }
    i += 1;
  }
  return newArray;
};

const countMaxId = data => {
  let maxTodo = data.reduce((pre, cur) => {
    if (pre && cur && pre.id && cur.id) {
      return pre.id > cur.id ? pre : cur;
    }
    return pre;
  });
  return maxTodo.id;
};

function TodoListContainer(props) {
  let [todoList, setTodoList] = useState([]);
  const [maxId, setMaxId] = useState(0);

  const {loading, error, data} = useQuery(Q_TODO_LIST);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  useEffect(() => {
    if (data) {
      if (data.todoList) {
        setTodoList(data.todoList);
        let newContents = data.todoList.concat();
        setMaxId(countMaxId(newContents));
      } else {
        console.log(false, 2);
      }
    }
  }, [data]);

  // todoList 렌더링 시 maxId count 하기
  useEffect(() => {
    console.log('%c[GET] Todo List', 'color:purple');
    console.log(todoList);
    if (todoList.length > 0) {
      setMaxId(countMaxId(todoList));
    }
  }, [todoList]);

  // 로딩 및 에러 발생 시 렌더링
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  // todo delete
  const handlerDelete = async id => {
    console.log('%c[Delete]', 'color:red');
    console.log({id});
    const result = await deleteTodo({variables: {id}});
    if (result.data && result.data.deleteTodo) {
      const deleteData = result.data.deleteTodo;
      let newTodoList = todoList.concat();
      filter(newTodoList, (item, index) => {
        if (item.id === deleteData.id) {
          newTodoList.splice(index, 1);
          return true;
        }
        return false;
      });
      setTodoList(newTodoList);
    }
  };
  // todo update
  const handlerUpdate = async (id, input) => {
    console.log('%c[Update]', 'color:orange');
    console.log({id, input});
    const updateRst = await updateTodo({variables: {id, input}});
    let newTodoList = todoList.concat();
    const updateData = updateRst.data.updateTodo;
    filter(newTodoList, item => {
      if (item.id === updateData.id) {
        item.status = input.status;
        return true;
      }
      return false;
    });
    setTodoList(newTodoList);
  };
  // todo Insert
  const handSubmit = async input => {
    input.id = maxId + 1;
    console.log('%c[Insert]', 'color:blue');
    console.log(input);
    await createTodo({variables: {input}});
    const newList = todoList.concat();
    newList.push(input);
    setTodoList(newList);
  };
  return (
    <View>
      <AddTodo submit={handSubmit} />
      {todoList?.length > 0 ? (
        todoList.map((todo, index) => {
          return (
            <TodoList
              key={index}
              {...todo}
              onUpdate={handlerUpdate}
              onDelete={handlerDelete}
            />
          );
        })
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default TodoListContainer;
