import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';

const ChatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //   justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: '#E8E8E8',
                padding: 5,
                borderRadius: 5,
                // marginHorizontal: '5%',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/Images/leftmark.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'grey',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/2.jpg')}
              style={{
                height: 40,
                width: 40,
                // backgroundColor: 'grey',
                borderRadius: 20,
                marginHorizontal: '3%',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, flex: 1}}>Alex Mercer</Text>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#E8E8E8',
                padding: 5,
                borderRadius: 5,
                // marginHorizontal: '5%',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/Images/dots.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'grey',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text>Messages</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#E8E8E8',
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderBottomRightRadius: 20,
            borderEndStartRadius: 20,
          }}>
          <TextInput placeholder="Text something..." style={{flex: 1}} />
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/send.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
