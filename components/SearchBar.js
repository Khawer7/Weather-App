import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const SearchBar = (props) => {

  const [name, setName] = useState('');

  function cityNameHandler(cityName) {
    setName(cityName);
  }

  function nameEnterHandler() {
    props.cityName(name); 
  }

  return (
    <View style={styles.searchBar}>
      <TextInput placeholder='Enter Your City Name' onChangeText={cityNameHandler}/>
      <AntDesign name="search1" size={24} color="black" onPress={nameEnterHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
    searchBar : {
        flexDirection : 'row',
        borderWidth: 1.5,
        width: Dimensions.get('screen').width - 80,
        justifyContent: 'space-between',
        padding:10,
        borderRadius:5,
        marginTop:200,
        borderColor : 'white',
        backgroundColor : '#F5EDED'
    }
});

export default SearchBar;
