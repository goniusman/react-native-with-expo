import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Title from '../common/Title';
import SmallCard from '../cards/SmallCard';

const HorizotalList = ({ title, data }) => {
  // console.log(data)
  const navigation = useNavigation();
  return (
    <>
      <Title size={20}>{title}</Title>
     
      <View style={styles.listStyle}>
        <FlatList
          data={data} 
          keyExtractor={(item, index) => item._id}
          // keyExtractor={item => console.log(item._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SmallCard
              // key={item._id}
              onPress={() => navigation.push('PostsDetail', { item })}
              item={item}
            />
          )}
        />
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    marginVertical: 15, 
  },
});

export default HorizotalList;
