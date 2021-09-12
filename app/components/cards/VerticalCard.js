import React from 'react';
import { View, StyleSheet } from 'react-native';

import FlatCard from './FlatCard';
import ViewMore from './ViewMore';
import postsApi from '../../api/postsApi';
import { useNavigation } from '@react-navigation/native';

const VerticalCard = ({ item, onPress }) => {
  const navigation = useNavigation();
  
  const handleViewMore = async category => {
    const result = await postsApi.getByCategory(category);
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
