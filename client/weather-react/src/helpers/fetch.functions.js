import { countries } from "../data/countries";
import { getLatLng, getWeatherData } from '../helpers/getWeatherHelpers';

export function getCountries() {
    return countries;
}

export function getWeather(country, city) {
    const { lat, lon } = getLatLng(country, city);
    return getWeatherData(lat, lon);
}