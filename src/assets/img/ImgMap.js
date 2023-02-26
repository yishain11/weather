// all icons are from freeicons.io

import clearSky from "./clear_sky.svg";
import cloudy from './cloudy.svg';
import fog from './fog.svg';
import lightRain from './light-rain.png';
import rain from './rainfall.png';
import snow from './light-snow.png';
import storm from './stormy-weather.png';

import cold from './cold.svg';
import veryCold from './very_cold.svg';
import mediumTemp from './medium.svg';
import hot from './hot.svg';
import veryHot from './very_hot.svg';

import slowWind from './slow_wind.svg';
import midWind from './medium_wind.svg';
import fastWinds from './fast_wind.svg';

import north from './north.svg';
import northEast from './north_east.svg';
import east from './east.svg';
import southEast from './south_east.svg';
import south from './south.svg';
import southWest from './south_west.svg';
import west from './west.svg';
import northWest from './north_west.svg';

const imgMap = {
    weathercode: {
        0: [clearSky, 'clear sky'],
        1: [cloudy, 'cloudy'],
        2: [cloudy, 'cloudy'],
        3: [cloudy, 'cloudy'],
        45: [fog, 'fog'],
        48: [fog, 'fog'],
        51: [lightRain, 'lightRain'],
        53: [lightRain, 'lightRain'],
        55: [lightRain, 'lightRain'],
        56: [rain, 'rain'],
        57: [rain, 'rain'],
        61: [rain, 'rain'],
        63: [rain, 'rain'],
        65: [rain, 'rain'],
        66: [rain, 'rain'],
        67: [rain, 'rain'],
        71: [snow, 'snow'],
        73: [snow, 'snow'],
        75: [snow, 'snow'],
        77: [snow, 'snow'],
        80: [rain, 'rain'],
        81: [rain, 'rain'],
        82: [rain, 'rain'],
        85: [snow, 'snow'],
        86: [snow, 'snow'],
        95: [storm, 'storm'],
        96: [storm, 'storm'],
        99: [storm, 'storm'],
    },
    windspeed: {
        slow: [slowWind, "slow speed"],
        medium: [midWind, "medium speed"],
        fast: [fastWinds, "fast speed"]
    },
    winddirection: {
        north: [north, 'north'],
        northEast: [northEast, 'north east'],
        east: [east, "east"],
        southEast: [southEast, "south east"],
        south: [south, "south"],
        southWest: [southWest, "south west"],
        west: [west, "west"],
        northWest: [northWest, "north west"]
    },
    temperature: {
        veryHot: [veryHot, "very hot"],
        hot: [hot, "hot"],
        medium: [mediumTemp, "medium temp"],
        cold: [cold, "cold"],
        veryCold: [veryCold, "very cold"],
    }
};

export function getImg(title, value) {
    if (title === 'time') {
        return [undefined, undefined];
    }
    if (imgMap[title][value]) {
        return imgMap[title][value];
    }
    switch (title) {
        case 'temperature':
            if (value < 0) {
                return imgMap[title]['veryCold'];
            } else if (value < 5) {
                return imgMap[title]['cold'];
            } else if (value < 15) {
                return imgMap[title]['medium'];
            } else if (value < 30) {
                return imgMap[title]['hot'];
            } else {
                return imgMap[title]['veryHot'];
            }
        case 'winddirection':
            if (value < 45) {
                return imgMap[title]['north'];
            } else if (value < 90) {
                return imgMap[title]['northEast'];
            } else if (value < 135) {
                return imgMap[title]['east'];
            } else if (value < 180) {
                return imgMap[title]['southEast'];
            } else if (value < 225) {
                return imgMap[title]['south'];
            } else if (value < 270) {
                return imgMap[title]['southWest'];
            } else if (value < 315) {
                return imgMap[title]['west'];
            } else {
                return imgMap[title]['northWest'];
            }
        case 'windspeed':
            if (value < 5) {
                return imgMap[title]['slow'];
            } else if (value < 15) {
                return imgMap[title]['medium'];
            } else {
                return imgMap[title]['fast'];
            }
        case 'temperature':

            break;
        default:
            break;
    }
}

export default getImg;