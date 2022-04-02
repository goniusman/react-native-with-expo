import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import client from '../../api/client';
// import Icon from 'react-native-vector-icons'
import { useLogin } from '../../context/LoginProvider';
import AppButton from "./Button";
const inputs = Array(4).fill('')

const isObjectValid = (obj) => {
  return Object.values(obj).every(val => val.trim())
}

let newInputIndex = 0;
const Verification = ({route}) => {
  // const {profile} = route.params
  const {profile} = useLogin();
  const input = useRef()
  const [OTP, setOTP] = useState({0: '', 1:'', 2: '',3: ''})
  const [nextInputIndex, setNextInputIndex] = useState(0)
  const [error, setError] = useState('')


  const handleChangeText = (text, index) => {
    const newOTP = {...OTP}
    newOTP[index] = text 
    setOTP(newOTP)
    const lastInputIndex = inputs.length - 1;
    if(!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex)
  }

  useEffect(() => {
    input.current.focus();
  
    // return () => {
    //   second
    // }
  }, [nextInputIndex])

  function stripquotes(a) {
    if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
        return a.substr(1, a.length-2);
    }
    return a;
  }
 
  const submitOtp = async () => {
    const token = await AsyncStorage.getItem('token');

    if(isObjectValid(OTP)){
      let val = '';
      Object.values(OTP).forEach(v => {
        val += v
      })
    

      
      try{

        // const { title, description, category, tag, author } = post;
        const res = await client.put("/user/verify-email", {otp: val}, {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${stripquotes(token)}`,
          }
        }
        );

      // console.log(res);
      if (res.data.success) {
        Keyboard.dismiss()
        setOTP({0: '', 1:'', 2: '',3: ''})
        navigation.dispatch(StackActions.replace('Home'));
      }else{
        setError(res.data.message)
      }

    

      // formikActions.resetForm();
      // formikActions.setSubmitting(false);


      }catch (error) {
        console.log(error);
      }


    }
  }

  const resendEmail = async () => {
    const token = await AsyncStorage.getItem('token');

      try{

        // const { title, description, category, tag, author } = post;
        const res = await client.post("/user/resend", {test:'test'}, {
            headers: {  
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization': `Bearer ${stripquotes(token)}`,
            }
          }
        );

      console.log(res); 
        // if (res.data.success) {
        //   setOTP({0: '', 1:'', 2: '',3: ''})
        //   setError(res.data.message)
        // }else{
        //   setError(res.data.message)
        // }

      }catch (error) {
        console.log(error);
      }

  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
       {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <Text style={styles.heading}>Please Verify Email, PIN has been sent to your email</Text>
      <View style={styles.otpContainer}>
         {
        inputs.map((inp, index) => {
          return (
            <View key={index.toString()} style={styles.inputContainer}>
                <TextInput 
                  value={OTP[index]}
                  onChangeText={(text) => handleChangeText(text, index)}
                  placeholder='0' 
                  style={styles.inputs} 
                  keyboardAppearance='default' 
                  maxLength={1}  
                  ref={nextInputIndex === index ? input : null}
                  /> 

            </View>
          ) 
        })
      }
      </View>
     <TouchableOpacity onPress={submitOtp}>
       {/* <Icon 
          name="checkmark-outline" 
          size={24} 
         
          color="#fff"
       /> */}

       <AppButton
               
                  title="Verify"
                  //  color="#f194ff"
                  />
     </TouchableOpacity>
     <TouchableOpacity onPress={resendEmail}>
      <AppButton
          title="Resend Email"
          //  color="#f194ff"
        />
     </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Verification

const {width} = Dimensions.get('window')
const inputWith = Math.floor(width / 6 )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }, 
  heading: {
    color: '#8469cf',
    textAlign: 'center',
    marginBottom: 15
  }, 
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWith /2
  },
  inputContainer: {
    width: inputWith,
    height: inputWith,
    borderWidth: 2,
    borderColor: '#8469cf',
    textAlign: 'center'
  },
  inputs: {
    fontSize: 25,
    paddingHorizontal: 15 
  },
  submitIcon:{
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#8469cf',
    borderRadius: 50,
    marginTop: 15
  },
  resendEmail: {
    width: '100%',
    flexDirection: 'row',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    textAlign: "center",
    padding: 15,
    color: 'red'
 
  }
})