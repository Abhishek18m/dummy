import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useTheme} from '../../AppNavigator/Navigator';
import color from '../Color/color';
import TopBar from '../../Component/TopBar';
import Eneum from '../../Element/Eneum/Eneum';
import {View} from 'react-native-animatable';

import AsyncStorage from '@react-native-community/async-storage';

const Theme = ({navigation}) => {
  useEffect(() => {
    getIndex();
  }, []);

  const getIndex = async () => {
    let i = await AsyncStorage.getItem('index');
    i = JSON.parse(i);
    {
      i ? setMyIndex(i) : null;
    }
  };

  // const navigation = useNavigation();
  const {getItem, theme, font} = useTheme();
  const [myIndex, setMyIndex] = useState(-1);
  const [data, setData] = useState([
    {
      color: color.primary1,
      font: color.font1,
      name: 'Option 1',
      colorA: color.primary1A,
      colorB: color.primary1B,
    },
    {
      color: color.primary2,
      font: color.font1,
      name: 'Option 2',
      colorA: color.primary2A,
      colorB: color.primary2B,
    },
    {
      color: color.primary3,
      font: color.font1,
      name: 'Option 3',
      colorA: color.primary3A,
      colorB: color.primary3B,
    },
    {
      color: color.primary4,
      font: color.font2,
      name: 'Option 4',
      colorA: color.primary4A,
      colorB: color.primary4B,
    },
    {
      color: color.primary5,
      font: color.font1,
      name: 'Option 5',
      colorA: color.primary5A,
      colorB: color.primary5B,
    },
    {
      color: color.primary6,
      font: color.font1,
      name: 'Option 6',
      colorA: color.primary6A,
      colorB: color.primary6B,
    },
  ]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: item.color,
          marginVertical: 5,
          height: 50,
          width: Dimensions.get('screen').width * 0.9,
          alignSelf: 'center',
          // alignItems: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 10,
          paddingHorizontal: 20,

          flexDirection: 'row',
        }}
        onPress={() => [
          setTheme(item),
          setMyIndex(index),
          AsyncStorage.setItem('index', JSON.stringify(index)),
        ]}>
        <Text style={{color: item.font}}>{item.name}</Text>
        {index === myIndex ? (
          <Image
            source={require('../Images/task.png')}
            style={{
              height: 15,
              width: 15,
              tintColor: 'blue',
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  const setTheme = item => {
    let obj = {
      color: item.color,
      font: item.font,
      colorA: item.colorA,
      colorB: item.colorB,
    };
    AsyncStorage.setItem('theme', JSON.stringify(obj));
    getItem(item.color, item.font, item.colorA, item.colorB);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../Images/leftmark.png')}
            style={{height: 25, width: 25, tintColor: font}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: 'white',
            color: font,
            alignSelf: 'center',
          }}>
          Themes
        </Text>
        <View style={{height: 25, width: 25}} />
      </View>
      <View style={[{flex: 1, backgroundColor: color.secondary}]}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Theme;
