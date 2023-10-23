import {TextInput, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const InputPswrd = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={props.img}
          style={{height: 25, width: 25, tintColor: 'grey'}}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry={props.security}
          autoCorrect={false}
          placeholder={props.title}
          style={{paddingHorizontal: 15}}
          onChangeText={a => props.text(a)}
        />
      </View>
      <TouchableOpacity onPress={() => props.Click()}>
        <Image
          source={props.img2}
          style={{height: 25, width: 25, tintColor: 'grey'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputPswrd;
