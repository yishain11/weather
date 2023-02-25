import clearSky from "./clear_sky.svg";
import cloudy from './cloudy.svg';
import fog from './fog.svg';
import lightRain from './light-rain.png';
import rain from './rainfall.png';
import snow from './light-snow.png';
import storm from './stormy-weather.png';

const imgMap = {
    weathercode: {
        0: clearSky,
        1: cloudy,
        2: cloudy,
        3: cloudy,
        45: fog,
        48: fog,
        51: lightRain,
        53: lightRain,
        55: lightRain,
        56: rain,
        57: rain,
        61: rain,
        63: rain,
        65: rain,
        66: rain,
        67: rain,
        71: snow,
        73: snow,
        75: snow,
        77: snow,
        80: rain,
        81: rain,
        82: rain,
        85: snow,
        86: snow,
        95: storm,
        96: storm,
        99: storm
    }
    ,

};

export default imgMap;