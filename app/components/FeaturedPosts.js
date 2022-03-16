import React from 'react';
import { View, StyleSheet } from 'react-native';
import BlockCard from './cards/BlockCard';

import { useNavigation } from '@react-navigation/native';

const FeaturedPosts = ({ item }) => {
  const navigation = useNavigation();
  return (
 
      <BlockCard 
        key={item._id}
        onPress={() => navigation.navigate('PostsDetail', { item })}
        item={item}
        style={{ marginVertical: 15 }}
      />
   
  );
};

const styles = StyleSheet.create({
  // container: {},
  // featured: {},
});

export default FeaturedPosts;
