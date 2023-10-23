import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ref} from 'firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const blurr = useRef();
  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const renderItem = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen')}
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
          <Text>Name</Text>
          <Text>Messages</Text>
        </View>
        <Text>Time</Text>
      </TouchableOpacity>
    );
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
          <View style={{width: 45}}></View>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Messages</Text>
          <TouchableOpacity
            onPress={() => [
              AsyncStorage.setItem('status', 'false'),
              navigation.navigate('Login'),
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
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
