import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { getWeather, getCitiesByCountry, getCountries } from '../helpers/fetch.functions';
import { processDailyWeather } from '../helpers/util.function';
const WeatherDataContext = createContext({});

const WeatherDataProvider = ({ children }) => {
    const [currentCountry, setCurrentCountry] = useState('');
    const [currentCity, setCurrentCity] = useState('')
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([])
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);
    const weatherData = useRef({});
    const [currentWeather, setCurrentWeather] = useState(JSON.parse(localStorage.getItem('currentWeather')) || {})
    const [nextDaysWeather, setNextDaysWeather] = useState(JSON.parse(localStorage.getItem('nextDaysWeather')) || {})

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
                console.log('res', res)
                if (res?.weatherRes?.current_weather) {
                    setCurrentWeather(res.weatherRes.current_weather);
                    weatherData.current = res?.weatherRes?.current_weather;
                } else {
                    setCurrentWeather({});
                    weatherData.current = {};
                }
                if (res?.weatherRes?.daily) {
                    console.log('res?.weatherRes?.daily', res?.weatherRes?.daily);
                    const processedDailyData = processDailyWeather(res.weatherRes.daily);
                    setNextDaysWeather({ dailyData: processedDailyData, dailyUnits: res.weatherRes.daily_units });
                    localStorage.setItem('nextDaysWeather', JSON.stringify({ dailyData: processedDailyData, dailyUnits: res.weatherRes.daily_units }));
                }
            })
            .catch(err => {
                console.error('error loading data: ', err);
                setCurrentWeather({});
                weatherData.current = {};
                setNextDaysWeather({})
            });
    }, [currentCity, currentCountry])
    const weatherState = {
        currentWeather,
        currentCity,
        currentCountry,
        cities,
        countries,
        weatherData,
        nextDaysWeather,
        setCurrentWeather,
        setCurrentCountry,
        setCurrentCity,
    };
    return <WeatherDataContext.Provider value={weatherState} >{children}</WeatherDataContext.Provider>;
};

export { WeatherDataProvider, WeatherDataContext };