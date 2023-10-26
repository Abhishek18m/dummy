import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [user, setUser] = useState([]);
  const [myuser, setMyUser] = useState('');
  const blurr = useRef();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await AsyncStorage.getItem('userLogin');
    parseData = JSON.parse(res);
    fetchData(parseData);
  };
  const fetchData = data => {
    let arr = [];
    onValue(ref(db, `/ChatList/${data.id}`), querySnapShot => {
      arr = [];
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        arr.push(obj);
      });
      setData(arr);
      setRefreshing(false);
      setMyUser(data);
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatScreen', {
            receiver_data: item,
            sender_data: myuser,
          })
        }
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
          source={require('../Assets/Images/2.jpg')}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginHorizontal: 20,
          }}
        />
        <View style={{flex: 1}}>
          <Text>{item.name}</Text>
          <Text>Messages</Text>
        </View>
        <Text>Time</Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setData([]);
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: '3%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
            <Text>Users</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Messages</Text>
          <TouchableOpacity
            onPress={() => [
              AsyncStorage.setItem('status', 'false'),
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            ]}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            // paddingHorizontal: 15,
            alignItems: 'center',
            borderWidth: 0.5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../Assets/Images/search.png')}
            style={{
              height: 15,
              width: 15,
              marginHorizontal: 10,
              alignSelf: 'center',
            }}
          />
          <TextInput
            onFocus={() => setSearch(true)}
            placeholder="Search"
            style={{flex: 1}}
            ref={blurr}
            onBlur={() => setSearch(false)}
          />
          {search ? (
            <TouchableOpacity
              onPress={() => [setSearch(false), blurr.current.blur()]}>
              <Image
                source={require('../Assets/Images/cross.png')}
                style={{
                  height: 15,
                  width: 15,
                  marginHorizontal: 10,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
