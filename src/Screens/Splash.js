import {SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import StyleSheet from '../StyleSheet/StyleSheet';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      validate();
    }, 2000);
  }, []);

  const validate = async () => {
    let status = await AsyncStorage.getItem('status');
    let introStatus = await AsyncStorage.getItem('introStatus');

    if (status == 'true') {
      navigation.navigate('HomeScreen');
    } else if (introStatus == 'true') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('IntroSlider');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={StyleSheet.splashView}>
        <Text style={StyleSheet.splashText}>Splash</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
