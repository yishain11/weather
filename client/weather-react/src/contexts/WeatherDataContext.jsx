import { createContext, useMemo, useRef, useState } from 'react';

const WeatherDataContext = createContext({});

const WeatherDataProvider = ({ children }) => {
    const [currentCountry, setCurrentCountry] = useState('');
    const [currentCity, setCurrentCity] = useState('')
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);
    const weatherData = useRef({});
    const [currentWeather, setCurrentWeather] = useState(JSON.parse(localStorage.getItem('currentWeather')) || {})
    const fetchWeatherDataFN = (country, city) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch(`http://${serverURL.current}/weather`, {
            method: 'POST',
            body: JSON.stringify({ country, city }),
            headers: headers
        })
            .then(res => res.json())
            .catch(err => console.error('fetch err', err));
    };
    const weatherDataLoaded = useMemo(() => {
        if (currentCity === '' || currentCountry === '') {
            return;
        }
        fetchWeatherDataFN(currentCountry, currentCity)
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
    }, [currentCity])
    const weatherState = {
        fetchWeatherDataFN,
        setCurrentWeather,
        currentWeather,
        setCurrentCountry,
        setCurrentCity,
        currentCity,
        currentCountry,
        weatherData
    };
    return <WeatherDataContext.Provider value={weatherState} >{children}</WeatherDataContext.Provider>;
};

export { WeatherDataProvider, WeatherDataContext };