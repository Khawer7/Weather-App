import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import { useState } from 'react';

export default function App() {

  const [savedName, setSavedName] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');

  function cityNameHandler(cityName) {
    console.log(cityName);
    setSavedName(cityName);
  }

  function backgroundHandler(background) {
    setBackgroundImg(background)
    console.log(backgroundImg,'background');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode='cover' style={styles.container}>
      <SearchBar cityName={cityNameHandler} />
      <Weather savedName={savedName} backgroundHandler={backgroundHandler}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width
  },
});
