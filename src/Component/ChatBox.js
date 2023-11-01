import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const ChatBox = (props, {navigation}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.2,
        borderColor: 'grey',
        paddingVertical: 15,
        paddingHorizontal: 10,
      }}>
      <Image
        source={require('../Assets/Images/user.png')}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          marginHorizontal: 20,
          borderWidth: 0.1,
        }}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{props.name}</Text>
        {props.messages ? (
          <Text
            style={{
              // fontWeight: item.seen == false ? 'bold' : null,
              fontSize: 13,
              fontWeight: '300',
            }}>
            {props.messages}
          </Text>
        ) : null}
      </View>
      {props.time ? <Text>{props.time}</Text> : null}
    </TouchableOpacity>
  );
};

export default ChatBox;
