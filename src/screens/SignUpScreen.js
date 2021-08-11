import React, {useState, useReducer, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

import CustomButton from '../components/CustomButton';
import Input from '../components/Input';

const FORM_UPDATE = 'FORM_UPDATE';

const url = 'https://career-finder.aaratechnologies.in/job/api/signUp';

const formReducer = (state, action) => {
  if (action.type === 'FORM_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      formIsValid: formIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = props => {
  const [checked, setChecked] = useState('seeker');

  const [formState, dispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      name: '',
      number: '',
      password: '',
    },
    inputValidities: {
      email: false,
      name: false,
      number: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatch],
  );

  const onSubmitHandler = async () => {
    try {
      if (formState.formIsValid) {
        const formData = new FormData();
        formData.append('type', checked);
        formData.append('email', formState.inputValues.email);
        formData.append('name', formState.inputValues.name);
        formData.append('mno', formState.inputValues.number);
        formData.append('ps', formState.inputValues.password);

        let res = await fetch(
          'https://career-finder.aaratechnologies.in/job/api/signUp',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          },
        );
        let data = await res.text();
        console.log(data);
        props.navigation.navigate('home');
      } else {
        alert('Invalid Form! Please check the errors in the form');
      }
    } catch (err) {
      alert('Failed to submit the form');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.signUpText}>Signup</Text>

      <View style={styles.radioContainer}>
        <View style={styles.radioStyle}>
          <RadioButton
            value="seeker"
            status={checked === 'seeker' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('seeker')}
            color="#7f00ff"
          />
          <Text
            style={{
              fontSize: 20,
              color: checked === 'seeker' ? '#7f00ff' : '#616161',
              fontWeight: checked === 'seeker' ? 'bold' : 'normal',
            }}>
            Seeker
          </Text>
        </View>
        <View style={styles.radioStyle}>
          <RadioButton
            value="recruiter"
            status={checked === 'recruiter' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('recruiter')}
            color="#7f00ff"
          />
          <Text
            style={{
              fontSize: 20,
              color: checked === 'recruiter' ? '#7f00ff' : '#616161',
              fontWeight: checked === 'recruiter' ? 'bold' : 'normal',
            }}>
            Recruiter
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <Input
          id="email"
          label="Your email"
          onInputChangeHandler={inputChangeHandler}
          initialValue=""
          initiallyValid={false}
        />
        <Input
          id="name"
          label="Your name"
          onInputChangeHandler={inputChangeHandler}
          initialValue=""
          initiallyValid={false}
        />
        <Input
          id="number"
          label="Your number"
          keyboardType="decimal-pad"
          onInputChangeHandler={inputChangeHandler}
          initialValue=""
          initiallyValid={false}
        />
        <Input
          id="password"
          label="Password"
          onInputChangeHandler={inputChangeHandler}
          secureTextEntry
          initialValue=""
          initiallyValid={false}
        />
        <View style={{alignItems: 'center', marginVertical: 30}}>
          <CustomButton title="Sign up" click={onSubmitHandler} />
        </View>
        <View style={styles.row}>
          <Text>Already have an account ? </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('login');
            }}>
            <Text style={{color: '#7f00ff'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  signUpText: {
    textAlign: 'center',
    color: '#7f00ff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
