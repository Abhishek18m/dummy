import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import Eneum from '../Element/Eneum/Eneum';

const IntroSlider = ({navigation}) => {
  const slides = [
    {
      key: 's1',
      text: Eneum.IntroText1,
      title: Eneum.IntroTitle1,
      image: {
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
      },
      backgroundColor: '#20d2bb',
    },
    {
      key: 's2',
      title: Eneum.IntroText2,
      text: Eneum.IntroTitle2,
      image: {
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
      },
      backgroundColor: '#febe29',
    },
    {
      key: 's3',
      text: Eneum.IntroText3,
      title: Eneum.IntroTitle3,
      image: {
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
      },
      backgroundColor: '#22bcb5',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text>{item.title}</Text>
        <Image style={{width: 200, height: 200}} source={item.image} />
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      skipLabel={Eneum.Skip}
      nextLabel={Eneum.Next}
      doneLabel={Eneum.Done}
      renderItem={renderItem}
      onDone={() => [
        AsyncStorage.setItem('introStatus', 'true'),
        navigation.navigate('Login'),
      ]}
      showSkipButton={true}
      onSkip={() => [
        AsyncStorage.setItem('introStatus', 'true'),
        navigation.navigate('Login'),
      ]}
    />
  );
};

export default IntroSlider;

const styles = StyleSheet.create({});
