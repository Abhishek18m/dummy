import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {ref, onValue} from 'firebase/database';
import {db} from '../Firebase/firebase-config';
import {useIsFocused} from '@react-navigation/native';

import color from '../Assets/Color/color';
// import StyleSheet from '../StyleSheet/StyleSheet';
import ChatBox from '../Component/ChatBox';
import SearchBar from '../Component/SearchBar';
import TopBar from '../Component/TopBar';
import Eneum from '../Element/Eneum/Eneum';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  // const [search, setSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [myuser, setMyUser] = useState('');
  const [filterData, setFilterData] = useState([]);

  const focus = useIsFocused();

  useEffect(() => {
    getData();
  }, [focus]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

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
      <ChatBox
        onPress={() =>
          navigation.navigate('ChatScreen', {
            receiver_data: item,
            sender_data: myuser,
          })
        }
        name={item.name}
        messages={item.messages}
        time={moment(item?.time).format('LT')}
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
      <TopBar title={Eneum.Msgs} />

      <View style={{flex: 1, backgroundColor: color.secondary}}>
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

export default HomeScreen;
