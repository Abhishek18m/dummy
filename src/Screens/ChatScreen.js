import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {ref, onValue, push, update, set, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

import moment from 'moment';
import StyleSheet from '../StyleSheet/StyleSheet';

import Eneum from '../Element/Eneum/Eneum';

import {useTheme} from '../AppNavigator/Navigator';
import color from '../Assets/Color/color';

const ChatScreen = props => {
  const {theme, colorA, colorB, font} = useTheme();
  let style = StyleSheet;
  const route = useRoute();

  const flatListRef = useRef();

  const [messages, setMessages] = useState('');
  const [displayMsg, setDisplayMsg] = useState([]);
  const [seen, setSeen] = useState(false);
  const [block, setBlock] = useState(false);
  const [blockedMe, setBlockedMe] = useState(false);
  const [keyboard, setKeyboard] = useState(true);

  const focus = useIsFocused();

  let sender = route?.params?.sender_data;
  let receiver = route?.params?.receiver_data;

  useEffect(() => {
    fetchData();
    validateBlock();
  }, [focus]);

  useEffect(() => {
    if (displayMsg.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: true});
      }, 1000);
    }
  }, [displayMsg]);

  const validateBlock = () => {
    let arr1 = [];
    onValue(
      ref(db, `/BlockList/${sender.id}/${sender.id}_${receiver.id}`),
      querySnapShot => {
        arr1 = [];
        querySnapShot.forEach(item => {
          let obj = item.val();

          arr1.push(obj);
        });
        blockUser(arr1);
      },
    );
    let arr2 = [];
    onValue(
      ref(db, `/BlockList/${receiver.id}/${receiver.id}_${sender.id}`),
      querySnapShot => {
        arr2 = [];
        querySnapShot.forEach(item => {
          let obj = item.val();

          arr2.push(obj);
        });
        gotBlocked(arr2);
      },
    );
  };

  const gotBlocked = arr2 => {
    if (arr2.length > 0) {
      setBlockedMe(true);
    } else {
      setBlockedMe(false);
    }
  };

  const blockUser = arr1 => {
    if (arr1.length > 0) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  };

  const fetchData = () => {
    let arr = [];
    onValue(
      ref(db, '/Chatting/' + sender.id + '_' + receiver.id),
      querySnapShot => {
        arr = [];
        querySnapShot.forEach(item => {
          let obj = item.val();
          obj.id = item.key;
          arr.push(obj);
        });
        setDisplayMsg(arr);
      },
    );
  };

  const Validation = () => {
    if (!messages) {
      Alert.alert(Eneum.EnterText);
    } else {
      set(ref(db, `/ChatList/${sender.id}/${receiver.id}`), {
        name: receiver.name,
        messages: messages,
        id: receiver.id,
        time: new Date().getTime(),
        seen: false,
      });
      {
        blockedMe
          ? null
          : set(ref(db, `/ChatList/${receiver.id}/${sender.id}`), {
              name: sender.name,
              messages: messages,
              id: sender.id,
              time: new Date().getTime(),
              seen: false,
            });
      }

      push(ref(db, '/Chatting/' + sender.id + '_' + receiver.id), {
        messages: messages,
        time: new Date().getTime(),

        side: 'right',
      });
      {
        blockedMe
          ? null
          : push(ref(db, '/Chatting/' + receiver.id + '_' + sender.id), {
              messages: messages,
              time: new Date().getTime(),

              side: 'left',
            });
      }

      setMessages('');
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={[
            style.chatBox,
            {
              backgroundColor: item.side == 'right' ? colorA : colorB,
              borderBottomLeftRadius: item.side == 'right' ? 20 : 0,
              borderBottomRightRadius: item.side == 'left' ? 20 : 0,
              alignSelf: item.side == 'right' ? 'flex-end' : 'flex-start',
            },
          ]}
          onPress={() => setTime(!time)}>
          <Text
            style={{
              maxWidth: Dimensions.get('screen').width * 0.6,
              color: 'black',
            }}>
            {item.messages}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 8,
            alignSelf: item.side == 'right' ? 'flex-end' : 'flex-start',
            color: color.time,
          }}>
          {moment(item?.time).format('LT')}
        </Text>
      </>
    );
  };
  const Block = () => {
    set(ref(db, `/BlockList/${sender.id}/${sender.id}_${receiver.id}`), {
      Name: receiver.name,
    });
  };
  const UnBlock = () => {
    remove(ref(db, `/BlockList/${sender.id}/${sender.id}_${receiver.id}`));
  };
  const getItemLayout = (data, index) => ({
    length: 100, // Adjust this value based on your item height
    offset: 100 * index,
    index,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme}}>
      <View style={{flex: 1}} fo>
        <View style={style.chatTopView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../Assets/Images/leftmark.png')}
              style={style.chatBackBtn}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/user.png')}
              style={style.chatReceiverImg}
            />
          </TouchableOpacity>
          <Text style={[style.chatUserName, {color: font}]}>
            {receiver.name}
          </Text>
          {!block ? (
            <TouchableOpacity onPress={() => [Block(), setBlock(true)]}>
              <Text style={{color: font}}>Block</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => [UnBlock(), setBlock(false)]}>
              <Text style={{color: font}}>UnBlock</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}>
          <FlatList
            data={displayMsg}
            renderItem={renderItem}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={
              displayMsg.length !== 0 ? displayMsg.length - 1 : 0
            }
            getItemLayout={getItemLayout}
          />
          {!block ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 0.95,
                  flexDirection: 'row',
                  backgroundColor: colorA,
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  borderRadius: 40,

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 0.22,

                  elevation: 3,
                }}>
                <TextInput
                  placeholder="Text something..."
                  style={{flex: 1}}
                  onChangeText={e => setMessages(e)}
                  value={messages}
                />
              </View>
              <TouchableOpacity onPress={() => Validation()}>
                <Image
                  source={require('../Assets/Images/send.png')}
                  style={{height: 30, width: 30, tintColor: theme}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{alignSelf: 'center'}}>The User is Blocked</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
