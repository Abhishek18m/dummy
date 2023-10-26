import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ref, onValue, push, update, set, remove} from 'firebase/database';
import {db} from '../Firebase/firebase-config';

const ChatScreen = props => {
  const route = useRoute();
  // const [sender, setSender] = useState('');
  // const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState('');
  const [displayMsg, setDisplayMsg] = useState([]);
  let sender = route?.params?.sender_data;
  let receiver = route?.params?.receiver_data;

  useEffect(() => {
    fetchData();
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
      Alert.alert('Please enter text');
    } else {
      set(ref(db, `/ChatList/${sender.id}/${receiver.id}`), {
        name: receiver.name,
        messages: messages,
        id: receiver.id,
        time: new Date().getTime(),
      });
      set(ref(db, `/ChatList/${receiver.id}/${sender.id}`), {
        name: sender.name,
        messages: messages,
        id: sender.id,
        time: new Date().getTime(),
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

  const deleteChat = () => {
    remove(ref(db, `/ChatList/${sender.id}/${receiver.id}`));
    props.navigation.goBack();
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#d6d6d6',
          marginTop: 10,
          padding: 10,
          alignSelf: item.side == 'right' ? 'flex-end' : 'flex-start',
        }}>
        <Text>{item.messages}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //   justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View
              style={{
                backgroundColor: '#E8E8E8',
                padding: 5,
                borderRadius: 5,
                // marginHorizontal: '5%',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/Images/leftmark.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'grey',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/2.jpg')}
              style={{
                height: 40,
                width: 40,
                // backgroundColor: 'grey',
                borderRadius: 20,
                marginHorizontal: '3%',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, flex: 1}}>{receiver.name}</Text>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#E8E8E8',
                padding: 5,
                borderRadius: 5,
                // marginHorizontal: '5%',
                alignItems: 'center',
              }}>
              <Text>Delete Chat</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList data={displayMsg} renderItem={renderItem} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#E8E8E8',
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderBottomRightRadius: 20,
            borderEndStartRadius: 20,
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
    </SafeAreaView>
  );
};

export default ChatScreen;
