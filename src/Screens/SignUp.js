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
import Eneum from '../Element/Eneum/Eneum';

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
        Alert.alert(Eneum.EnterName);
      } else {
        Alert.alert(Eneum.MoreThan3Char);
      }
    } else if (!email) {
      Alert.alert(Eneum.EnterEmail);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert(Eneum.ValidEmail);
    } else if (num.length < 10) {
      if (!num) {
        Alert.alert(Eneum.FillNumber);
      } else {
        Alert.alert(Eneum.Num10Digits);
      }
    } else if (!pass) {
      Alert.alert(Eneum.FillPassword);
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        pass,
      )
    ) {
      Alert.alert(Eneum.StrongPassword);
    } else if (cPass !== pass) {
      Alert.alert(Eneum.PasswordDoesntMatch);
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
      Alert.alert(Eneum.EmailAlreadyReg);
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
    Alert.alert(Eneum.CreatedSuccesfully);
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
          <Text style={StyleSheet.signUpCreateText}>{Eneum.CreateAccount}</Text>

          <CommonInput
            img={require('../Assets/Images/user.png')}
            title={Eneum.YourName}
            text={a => setName(a)}
          />
          <CommonInput
            img={require('../Assets/Images/mail.png')}
            title={Eneum.EmailAddress}
            text={a => setEmail(a)}
          />
          <CommonInput
            img={require('../Assets/Images/phone.png')}
            title={Eneum.PhoneNumber}
            text={a => setNum(a)}
            length={10}
            type="numeric"
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
            text={a => setPass(a)}
          />
          <InputPswrd
            img={require('../Assets/Images/padlock.png')}
            title={Eneum.ConfirmPassword}
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

        <CommonButton title={Eneum.Create} click={() => Validate()} />
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
