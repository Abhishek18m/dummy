import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import StyleSheet from '../StyleSheet/StyleSheet';
import * as Animatable from 'react-native-animatable';
import color from '../Assets/Color/color';
import Eneum from '../Element/Eneum/Eneum';
import {useTheme} from '../AppNavigator/Navigator';

const Splash = ({navigation}) => {
  const {theme, getItem} = useTheme();

  useEffect(() => {
    setTimeout(() => {
      validate();
    }, 2000);
  }, []);

  const validate = async () => {
    let status = await AsyncStorage.getItem('status');
    let introStatus = await AsyncStorage.getItem('introStatus');
    let data = await AsyncStorage.getItem('theme');
    let theme = JSON.parse(data);

    {
      theme
        ? getItem(theme?.color, theme?.font, theme?.colorA, theme?.colorB)
        : null;
    }

    if (status == 'true') {
      navigation.replace('BottomTabs');
    } else if (introStatus == 'true') {
      navigation.replace('Login');
    } else {
      navigation.replace('IntroSlider');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={StyleSheet.splashView}>
        <Animatable.View
          animation="slideInDown"
          iterationCount={1}
          style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Text style={StyleSheet.splashText}>{Eneum.AppName}</Text>
          <Image
            source={require('../Assets/Images/logo.png')}
            style={{height: 30, width: 30, tintColor: theme}}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
