import React from 'react';
import { View, StyleSheet } from 'react-native';
import BlockCard from './cards/BlockCard';

import { useNavigation } from '@react-navigation/native';

const FeaturedPosts = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.featured}>

    <BlockCard 
      // key="featured"
      onPress={() => navigation.navigate('PostsDetail', { item })}
      item={item}
      style={{ marginVertical: 15 }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  featured: {
    
  },
});

export default FeaturedPosts;
