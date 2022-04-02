import 'react-native-gesture-handler';
import {
  DrawerContentScrollView, DrawerItem,DrawerItemList
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image, Linking, SafeAreaView, StyleSheet, Text, View
} from 'react-native';
import { useLogin } from '../../context/LoginProvider';




const CustomSidebarMenu =  (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
    
  const proileImage = 'react_logo.png';
  // const result = await AsyncStorage.getItem("user");
  const {profile} = useLogin();
  // console.log(profile);

  const profileImage = (style) => {
    if(profile.image == undefined || profile.image == null){
      // console.log('i am null');
     return (
       <Image
        source={require('../../../uploads/portfolio-1.jpg')}
        style={style}
      />
     ) 
    }else{
      // console.log('i am not null');
      return (
        <Image
         source={{uri : profile.image}}
         style={style}
       />
      ) 
    }
  }


  return (
    <SafeAreaView style={{ flex: 1}}>
      {/*Top Large Image */}
     <View>
        {profileImage(styles.sideMenuProfileIcon)}
     </View>
      
      
      <DrawerContentScrollView {...props} style={{marginTop: 20}}>
        <DrawerItemList {...props} />






        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{ uri: BASE_PATH + 'star_filled.png' }}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 200,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;