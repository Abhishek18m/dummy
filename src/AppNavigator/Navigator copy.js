import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import {ThemeProvider} from '../Assets/Theme/ThemeContext';

import IntroSlider from '../Screens/IntroSlider';
import HomeScreen from '../Screens/HomeScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import ChatScreen from '../Screens/ChatScreen';
import UserList from '../Screens/UserList';
import BottomTabs from './BottomTabs';
import Theme from '../Assets/Theme/Theme';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IntroSlider"
            component={IntroSlider}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Theme"
            component={Theme}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default Navigator;
