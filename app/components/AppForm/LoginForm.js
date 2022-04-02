import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import userApi from '../../api/userApi'
import { useLogin } from '../../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../../utils/methods';
import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSubmitButton from '../common/FormSubmitButton';

 
const LoginForm = () => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '', 
  });
  const [error, setError] = useState('');
  const { email, password } = userInfo;
  const { setIsLoggedIn, setProfile } = useLogin();


  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 6)
      return updateError('Password is too short!', setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      const res = await userApi.loginUser({ ...userInfo }); 
        if (typeof res  === "boolean") {
          setUserInfo({ email: '', password: '' });
          setIsLoggedIn(true);
        }else{
            setError(res)
        }
      
    }else{
      console.log('Invalid Data')
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
