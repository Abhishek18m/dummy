import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import StyleSheet from '../StyleSheet/StyleSheet';
import Eneum from '../Element/Eneum/Eneum';

const SearchBar = props => {
  const [search, setSearch] = useState(false);
  const blurr = useRef();
  return (
    <View style={StyleSheet.searchView}>
      <Image
        source={require('../Assets/Images/search.png')}
        style={StyleSheet.searchImg}
      />
      <TextInput
        onFocus={() => setSearch(true)}
        placeholder={Eneum.Search}
        style={{flex: 1}}
        ref={blurr}
        onBlur={() => setSearch(false)}
        onChangeText={props.onChangeText}
      />
      {search ? (
        <TouchableOpacity
          onPress={() => [setSearch(false), blurr.current.blur()]}>
          <Image
            source={require('../Assets/Images/cross.png')}
            style={StyleSheet.searchCross}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
