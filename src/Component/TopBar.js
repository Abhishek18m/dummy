import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import StyleSheet from '../StyleSheet/StyleSheet';
import {useTheme} from '../AppNavigator/Navigator';
import {Image} from 'react-native-animatable';
const TopBar = props => {
  const {theme, font} = useTheme();
  return (
    <View style={StyleSheet.homeView}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          color: 'white',
          color: font,
          alignSelf: 'center',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default TopBar;
