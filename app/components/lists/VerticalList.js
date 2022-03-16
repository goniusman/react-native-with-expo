import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Title from '../common/Title';
import VerticalCard from '../cards/VerticalCard';
 
const VerticalList = ({ title, data }) => {

  const navigation = useNavigation();

 

  return (
    <View>
      {title && <Title>{title}</Title>}
      <View style={styles.container}>
        {data.length > 0 && data.map(item => (
          <VerticalCard
            item={item}
            key={item._id}
            onPress={() => navigation.navigate('PostsDetail', { item })}
          />
        ))}
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
});

export default VerticalList;
