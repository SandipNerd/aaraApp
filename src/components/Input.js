import React, {useReducer, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChangeHandler, id} = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChangeHandler(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChangeHandler, id]);

  const textChangeHandler = text => {
    console.log(text);
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View>
      <Text style={styles.formheader}>{props.label}</Text>
      <TextInput
        style={styles.input}
        {...props}
        onBlur={lostFocusHandler}
        value={inputState.value}
        onChangeText={textChangeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formheader: {
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    paddingVertical: 0,
  },
});

export default Input;
