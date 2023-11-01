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
import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {ref, onValue, push, update, set, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

import moment from 'moment';
import StyleSheet from '../StyleSheet/StyleSheet';
import color from '../Assets/Color/color';
import Eneum from '../Element/Eneum/Eneum';

const ChatScreen = props => {
  let style = StyleSheet;
  const route = useRoute();

  const [messages, setMessages] = useState('');
  const [displayMsg, setDisplayMsg] = useState([]);
  const [seen, setSeen] = useState(false);
  const [block, setBlock] = useState([]);
  const [keyboard, setKeyboard] = useState(true);

  const isFocused = useIsFocused();

  let sender = route?.params?.sender_data;
  let receiver = route?.params?.receiver_data;

  useEffect(() => {
    fetchData();
    fetchBlockData();
  }, []);

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
      set(ref(db, `/ChatList/${receiver.id}/${sender.id}`), {
        name: sender.name,
        messages: messages,
        id: sender.id,
        time: new Date().getTime(),
        seen: false,
      });

      push(ref(db, '/Chatting/' + sender.id + '_' + receiver.id), {
        messages: messages,
        time: new Date().getTime(),

        side: 'right',
      });
      push(ref(db, '/Chatting/' + receiver.id + '_' + sender.id), {
        messages: messages,
        time: new Date().getTime(),

        side: 'left',
      });

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
              backgroundColor:
                item.side == 'right' ? color.sender : color.reciver,
              borderBottomLeftRadius: item.side == 'right' ? 20 : 0,
              borderBottomRightRadius: item.side == 'left' ? 20 : 0,
              alignSelf: item.side == 'right' ? 'flex-end' : 'flex-start',
            },
          ]}
          onPress={() => setTime(!time)}>
          <Text
            style={{
              maxWidth: Dimensions.get('screen').width * 0.6,
              color: item.side == 'right' ? 'white' : 'black',
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
  const fetchBlockData = () => {
    let array = [];
    onValue(ref(db, `/BlockList/${sender.id}`), querySnapShot => {
      array = [];
      querySnapShot.forEach(item => {
        let obj = item.val();
        // obj.id = item.key;
        array.push(obj);
      });
      setBlock(array);
    });
  };
  if (block.length > 0) {
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.primary}}>
      <View style={{flex: 1}}>
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
          <Text style={style.chatUserName}>{receiver.name}</Text>
          <TouchableOpacity onPress={() => Block()}>
            <Text>Block</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}>
          <FlatList data={displayMsg} renderItem={renderItem} />
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E8E8E8',
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
            <TouchableOpacity onPress={() => Validation()}>
              <Image
                source={require('../Assets/Images/send.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
