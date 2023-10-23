import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../Assets/Images/search.png')}
          style={{height: 20, width: 20}}
        />
        <Text>Messages</Text>
        <Image
          source={require('../Assets/Images/user.png')}
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'grey',
            borderRadius: 20,
          }}
        />
      </View>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
