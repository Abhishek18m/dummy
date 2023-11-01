import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {ref, onValue, push, update, remove} from 'firebase/database';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {useIsFocused} from '@react-navigation/native';

import {db} from '../Firebase/firebase-config';
import color from '../Assets/Color/color';
import TopBar from '../Component/TopBar';
import StyleSheet from '../StyleSheet/StyleSheet';
import Eneum from '../Element/Eneum/Eneum';

const Profile = ({navigation}) => {
  const focus = useIsFocused();

  useEffect(() => {
    fetchData();
  }, [focus]);

  const fetchData = async () => {
    let res = await AsyncStorage.getItem('userLogin');
    parseData = JSON.parse(res);
    getData(parseData);
  };

  const getData = data => {
    let arr = [];
    onValue(ref(db, '/UserDetails'), querySnapShot => {
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        arr.push(obj);
      });
      setUsers(arr);
    });
    setMyDetails(data);
    accountDetails(data);
    blockedUsers(data);
  };

  const accountDetails = data => {
    let myArr = [];
    onValue(ref(db, `/ChatList/${data.id}`), querySnapShot => {
      myArr = [];
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        myArr.push(obj);
      });
      setConUsers(myArr);
    });
  };
  const blockedUsers = data => {
    let blockArr = [];
    onValue(ref(db, `/BlockList/${data.id}`), querySnapShot => {
      blockArr = [];
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        blockArr.push(obj);
      });
      setBlock(blockArr);
    });
  };

  const [users, setUsers] = useState([]);
  const [myDetails, setMyDetails] = useState([]);
  const [conUsers, setConUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [block, setBlock] = useState([]);

  const data = [
    {
      title: Eneum.YourAcc,
      source: require('../Assets/Images/account.png'),
      tint: '#5579f1',
      color: '#d6e9ff',
    },
    {
      title: Eneum.Notifications,
      source: require('../Assets/Images/notification.png'),
      // color: '#ffffbf',
      tint: '#5579f1',
      color: '#d6e9ff',
    },
    {
      title: Eneum.TermsAndConditions,
      source: require('../Assets/Images/terms.png'),
      // color: '#bfffbf',
      // tint: '#008000',
      tint: '#5579f1',
      color: '#d6e9ff',
    },
    {
      title: Eneum.HelpAndSupport,
      source: require('../Assets/Images/support.png'),
      // color: '#d6e9ff',
      tint: '#5579f1',
      color: '#d6e9ff',
    },
    {
      title: Eneum.LogOut,
      source: require('../Assets/Images/logout.png'),
      // color: '#ffbfbf',
      tint: '#5579f1',
      color: '#d6e9ff',
    },
  ];

  const Button = title => {
    if (title === Eneum.LogOut) {
      setShow(true);
    } else {
      null;
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => Button(item.title)}
        style={StyleSheet.profileBtn}>
        <View style={StyleSheet.profileBtnView}>
          <Image source={item.source} style={StyleSheet.profileBtnImg} />
        </View>
        <Text style={{fontSize: 18}}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const logOut = () => {
    setShow(false);
    AsyncStorage.setItem('status', 'false');
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 100);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.primary}}>
      <TopBar title={Eneum.Profile} />
      <View style={StyleSheet.profileView}>
        <View style={StyleSheet.profileImgView}>
          <Image
            source={require('../Assets/Images/user.png')}
            style={StyleSheet.profileImg}
          />
        </View>

        <View style={StyleSheet.profileName}>
          <Text style={{fontSize: 24}}>{myDetails?.name}</Text>

          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/pen.png')}
              style={{height: 15, width: 15}}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 14, fontWeight: '300', alignSelf: 'center'}}>
          {myDetails?.email}
        </Text>

        <View style={StyleSheet.profileData}>
          <View style={StyleSheet.profileDataView}>
            <Text>{Eneum.Users}</Text>
            <Text>{users?.length - 1}</Text>
          </View>
          <View style={StyleSheet.profileDataView}>
            <Text>{Eneum.Friends}</Text>
            <Text>{conUsers.length}</Text>
          </View>
          <View style={StyleSheet.profileDataView}>
            <Text>{Eneum.Blocked}</Text>
            <Text>{block.length}</Text>
          </View>
        </View>

        <View style={StyleSheet.profileMenu}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      </View>
      <Dialog
        visible={show}
        onTouchOutside={() => {
          setShow(false);
        }}>
        <DialogContent>
          {show ? (
            <View
              style={{
                height: 100,
                width: 150,
                justifyContent: 'space-evenly',
                // backgroundColor: 'yellow',
              }}>
              <Text style={{fontSize: 20, alignSelf: 'center'}}>
                {Eneum.AreYouSure}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <View>
                    <Text style={{fontSize: 20}}>{Eneum.No}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logOut()}>
                  <View>
                    <Text style={{fontSize: 20}}>{Eneum.Yes}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </DialogContent>
      </Dialog>
    </SafeAreaView>
  );
};

export default Profile;
