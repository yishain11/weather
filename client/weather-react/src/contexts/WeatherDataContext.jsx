import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { getWeather, getCitiesByCountry, getCountries } from '../helpers/fetch.functions';
const WeatherDataContext = createContext({});

const WeatherDataProvider = ({ children }) => {
    const [currentCountry, setCurrentCountry] = useState('');
    const [currentCity, setCurrentCity] = useState('')
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([])
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);
    console.log('serverURL', serverURL)
    const weatherData = useRef({});
    const [currentWeather, setCurrentWeather] = useState(JSON.parse(localStorage.getItem('currentWeather')) || {})

    useEffect(() => {
        getCountries(serverURL)
            .then(res => {
                setCountries(res);
            })
            .catch(err => {
                console.error('err in loading cities', err);
            });
    }, []);
    useEffect(() => {
        if (currentCountry) {
            getCitiesByCountry(serverURL, currentCountry)
                .then(res => {
                    console.log('cities by country', currentCountry, ' ', res);
                    setCities(res);
                })
                .catch(err => {
                    console.error('error in loading cities:', err);
                });
        }
    }, [currentCountry]);
    useEffect(() => {
        if (currentCity === '' || currentCountry === '') {
            return;
        }
        getWeather(serverURL, currentCountry, currentCity)
            .then(res => {
                if (res?.weatherRes?.current_weather) {
                    setCurrentWeather(res.weatherRes.current_weather);
                    weatherData.current = res?.weatherRes?.current_weather;
                } else {
                    setCurrentWeather({});
                    weatherData.current = {};
                }
            })
            .catch(err => {
                console.error('error loading data: ', err);
                setCurrentWeather({});
                weatherData.current = {};
            });
    }, [currentCity, currentCountry])
    const weatherState = {
        setCurrentWeather,
        currentWeather,
        setCurrentCountry,
        setCurrentCity,
        currentCity,
        currentCountry,
        weatherData,
        cities,
        countries
    };
    return <WeatherDataContext.Provider value={weatherState} >{children}</WeatherDataContext.Provider>;
};

export { WeatherDataProvider, WeatherDataContext };