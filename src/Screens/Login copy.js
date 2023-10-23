import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CommonInput from '../Component/CommonInput';
import CommonButton from '../Component/CommonButton';

const Login = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/bg2.jpg')}
      style={{height: '100%', width: '100%'}}>
      <SafeAreaView>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'white',
            justifyContent: 'center',
            marginVertical: 50,
            padding: 30,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Image
            source={require('../Assets/Images/chat.png')}
            style={{
              tintColor: '#2ecbf2',
              height: 40,
              width: 40,
              alignSelf: 'center',
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            width: '100%',
            height: '75%',
            borderTopLeftRadius: 80,
          }}>
          <View
            style={{
              height: '90%',
              width: '100%',

              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  alignSelf: 'center',

                  color: 'black',
                }}>
                Login
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  height: '50%',
                }}>
                <CommonInput title="Email" />
                <CommonInput title="Password" />
                <CommonButton
                  title="Login"
                  onClick={() => navigation.navigate('HomeScreen')}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Don't have any account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: 'blue'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
