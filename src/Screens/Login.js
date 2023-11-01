import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';
import AsyncStorage from '@react-native-community/async-storage';

import CommonInput from '../Component/CommonInput';
import InputPswrd from '../Component/InputPswrd';
import CommonButton from '../Component/CommonButton';
import Eneum from '../Element/Eneum/Eneum';
import StyleSheet from '../StyleSheet/StyleSheet';

const Login = ({navigation}) => {
  const [security, setSecurity] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, '/UserDetails'), querySnapShot => {
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        arr.push(obj);
      });
      setUser(arr);
    });
  }, []);

  const validate = () => {
    let res = user
      .filter(item => item.email == email.toLowerCase())
      .map(({email, password, id, name, phone}) => ({
        email,
        password,
        id,
        name,
        phone,
      }));

    if (res.length == 0) {
      Alert.alert(Eneum.EmaildoesntExist);
    } else {
      if (res[0].email == email.toLowerCase() && res[0].password == password) {
        navigation.navigate('BottomTabs');
        AsyncStorage.setItem('status', 'true');
        AsyncStorage.setItem('userLogin', JSON.stringify(res[0]));
      } else {
        Alert.alert(Eneum.PasswordDoesntMatch);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.loginSafeView}>
      <View style={StyleSheet.loginMainView}>
        <View style={StyleSheet.loginHeaderView}>
          <Text style={StyleSheet.loginHeadText}>{Eneum.AppName}</Text>
          <Text style={StyleSheet.loginHeadText2}>{Eneum.SignInMsg}</Text>
        </View>

        <View style={StyleSheet.loginInputView}>
          <CommonInput
            img={require('../Assets/Images/mail.png')}
            title={Eneum.Email}
            text={a => setEmail(a)}
          />

          <InputPswrd
            img={require('../Assets/Images/padlock.png')}
            title={Eneum.Password}
            img2={
              !security
                ? require('../Assets/Images/witness.png')
                : require('../Assets/Images/hide.png')
            }
            security={security}
            Click={() => setSecurity(!security)}
            text={a => setPassword(a)}
          />
        </View>

        <CommonButton title={Eneum.SignIn} click={() => validate()} />

        <View style={StyleSheet.loginCreateView}>
          <Text>{Eneum.DontHaveAcc}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: 'blue'}}>{Eneum.Create}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
