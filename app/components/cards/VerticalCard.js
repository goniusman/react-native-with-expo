import React from 'react';
import { View, StyleSheet } from 'react-native';

import FlatCard from './FlatCard';
import ViewMore from './ViewMore';
import postsApi from '../../api/postsApi';
import { useNavigation } from '@react-navigation/native';

const VerticalCard = ({ item, onPress }) => {
  // console.log(item);
  const navigation = useNavigation();
  
  const handleViewMore = async category => {
    const result = await postsApi.getByCategoryTest(category);
    // console.log(result);
    //  navigation.push('PostsList', { result})

    navigation.navigate('PostsList', result);
  }; 

  if (item.type === 'viewMore') {
    return <ViewMore onPress={() => handleViewMore(item.category)} />;
  }

  return <FlatCard item={item} onPress={onPress} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default VerticalCard;
