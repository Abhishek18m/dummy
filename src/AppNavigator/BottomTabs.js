import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import UserList from '../Screens/UserList';
import Profile from '../Screens/Profile';
import {Image} from 'react-native-animatable';
import Eneum from '../Element/Eneum/Eneum';
import {useTheme} from './Navigator';

const BottomTabs = () => {
  const {theme} = useTheme();
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
                  tintColor: focused ? theme : 'black',
                }}
              />
            );
          },
          tabBarActiveTintColor: theme,
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
                  tintColor: focused ? theme : 'black',
                }}
              />
            );
          },
          tabBarActiveTintColor: theme,
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
                  tintColor: focused ? theme : 'black',
                }}
              />
            );
          },
          tabBarActiveTintColor: theme,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
