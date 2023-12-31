import React, {createContext, useContext, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';

import IntroSlider from '../Screens/IntroSlider';
import HomeScreen from '../Screens/HomeScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import ChatScreen from '../Screens/ChatScreen';
import UserList from '../Screens/UserList';
import BottomTabs from './BottomTabs';
import Theme from '../Assets/Theme/Theme';

const Stack = createNativeStackNavigator();
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function Navigator() {
  const [theme, setTheme] = useState('#5579f1');
  const [font, setFont] = useState('black');
  const [colorA, setColorA] = useState('#acd4ff');
  const [colorB, setColorB] = useState('#d6e9ff');
  const getItem = (theme, font, A, B) => {
    setTheme(theme);
    setFont(font);
    setColorA(A);
    setColorB(B);
  };

  return (
    <ThemeContext.Provider
      value={{theme, font, colorA, colorB, getItem: getItem}}>
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
    </ThemeContext.Provider>
  );
}

export default Navigator;
