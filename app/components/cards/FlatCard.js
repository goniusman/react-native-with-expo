import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, StyleSheet, TouchableWithoutFeedback, View, Text
} from 'react-native';
import client from "../../api/client";
import Subtitle from '../common/Subtitle';
import Title from '../common/Title';




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

  const blogImage = (image,style) => {
    // console.log(image);
    if(image == undefined || image == null){
      // console.log('i am null');
     return (
       <Image
         blurRadius={1}
          fadeDuration={10} 
        source={require('../../../uploads/portfolio-5.jpg')}
        style={style}
      />
     ) 
    }else{
      // console.log(image);
      return (
        <Image
          blurRadius={1}
            fadeDuration={10} 
         source={{uri : image}}
         style={style}
       />
      ) 
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

          <View style={styles.actionbtn}>
            {/* <Text onPress={() => deleteItem(_id)} >Delete</Text> */}
            <Text style={{paddingLeft:5, textAlign:'right', color: '#000', fontWeight:'bold'}} onPress={() => navigation.push('UpdateForm', {it})} >Update</Text>
          </View>

              { blogImage(image, styles.image) }


        <View style={styles.contentContainer}>
          <Title>{title.substr(0, 23)}</Title>
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

export default FlatCard;
