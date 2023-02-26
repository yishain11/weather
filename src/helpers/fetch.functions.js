import { countries } from "../data/countries";
import { getLatLng, getWeatherData } from '../helpers/getWeatherHelpers';

export function getCountries() {
    return countries;
}

export function getWeather(country, city) {
    const { lat, lon } = getLatLng(country, city);
    console.log('lat, lon', lat, lon)
    return getWeatherData(lat, lon);
}