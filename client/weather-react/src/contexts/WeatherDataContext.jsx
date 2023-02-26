import { createContext, useEffect, useRef, useState } from 'react';
import { getWeather, getCountries } from '../helpers/fetch.functions';
import { getCities } from '../helpers/getWeatherHelpers';
import { processDailyWeather } from '../helpers/util.function';
const WeatherDataContext = createContext({});

const WeatherDataProvider = ({ children }) => {
    const [currentCountry, setCurrentCountry] = useState('');
    const [currentCity, setCurrentCity] = useState('')
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([])
    const weatherData = useRef({});
    const [currentWeather, setCurrentWeather] = useState(JSON.parse(localStorage.getItem('currentWeather')) || {})
    const [nextDaysWeather, setNextDaysWeather] = useState(JSON.parse(localStorage.getItem('nextDaysWeather')) || {})

    useEffect(() => {
        setCountries(getCountries());
    }, []);
    useEffect(() => {
        setCities(getCities(currentCity));
    }, [currentCountry]);
    useEffect(() => {
        if (currentCity === '' || currentCountry === '') {
            return;
        }
        getWeather(currentCountry, currentCity)
            .then(res => {
                if (res?.weatherRes?.current_weather) {
                    setCurrentWeather(res.weatherRes.current_weather);
                    weatherData.current = res?.weatherRes?.current_weather;
                } else {
                    setCurrentWeather({});
                    weatherData.current = {};
                }
                if (res?.weatherRes?.daily) {
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