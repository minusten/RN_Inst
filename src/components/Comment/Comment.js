import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default function Comment() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  //   addTodo = () => {
  //     if (value.length > 0) {
  //       setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
  //       setValue('');
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comment</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="What do you want to do today?"
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={value => setValue(value)}
        />
        <TouchableOpacity>
          <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  header: {
    marginTop: '5%',
    fontSize: 20,
    color: 'grey',
    paddingBottom: 5
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 10
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%'
  }
});
