import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableWithoutFeedback, View
} from 'react-native';
import client from "../../api/client";
import Subtitle from '../common/Subtitle';
import Title from '../common/Title';


const BlockCard = ({ style, imageStyle, item, onPress }) => {
  const navigation = useNavigation();
  const it = item;
  let { image, title, description, _id } = item;
  // let url = 'http://192.168.0.106:5000';
  // let path = url + image;
  
  const deleteItem = async (id) => {
    // console.log(id); 
    const res = await client.delete(`/post/${id}`);
     
    if (res.data.success) {
      console.log('successfully deleted')
    }

  }

  const blogImage = (image,style) => {
    // console.log(image);
    if(image == undefined || image == null){
      // console.log('i am null');
     return (
       <Image
         blurRadius={1}
            fadeDuration={10} 
        source={require('../../../uploads/portfolio-2.jpg')}
        style={[style, imageStyle]}
      />
     ) 
    }else{
      // console.log('i am not null');
      return (
        <Image
          blurRadius={1}
            fadeDuration={10} 
         source={{uri : image}}
         style={[style, imageStyle]}
       />
      ) 
    }
  }
 
  return (
     
    <View key={_id}>

      <View style={styles.actionbtn}>
        {/* <Text onPress={() => deleteItem(_id)} >Delete</Text> */}
        <Text style={{padding:10, textAlign:'right', color: '#fff', fontWeight:'bold'}} onPress={() => navigation.push('UpdateForm', {it})} >Update</Text>
      </View>

      <TouchableWithoutFeedback onPress={onPress} >
          
        <View style={[styles.container, style]}>
        
          {/* <Image source={{
            width: 100,
            height: 100,
            uri: url }} 
          style={[styles.image, imageStyle]} /> */}
          <View>
              { blogImage(image, styles.image) }

          </View>
          
          {/* <Image
            blurRadius={1}
            fadeDuration={10} 
            // resizeMode={}
            source={require('../../../uploads/portfolio-1.jpg')} style={[styles.image, imageStyle]}
            
           /> */}

          <View style={styles.contentContainer}>
            <Title>{  title}</Title>
            <Subtitle>{description}</Subtitle>
          </View>

        
        </View>
      </TouchableWithoutFeedback>
    </View>

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
    zIndex: 999,
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'right',
  }
});

export default BlockCard;
