import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonInput from '../Component/CommonInput';
import InputPswrd from '../Component/InputPswrd';
import CommonButton from '../Component/CommonButton';
import Eneum from '../Element/Eneum/Eneum';
import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

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
      .map(({email, password}) => ({
        email,
        password,
      }));

    if (res.length == 0) {
      Alert.alert("email doesn't exist");
    } else {
      if (res[0].email == email.toLowerCase() && res[0].password == password) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Password doesnt match');
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            height: '20%',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 100, fontWeight: 'bold', color: 'blue'}}>
            {Eneum.AppName}
          </Text>
          <Text style={{fontSize: 22}}>Sign in to your account</Text>
        </View>

        <View
          style={{
            height: 170,
            // backgroundColor: 'blue',
            justifyContent: 'space-evenly',
          }}>
          <CommonInput
            img={require('../Assets/Images/mail.png')}
            title="Email"
            text={a => setEmail(a)}
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
            text={a => setPassword(a)}
          />
          {/* <TouchableOpacity>
            <Text style={{color: 'grey', textAlign: 'right'}}>
              Forgot your password?
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 32}}>Sign In</Text>
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
        <CommonButton title="Sign In" click={() => validate()} />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Don't have any account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: 'blue'}}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
