import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, ScrollView,
  StyleSheet, Text, View
} from 'react-native';
import { Formik } from "formik";
import FormContainer from "../common/FormContainer";
import FormInput from "../common/FormInput";
import FormSubmitButton from "../common/FormSubmitButton";
import postsApi from '../../api/postsApi';
import ActivityIndicator from '../common/ActivityIndicator';
import Close from '../common/Close';
import HorizotalList from '../lists/HorizotalList';


const { width, height } = Dimensions.get('window');

const PostsDetail = ({ route }) => {
  const [posts, setPosts] = useState({});
  const [allComments, setAllComments] = useState({});
  const [comments, setComments] = useState({
    comment: "",
    postId: route.params.item._id
  });
  const [error, setError] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { _id: postId, category: postCategory } = route.params.item;
  // console.log(route)
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchPost = async id => {
    const result = await postsApi.getSingle(id);
    if( !result ){
      setError('Feting Error for post')
    }
    setPosts(result);

  };

  const fetchRelatedPosts = async category => {

    const result = await postsApi.getByCategoryTest(category, 3);
    
    if(!result ){

      setError('Feting Error post by category')
    }

    setRelatedPosts(result.filter(item => item._id !== postId));
    
  };

  const fetchAllComments = async id => {
    const result = await postsApi.getAllComments(id);
    // console.log(result); 
    if(!result ){
      setError('Feting Error comment')
    }

    setAllComments(result);
  }

  useEffect(() => {
    fetchPost(postId);
    fetchRelatedPosts(postCategory);
    fetchAllComments(postId)
    setLoading(false);
  }, []);

  const handleOnChangeText = (value, fieldName) => {
    setComments({ ...comments, [fieldName]: value });
  };


  const { comment } = comments;



  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(comments))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!comment.trim() || comment.length < 3)
      return updateError("Invalid Comment!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(post);
    }
  }; 


  const submitPost = async (values, formikActions) => {

    try{

      const res = await postsApi.addComment(comments)

      // console.log(res);
      if (!res) {
          setError("There are network error!")
        }else{
          setComments({ 
            comment: "",
          })

        formikActions.resetForm();
        formikActions.setSubmitting(false);
        
      }

   

    }catch (error) {
      console.log(error.message);
    }

    
  };


  const { title, description, image , _id} = posts;

  return (
    <>
      <ActivityIndicator visible={loading} />

      {
        !error ? (
          <ScrollView style={styles.container}>
     
            <View  key={ _id }>
            {image ? (
              <Image style={styles.image} source={{ uri: image}} />
            ) : (
              <Image  blurRadius={1}
            fadeDuration={10}  style={styles.image}  source={require('../../../uploads/portfolio-8.jpg')}  />
            )}
               
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{description}</Text>
              </View>

                <FormContainer>
                    <Formik
                      initialValues={comments}
                
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
                        const { comment } = comments;
                        return (
                          <>
                  
                            <FormInput
                              name="comment"
                              value={comment}
                              error={touched.comment && errors.comment}
                              // onChangeText={handleChange("title")}
                              onChangeText={value => handleOnChangeText(value, 'comment')}
                              onBlur={handleBlur("comment")}
                              label="Leave A Comment"
                              placeholder="give a comment!"
                            />

                            <FormSubmitButton
                              submitting={isSubmitting}
                              onPress={handleSubmit}
                              title="Submit"
                            />
                          </>
                        );
                      }}
                    </Formik>
                </FormContainer>
    

                { allComments && allComments.length > 0 ? (
                  <View style={styles.commentContainer}>
                    {
                      allComments.map(item => (
                        <Text>{item.comment}</Text>
                      )) 
                    }  
                  </View>
                ) : null }

                    
                    




              <View style={styles.relatedPostContainer}>
                <HorizotalList data={relatedPosts} title='Related Posts' />
              </View>
            </View>

          </ScrollView>
        ) : 
        <Text>{error}</Text>
      }

          

  
      <Close onPress={() => navigation.popToTop()} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: width,
    height: height / 3,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#4e4d4d',
  },
  relatedPostContainer: {
    padding: 10,
  },
  commentContainer: {
    backgroundColor: 'gray',
    padding: 15
  },
  
});

export default PostsDetail;
