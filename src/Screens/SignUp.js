import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

import CommonInput from '../Component/CommonInput';
import InputPswrd from '../Component/InputPswrd';
import CommonButton from '../Component/CommonButton';
import StyleSheet from '../StyleSheet/StyleSheet';

const SignUp = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [security, setSecurity] = useState(true);
  const [security2, setSecurity2] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [num, setNum] = useState('');
  const [cPass, setCPass] = useState('');

  const Validate = () => {
    if (name.length < 3) {
      if (!name) {
        Alert.alert('Please enter name');
      } else {
        Alert.alert('Name must have more than 3 char');
      }
    } else if (!email) {
      Alert.alert('Please fill email');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Please enter a valid email');
    } else if (num.length < 10) {
      if (!num) {
        Alert.alert('Please fill number');
      } else {
        Alert.alert('Number must have more than 10 digits');
      }
    } else if (!pass) {
      Alert.alert('Please fill password');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        pass,
      )
    ) {
      Alert.alert('Please create strong password');
    } else if (cPass !== pass) {
      Alert.alert('Confirm password doesnt match with password');
    } else {
      fetchUsers();
    }
  };
  const fetchUsers = () => {
    let arr = [];
    onValue(ref(db, '/UserDetails'), querySnapShot => {
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        arr.push(obj);
      });
    });

    if (arr.some(el => el.email === email.toLowerCase()) === true) {
      Alert.alert('Email already registered ');
    } else {
      signup();
    }
  };
  const signup = () => {
    push(ref(db, '/UserDetails'), {
      name: name,
      email: email.toLowerCase(),
      phone: num,
      password: pass,
    });
    Alert.alert('Account created succesfully');
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={StyleSheet.signUpView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../Assets/Images/left.png')}
            style={StyleSheet.signUpIcon}
          />
        </TouchableOpacity>
        <View style={StyleSheet.signUpInputView}>
          <Text style={StyleSheet.signUpCreateText}>Create Account</Text>

          <CommonInput
            img={require('../Assets/Images/user.png')}
            title="Your Name"
            text={a => setName(a)}
          />
          <CommonInput
            img={require('../Assets/Images/mail.png')}
            title="Email Address"
            text={a => setEmail(a)}
          />
          <CommonInput
            img={require('../Assets/Images/phone.png')}
            title="Phone Number"
            text={a => setNum(a)}
            length={10}
            type="numeric"
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
            text={a => setPass(a)}
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
            text={a => setCPass(a)}
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
        <CommonButton title="Create" click={() => Validate()} />
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
