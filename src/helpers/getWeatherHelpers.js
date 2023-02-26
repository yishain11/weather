
import { countries } from '../data/countries';
import { data } from '../data/parsed';
const weatherUrl = import.meta.env.VITE_WEATHER_URL;

function getLatLng(country, city) {
    if (!countries.includes(country)) {
        return;
    }
    return data[country][city];
};

function getCities(country) {
    if (!(countries.includes(country))) {
        return;
    }
    return Object.keys(data[country]);
}

function getWeatherData(lat, long) {
    const url = `${weatherUrl}latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max&timezone=auto&timeformat=iso8601&current_weather=true`;
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.error('err', err));
};

export { getCities, getLatLng, getWeatherData };