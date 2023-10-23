import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('IntroSlider');
    }, 2000);
  }, []);
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
