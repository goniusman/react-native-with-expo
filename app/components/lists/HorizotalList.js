import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SmallCard from '../cards/SmallCard';
import Title from '../common/Title';


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
              onPress={() => navigation.push('PostsDetail', { item, message: "nice to meet yuo" })}
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
