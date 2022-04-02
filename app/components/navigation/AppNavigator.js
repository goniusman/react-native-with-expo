import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, DrawerActions } from 'react-native';
import 'react-native-gesture-handler';
import { useLogin } from '../../context/LoginProvider';
import AppForm from '../AppForm/AppForm';
import ImageUpload from '../AppForm/ImageUpload';
// Import Custom Sidebar
import CustomSidebarMenu from '../common/CustomSidebarMenu';
import Verification from "../common/Verification";
import PostsList from '../lists/PostsList';
import AddPost from '../post/addpost';
import UpdateForm from '../post/updatePost';
import Home from '../screens/Home';
import PostsDetail from '../screens/PostsDetail';
import UserProfile from '../screens/UserProfile';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const NavigationDrawerStructure = (props) => {
  // console.log('yes itworking   ');
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    console.log(props.navigationProps);
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();

    // props.navigationProps.dispatch(DrawerActions.toggleDrawer())
    // props.navigation.navigate('Settings');
    // props.navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};


const homeScreenStack = ({navigation}) => {
  return (
    <>
       <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{
        //   // headerTransparent: false,
        //       headerTitle: 'Home Page',
        //   // headerLeft: () => (
        //   //   <NavigationDrawerStructure navigationProps={navigation} />
        //   // ),
        //   headerStyle: { 
        //     backgroundColor: '#f4511e', //Set Header color
        //   },
        //   headerTintColor: '#fff', //Set Header text color
        //   headerTitleStyle: {
        //     fontWeight: 'bold', //Set Header text style
        //   },
        //   }}
    >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home Page', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen options={{title: 'Post Details'}} name='PostsDetail' component={PostsDetail} />
        <Stack.Screen name='PostsList' component={PostsList} />
        <Stack.Screen component={ImageUpload} name='ImageUpload' />
        <Stack.Screen component={UpdateForm} name='UpdateForm' />
        <Stack.Screen component={Verification} name='Verification' />
        
       </Stack.Navigator>
    </>
  );
}

const addPostScreenStack = ({ navigation }) => {
  return (
    <>
       <Stack.Navigator
       initialRouteName="AddPost"
       screenOptions={{
        // headerTransparent: false,
            headerTitle: 'Add Post',
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: { 
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name='AddPost'
        component={AddPost}
      />
       </Stack.Navigator>
    </>
  );
}

const userProfileScreenStack = ({ navigation }) => {
  return (
    <>
       <Stack.Navigator
       initialRouteName="UserProfile"
       screenOptions={{
        // headerTransparent: false,
            headerTitle: 'User Profile',
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: { 
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name='UserProfile'
        component={UserProfile}
      />
 
       </Stack.Navigator>
    </>
  );
}


// const LoggedIn = ({ navigation }) => {
//   return (
//     <>
//        <Stack.Navigator
//        initialRouteName="Home"
//       //  screenOptions={{
//       //   // headerTransparent: false,
//       //       headerTitle: 'Pull From Left',
//       //   headerLeft: () => (
//       //     <NavigationDrawerStructure navigationProps={navigation} />
//       //   ),
//       //   headerStyle: {
//       //     backgroundColor: '#f4511e', //Set Header color
//       //   },
//       //   headerTintColor: '#fff', //Set Header text color
//       //   headerTitleStyle: {
//       //     fontWeight: 'bold', //Set Header text style
//       //   },
//       // }}
    
//       // screenOptions={{
//       //   headerTransparent: true,
//       //   headerTitle: '',
//       //   headerTintColor: 'white',
//       //   headerLeftContainerStyle: {
//       //     width: 40,
//       //     height: 40,
//       //     borderRadius: 20,
//       //     backgroundColor: 'rgba(92,90,91,0.7)',
//       //     alignItems: 'center',
//       //     marginLeft: 10,
//       //   },
//       // }}
//     >
//       {/* <Stack.Screen
//         options={{ headerShown: false }}
//         name='Home'
//         component={Home}
//       /> */}
   
//       {/* <Stack.Screen component={AddPost} name='AddPost' /> */}
//       {/* <Stack.Screen component={UserProfile} name='UserProfile' screenOptions={{ 
//             headerTransparent: true,
//             headerTitle: '',
//             headerShown: false
//           }} /> */}
//       {/* <Stack.Screen component={ImageUpload} name='ImageUpload' />
//       <Stack.Screen component={UpdateForm} name='UpdateForm' /> */}
//        </Stack.Navigator>
//     </>
//   );
// };

const MyDrawer = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        // initialRouteName="Home"
        // screenOptions={{
        //   // headerTransparent: false,
        //       // headerTitle: 'Pull From Left',
        //   headerLeft: () => (
        //     <NavigationDrawerStructure navigationProps={navigation} />
        //   ),
        //   headerStyle: {
        //     backgroundColor: '#f4511e', //Set Header color
        //   },
        //   headerTintColor: '#fff', //Set Header text color
        //   headerTitleStyle: {
        //     fontWeight: 'bold', //Set Header text style
        //   },
        // }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        
        >
        <Drawer.Screen
          name="Home"
          options={{headerShown: false}}
          component={homeScreenStack}
        />
       
       <Drawer.Screen
          name="UserProfile"
          options={{headerShown: false, title: "User Profile"}}
          component={userProfileScreenStack}
        />
       <Drawer.Screen
          name="AddPost"
          options={{headerShown: false, title: "Add Post"}}
          component={addPostScreenStack}
        />

       <Drawer.Screen
          name="ImageUpload"
          screenOptions={{ 
            // headerTransparent: false,
            headerTitle: 'Image Upload',
            title: "Image Upload"
          }}
          options={{headerShown: true, title: "Image Upload"}}
          component={ImageUpload}
        />
        
        
       </Drawer.Navigator>
    </NavigationContainer>   
  )
}


const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={AppForm} name='AppForm' />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MyDrawer /> : <StackNavigator />;
  // return <LoggedIn />
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
