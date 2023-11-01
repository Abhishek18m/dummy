import {View, Text} from 'react-native';
import React from 'react';
import StyleSheet from '../StyleSheet/StyleSheet';

const TopBar = props => {
  return (
    <View style={StyleSheet.homeView}>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
        {props.title}
      </Text>
    </View>
  );
};

export default TopBar;
