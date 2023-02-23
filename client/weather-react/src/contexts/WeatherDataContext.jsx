import { createContext, useCallback, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

const WeatherDataContext = createContext({});

const WeatherDataProvider = ({ children }) => {
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);
    const [weatherData, setWeatherData] = useState({});
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
    const weatherState = {
        fetchWeatherDataFN
    };
    return <WeatherDataContext.Provider value={weatherState} >{children}</WeatherDataContext.Provider>;
};

export { WeatherDataProvider, WeatherDataContext };