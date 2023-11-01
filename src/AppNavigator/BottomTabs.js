import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import UserList from '../Screens/UserList';
import Profile from '../Screens/Profile';
import {Image} from 'react-native-animatable';
import Eneum from '../Element/Eneum/Eneum';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarStyle: style.bottomTabContainer,
      }}>
      <Tab.Screen
        name={Eneum.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/home.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#5579f1' : 'black',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Eneum.Users}
        component={UserList}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/group.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#5579f1' : 'black',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Eneum.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/user.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#5579f1' : 'black',
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
