import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ref, onValue, push, update, remove} from 'firebase/database';
// import {db} from '../Firebase/firebase-config/firebase-config.js';
import {db} from '../Firebase/firebase-config';

const Firebase = () => {
  const [todos, setTodos] = useState({});
  const [presentTodo, setPresentTodo] = useState('');

  const todosKeys = Object.keys(todos);

  useEffect(() => {
    return onValue(ref(db, '/todos'), query => {
      let data = query.val() || {};
      let todoItems = {...data};
      setTodos(todoItems);
    });
  }, []);

  function addNewTodo() {
    push(ref(db, '/todos'), {
      done: false,
      title: presentTodo,
    });
    setPresentTodo('');
  }

  function clearTodos(e) {
    remove(ref(db, '/todos/' + e));
    todosKeys.map(key => console.log(key));
  }
  const getData = () => {};
  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{todos[item].title}</Text>
        <TouchableOpacity onPress={() => clearTodos(item)}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        {todosKeys.length > 0 ? (
          <FlatList data={todosKeys} renderItem={renderItem} />
        ) : null}
      </View>
      <TextInput
        placeholder="New todo"
        value={presentTodo}
        style={{
          borderWidth: 1,
          borderColor: '#afafaf',
          borderRadius: 5,
          paddingHorizontal: 10,
          marginVertical: 20,
          fontSize: 20,
        }}
        onChangeText={text => {
          setPresentTodo(text);
        }}
        onSubmitEditing={addNewTodo}
      />

      <View>
        <View style={{marginTop: 20}}>
          <Button
            title="Add new todo"
            onPress={addNewTodo}
            color="green"
            disabled={presentTodo == ''}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Button
            title="Clear the todo list"
            // onPress={clearTodos}
            color="red"
            style={{marginTop: 20}}
          />
        </View>
      </View>
      <Button title="data" onPress={getData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {},
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export default Firebase;
