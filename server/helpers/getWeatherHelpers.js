const fs = require('fs');
const path = require('path');

const dataObj = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/parsed.json'), 'utf-8'));
const countriesArray = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/countries.json'), 'utf-8'));
const weatherUrl = process.env.WEATHER_URL;


function getLatLng(country, city) {
    if (!countriesArray.includes(country)) {
        return;
    }
    return dataObj[country][city];
}
function getWeatherData(lat, long) {
    const url = `${weatherUrl}latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max&timezone=auto&timeformat=iso8601&current_weather=true`;
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.error('err', err));
}

module.exports = { getLatLng, getWeatherData };