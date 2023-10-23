import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Splash = () => {
  const navigation = useNavigation();
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
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
          Splash
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
