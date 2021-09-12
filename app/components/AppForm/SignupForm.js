import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackActions } from "@react-navigation/native"; 
import { useLogin } from '../../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from "../../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";

import { Formik } from "formik";
import * as Yup from "yup";

import client from "../../api/client";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Invalid name!"),
    // .required("Name is required!"),
  username: Yup.string()
    .trim()
    .min(3, "Invalid Username!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignupForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const userInfo = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { name, email, username, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!name.trim() || name.length < 3)
      return updateError("Invalid name!", setError); 
    // if valid username with 3 or more characters
    if (!username.trim() || username.length < 3)
      return updateError("Invalid name!", setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    const res = await client.post("/user/register", {
      ...values,
    });

    // console.log(res.data);
    
    if (res.data.success) {
      const signInRes = await client.post("/user/login", {
        email: values.email,
        password: values.password,
      });
      if (signInRes.data.success) {
        // setUserInfo({ email: '', password: '' });
        // setProfile(res.data.user);
        setIsLoggedIn(true);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        // console.log(res.data.user) 
        navigation.dispatch(
          StackActions.replace("ImageUpload", {
            token: signInRes.data.token,
          })
        );
      }
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { name, email,username, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                label="Full Name"
                placeholder="John Smith"
              />
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                label="username"
                placeholder="johnsmith"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
