import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CommonInput from '../Component/CommonInput';
import InputPswrd from '../Component/InputPswrd';
import CommonButton from '../Component/CommonButton';

const SignUp = ({navigation}) => {
  const [security, setSecurity] = useState(true);
  const [security2, setSecurity2] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          marginHorizontal: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../Assets/Images/left.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            height: 450,
            justifyContent: 'space-evenly',
            //   backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 30, textAlign: 'center', marginBottom: 10}}>
            Create Account
          </Text>

          <CommonInput
            img={require('../Assets/Images/user.png')}
            title="Your Name"
          />
          <CommonInput
            img={require('../Assets/Images/mail.png')}
            title="Password"
          />
          <CommonInput
            img={require('../Assets/Images/phone.png')}
            title="Phone Number"
          />
          <InputPswrd
            img={require('../Assets/Images/padlock.png')}
            title="Password"
            img2={
              !security
                ? require('../Assets/Images/witness.png')
                : require('../Assets/Images/hide.png')
            }
            security={security}
            Click={() => setSecurity(!security)}
          />
          <InputPswrd
            img={require('../Assets/Images/padlock.png')}
            title="Confirm Password"
            img2={
              !security2
                ? require('../Assets/Images/witness.png')
                : require('../Assets/Images/hide.png')
            }
            security={security2}
            Click={() => setSecurity2(!security2)}
          />
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 32}}>Create</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 60,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              margin: 5,
            }}>
            <Image
              source={require('../Assets/Images/right.png')}
              style={{height: 30, width: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View> */}
        <CommonButton title="Create" />
        <View></View>
        {/* <View>
          <Text style={{textAlign: 'center'}}>
            Or create account using social media
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              width: 200,
              alignSelf: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../Assets/Images/google.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../Assets/Images/facebook.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../Assets/Images/twitter.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
