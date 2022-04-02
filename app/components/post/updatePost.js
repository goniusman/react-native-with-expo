import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from "yup";
// import SignupForm from "../AppForm/SignupForm";
import { isValidEmail, isValidObjField, updateError } from "../../utils/methods";
import FormContainer from "../common/FormContainer";
import FormInput from "../common/FormInput"; 
import FormSubmitButton from "../common/FormSubmitButton";

import postsApi from "../../api/postsApi"; 

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, "Invalid Title!")
//     .required("Title is required!"),
//   description: Yup.string()
//   .min(15, 'Invalid Descriptin')
//   .required("Description is required!"),
//   category: Yup.string()
//     .min(3, "Category name!")
//     .required("Category is required!"),
//   tag: Yup.string()
//     .min(3, "Tag name!")
//     .required("Tag is required!"),
//   author: Yup.string()
//     .min(3, "Author name!")
//     .required("Author is required!"), 
 
// });

const UpdateForm = ({ route }) => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [post, setPost] = useState({ 
    title: "",
    description: "",
    category: "",
    tag: "",
    author: "",
  })

  const item = route.params.it;


  const setUpdatePost = ({title, description, category, tag, author} = item ) => {
    setPost({title, description, category, tag, author});
  }

  useEffect(() => {
    setUpdatePost(item);
  }, [])

  // console.log(item)

  const { title, description, category, tag, author } = post;

  const handleOnChangeText = (value, fieldName) => {
    setPost({ ...post, [fieldName]: value });
    // console.log(value)
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(post))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!title.trim() || title.length < 3)
      return updateError("Invalid title!", setError);
    // only valid email id is allowed
    if (!description.trim() || title.length < 15) return updateError("description is less then 8 characters!", setError);;
    // password must have 8 or more characters
    if (!category.trim())
      return updateError("category is required!", setError);
    // password and confirm password must be the same
    if (!tag.trim())
      return updateError("tag is required!", setError);
    // password and confirm password must be the same
    if (!author.trim())
    return updateError("author is required!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(post);
    }
  }; 

  const submitPost = async (values, formikActions) => {

    const res = await postsApi.updatePost(post, item._id)

    // console.log(res);
    if (!res) {
      setError("There are network problem!")
    }

    setPost({ 
      title: "",
      description: "",
      category: "",
      tag: "",
      author: "",
    })

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigation.push("Home")


  };

  
  return (
<ScrollView>
    <FormContainer>
      <Formik
        initialValues={post}
   
        onSubmit={submitPost}
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
          const { title, description, category, tag, author } = post;
          return (
            <>

            {error ? (
              <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
                {error}
              </Text>
            ) : null}

            <View style={styles.space}> 
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Update Post</Text>
            </View>

              <FormInput
                name="title"
                value={title}
                error={touched.title && errors.title}
                // onChangeText={handleChange("title")}
                onChangeText={value => handleOnChangeText(value, 'title')}
                onBlur={handleBlur("title")}
                label="Title"
                placeholder="John Smith"
              />

              
              <FormInput
                name="description"
                value={description}
                error={touched.description && errors.description}
                onChangeText={ value => handleOnChangeText(value, 'description')}
                onBlur={handleBlur("description")}
                autoCapitalize="none"
                label="description"
                placeholder="Type something details here..."
              />

              <FormInput
                name="category"
                value={category}
                error={touched.category && errors.category}
                onChangeText={value => handleOnChangeText(value, 'category')}
                onBlur={handleBlur("category")}
                autoCapitalize="none"
                label="category"
                placeholder="Category here..."
              />

              <FormInput
                name="tag"
                value={tag}
                error={touched.tag && errors.tag}
                onChangeText={value => handleOnChangeText(value, 'tag')}
                onBlur={handleBlur("tag")}
                autoCapitalize="none"
                label="Tag "
                placeholder="Tag is here..."
              />
              <FormInput
                name="author"
                value={author}
                error={touched.author && errors.author}
                onChangeText={value => handleOnChangeText(value, 'author')}
                onBlur={handleBlur("author")}
                autoCapitalize="none"
                
                label=" Author"
                placeholder="Author"
              />


              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Update Post"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  space: {
    marginTop: 10,
  }
});

export default UpdateForm;
