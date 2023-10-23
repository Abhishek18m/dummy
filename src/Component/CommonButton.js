import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CommonButton = props => {
  return (
    <TouchableOpacity onPress={props.click}>
      <View
        style={{
          height: 60,
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue',
          borderRadius: 10,

          elevation: 3,
          shadowColor: 'black',
          shadowOffset: {width: 1, height: 2},
          shadowRadius: 1,
          shadowOpacity: 0.5,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;
