import {TextInput, View, Text, Image} from 'react-native';
import React from 'react';

const CommonInput = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 20,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}>
      <Image
        source={props.img}
        style={{height: 25, width: 25, tintColor: 'grey'}}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={props.title}
        style={{paddingHorizontal: 15}}
      />
    </View>
  );
};

export default CommonInput;
