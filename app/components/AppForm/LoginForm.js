import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../../utils/methods';
import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSubmitButton from '../common/FormSubmitButton';
 
const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '', 
  });

  const [error, setError] = useState('');

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 8)
      return updateError('Password is too short!', setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post('/user/login', { ...userInfo }); 
    //  console.log(res)
        if (res.data.success) {
          setUserInfo({ email: '', password: '' });
          setProfile(res.data.user);
          setIsLoggedIn(true);
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
          await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
          // console.log(res.data)
        }else{
          console.log('There are no connections ')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
