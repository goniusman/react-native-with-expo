import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Button,
  Text
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';

import client from "../../api/client";


const BlockCard = ({ style, imageStyle, item, onPress }) => {
  const navigation = useNavigation();
  const it = item;
  let { image, title, description, _id } = item;
  // let url = 'http://192.168.0.106:5000';
  // let path = url + image;
  
  const deleteItem = async (id) => {
    console.log(id); 
    const res = await client.delete(`/post/${id}`);
     
    if (res.data.success) {
      console.log('successfully deleted')
    }

  }
 

  return (

<>


      <View style={styles.actionbtn}>
      
        <Text onPress={() => deleteItem(_id)} >Delete</Text>
        <Text onPress={() => navigation.push('UpdateForm', {it})} >Update</Text>
      </View>

    <TouchableWithoutFeedback onPress={onPress} >
        
      <View style={[styles.container, style]}>
      
 
        {/* <Image source={{
          width: 100,
          height: 100,
          uri: url }} 
        style={[styles.image, imageStyle]} /> */}
   
        
        <Image
          blurRadius={1}
          fadeDuration={10} 
          // resizeMode={}
         source={require('../../../assets/icon.png')} style={[styles.image, imageStyle]} />

        <View style={styles.contentContainer}>
          <Title>{title}</Title>
          <Subtitle>{description}</Subtitle>
        </View>

       
      </View>
    </TouchableWithoutFeedback>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 5,
  },
  actionbtn: {
    marginTop: '5px',
    padding: '2px',
    position: 'absolute',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});

export default BlockCard;
