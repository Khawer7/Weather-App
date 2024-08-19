import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from '../assets/index';

const API_KEY = "4c2bb92778bbb9f07988c651193d35d9";


const Weather = (props) => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState('');
    const [ background, setBackground ] = useState('');

    async function getWeatherData(cityName) {
        setLoading(true);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        const res = await fetch(API);

        if (res.status == 200) {
            const data = await res.json();
            setWeatherData(data);
        } else {
            setWeatherData(null);
        }
        setLoading(false);
    }

    useEffect(() => {
        getWeatherData(props.savedName)

        const iconObj = {
            snow: <FontAwesome name="snowflake-o" size={38} color="white" />,
            clear: <Feather name="sun" size={38} color="white" />,
            rain: <Ionicons name="rainy" size={38} color="white" />,
            clouds: <Entypo name="cloud" size={38} color="white" />,
            haze: <Fontisto name="day-haze" size={38} color="white" />
        };

        if (weatherData != null) {

            const now = new Date();
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const isDaytime = now > sunrise && now < sunset;

            switch (weatherData.weather[0].main) {
                case 'Clouds':
                    setIcons(iconObj.clouds)
                    isDaytime ? setBackground(cloud_day) : setBackground(cloud_night); 
                    break;
                case 'Rain':
                    setIcons(iconObj.rain)
                    isDaytime ? setBackground(rain_day) : setBackground(rain_night); 
                    break;
                case 'Haze':
                    setIcons(iconObj.haze)
                    isDaytime ? setBackground(haze_day) : setBackground(haze_night); 
                    break;
                case 'Clear':
                    setIcons(iconObj.clear)
                    isDaytime ? setBackground(clear_day) : setBackground(clear_night); 
                    break;
                default:
                    setIcons(iconObj.haze)
                    isDaytime ? setBackground(haze_day) : setBackground(haze_night); 
                    break;
            }

            props.backgroundHandler(background);
        }

    }, [props.savedName])

    if (loading) {
        return (
            <ActivityIndicator size={'large'} />
        )
    } else if (weatherData == null) {
        return (
            <Text style={{ marginTop: 20, fontSize: 24, textAlign: 'center' }}>Enter City Name</Text>
        )
    }

    return (
        <View>
            <View style={styles.background}></View>
            <Text style={styles.deg}>{weatherData.wind.deg}°</Text>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <View style={styles.icon}>
                <View style={styles.temp}>
                    <Text style={{color: 'white',fontSize:20}}>Humidity : {weatherData.main.humidity}</Text>
                    <Text style={{color: 'white',fontSize:20}}>Temp : {weatherData.main.temp}</Text>
                </View>

                <View>
                    <Text>{icons}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    deg: {
        fontSize: 80,
        textAlign: 'center',
        marginTop: '30%',
        color : 'white'
    },
    cityName: {
        textAlign: 'center',
        fontSize: 20,
        color : 'white'
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 50,
        height: '50%',
        alignItems: 'center',
    },
    temp : {
        backgroundColor : 'black',
        color : 'white',
        padding : 20,
        borderRadius : 5
    },
    background : {
        backgroundColor : 'black',
        width: '90%',
        height : 200,
        position : 'absolute',
        top: 100,
        opacity : .5,
        borderRadius: 5
    }
});

export default Weather;
