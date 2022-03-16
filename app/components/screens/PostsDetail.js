import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
} from 'react-native';

import postsApi from '../../api/postsApi';
import HorizotalList from '../lists/HorizotalList';
import Close from '../common/Close';
import { useNavigation } from '@react-navigation/native';
import ActivityIndicator from '../common/ActivityIndicator';

const { width, height } = Dimensions.get('window');

const PostsDetail = ({ route }) => {
  const [posts, setPosts] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { _id: postId, category: postCategory } = route.params.item;
  // console.log(route)
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchPost = async id => {
    const result = await postsApi.getSingle(id);
    setPosts(result);
    setLoading(false);
  };

  const fetchRelatedPosts = async category => {
    const result = await postsApi.getByCategory(category, 3);
    setRelatedPosts(result.filter(item => item._id !== postId));
    setLoading(false);
  };

  useEffect(() => {
    fetchPost(postId);
    fetchRelatedPosts(postCategory);
    console.log(posts)
  }, []);

  const { title, description, image , _id} = posts;

  return (
    <>
      <ActivityIndicator visible={loading} />
          <ScrollView style={styles.container}>
     
          <View  key={ _id }>
             <Image style={styles.image} source={{ uri: image}} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>{description}</Text>
            </View>
            <View style={styles.relatedPostContainer}>
              <HorizotalList data={relatedPosts} title='Related Posts' />
            </View>
          </View>
         
    
        </ScrollView>

  
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
});

export default PostsDetail;
