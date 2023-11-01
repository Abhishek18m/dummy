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
import ChatBox from '../Component/ChatBox';
import color from '../Assets/Color/color';
import StyleSheet from '../StyleSheet/StyleSheet';
import {useIsFocused} from '@react-navigation/native';
import TopBar from '../Component/TopBar';
import SearchBar from '../Component/SearchBar';
import Eneum from '../Element/Eneum/Eneum';

const UserList = props => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [sender, setSender] = useState({});
  const [search, setSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  // const [find, setFind] = useState('');

  const blurr = useRef();

  const focus = useIsFocused();

  useEffect(() => {
    getData();
  }, [focus]);

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
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const renderItem = ({item}) => {
    return (
      <ChatBox
        onPress={() =>
          props.navigation.navigate('ChatScreen', {
            receiver_data: item,
            sender_data: sender,
          })
        }
        name={item.name}
        messages={item.messages}
      />
    );
  };

  const onRefresh = () => {
    setData([]);
    getData();
  };
  const findUser = text => {
    if (text) {
      let trimText = text.trim();
      const newData = data.filter(item => {
        return item.name.toUpperCase().indexOf(trimText.toUpperCase()) > -1;
      });

      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.primary}}>
      <TopBar title={Eneum.Users} />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <SearchBar onChangeText={e => findUser(e)} />
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={filterData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default UserList;
