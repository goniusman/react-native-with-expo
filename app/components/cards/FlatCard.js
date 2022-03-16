import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Title from '../common/Title';
import Subtitle from '../common/Subtitle';

import { useNavigation } from '@react-navigation/native';

import client from "../../api/client";


const FlatCard = ({ item, onPress }) => {
  const it = item;
  
  const navigation = useNavigation();
  const { image, title, description  } = item;


  const deleteItem = async (id) => {
    console.log(id); 
    const res = await client.delete(`/post/${id}`);
     
    if (res.data.success) {
      console.log('successfully deleted')
    }

  }


  return (

    <View>

    {/* <View style={styles.actionbtn}>
          
        <Text onPress={() => deleteItem(_id)} >Delete</Text>
        <Text onPress={() => navigation.push('UpdateForm', {it})} >Update</Text>

        
        
    </View> */}

    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.container}>
   
        <Image source={require('../../../assets/icon.png')} style={styles.image} />
        <View style={styles.contentContainer}>
          <Title>{title}</Title>
          <Subtitle>{description }</Subtitle>
        </View>
      </View>
    </TouchableWithoutFeedback>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    height: 80,
  },
  image: {
    flex: 0.35,
    height: '100%',
  },
  contentContainer: {
    flex: 0.65,
    paddingHorizontal: 5,
  },
  actionbtn:{
    marginTop: '5px',
    padding: '2px',
    position: 'absolute',
    zIndex: 999,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});

export default FlatCard;
