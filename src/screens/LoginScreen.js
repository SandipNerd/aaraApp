import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

import CustomButton from '../components/CustomButton';

const LoginScreen = props => {
  const [checked, setChecked] = useState('seeker');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmitHandler = async () => {
    console.log(email, password, checked);

    try {
      const formData = new FormData();
      formData.append('type', checked);
      formData.append('email', email);
      formData.append('ps', password);
      let res = await fetch(
        'https://career-finder.aaratechnologies.in/job/api/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      res = await res.text();
      console.log(res);
      props.navigation.navigate('home');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.signUpText}>Login</Text>

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
        <Text style={styles.formheader}>Your email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <Text style={styles.formheader}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <View style={{alignItems: 'center', marginVertical: 30}}>
          <CustomButton title="Sign up" click={onSubmitHandler} />
        </View>
        <View style={styles.row}>
          <Text>Don't have an account ? </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('signup');
            }}>
            <Text style={{color: '#7f00ff'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
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

export default LoginScreen;
