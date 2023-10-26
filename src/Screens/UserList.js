import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

const UserList = props => {
  const [data, setData] = useState([]);
  const [sender, setSender] = useState({});
  const [search, setSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const blurr = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await AsyncStorage.getItem('userLogin');
    parseData = JSON.parse(res);
    fetchUser(parseData);
  };
  const fetchUser = parseData => {
    let arr = [];
    onValue(ref(db, '/UserDetails'), querySnapShot => {
      querySnapShot.forEach(item => {
        let obj = item.val();
        obj.id = item.key;
        arr.push(obj);
      });
      saveData(arr, parseData);
    });
  };

  const saveData = (data, parseData) => {
    setTimeout(() => {
      let details = data
        .filter(item => item.email !== parseData.email)
        .map(({email, name, password, id}) => ({
          email,
          name,
          password,
          id,
        }));
      setData(details);
      setSender(parseData);
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ChatScreen', {
            receiver_data: item,
            sender_data: sender,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomWidth: 0.2,
          borderColor: 'grey',
          paddingVertical: 15,
          paddingHorizontal: 10,
          // backgroundColor: 'red',
          marginVertical: 5,
          flex: 1,
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
        <View>
          <Text>{item.name}</Text>
          <Text>Messages</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setData([]);
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../Assets/Images/left.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Users</Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text>Refresh</Text>
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
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default UserList;
