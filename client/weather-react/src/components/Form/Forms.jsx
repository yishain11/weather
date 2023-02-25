import { useContext, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { FormEl, FieldsContainer, Label, Input } from './Form.styled';

export default function Form() {
    const [isData, setIsData] = useState(false)
    const countryInput = useRef(null);
    const cityInput = useRef(null);
    const serverURL = useRef(import.meta.env.VITE_SERVER_URL_DEV);
    const WC = useContext(WeatherDataContext);

    function handleSubmit(e) {
        e.preventDefault();
        const country = countryInput.current.value.toLowerCase();
        const city = cityInput.current.value.toLowerCase();
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        console.log('WC.currentWeather', WC.currentWeather);
        if (!(country in WC.weatherData)) {
            WC.weatherData.current[country] = {};
        }
        if (!(city in WC.weatherData.current[country])) {
            WC.weatherData.current[country][city] = {};
        }
        if (!(`${currentDay}-${currentMonth}` in WC.weatherData.current[country][city])) {
            //  with memo
            WC.setCurrentCountry(country);
            WC.setCurrentCity(city);
            console.log('weatherData', WC.weatherData);
            setIsData(true);
            // const headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            // WC.fetchWeatherDataFN(country, city).then(res => {
            //     console.log('res client', res);
            //     currentData.current[country][city][`${currentDay}-${currentMonth}`] = res.weatherRes;
            //     WC.setCurrentWeather(res.weatherRes.current_weather);
            //     console.log('currentData.', currentData.current);
            //     localStorage.setItem('currentWeather', JSON.stringify(res.weatherRes.current_weather))
            //     setIsData(true);
            // }).catch(err => console.error('fetch err', err));
        } else {
            console.log('found old data to use');
            console.log('currentData.current[country][city][`${currentDay}-${currentMonth}`].current_weather', currentData.current[country][city][`${currentDay}-${currentMonth}`].current_weather);
            const currentWeather = WC.weatherData.current[country][city][`${currentDay}-${currentMonth}`].current_weather;
            WC.setCurrentWeather({ ...currentWeather });
            setIsData(true);
        }
    }
    if (isData) {
        return <Navigate to="weatherData" />;
    }
    return <FormEl onSubmit={handleSubmit}>
        <FieldsContainer>
            <Label htmlFor="country">Country</Label>
            <Input ref={countryInput} type="text" name='country' />
        </FieldsContainer>
        <FieldsContainer>
            <Label htmlFor="city">City</Label>
            <Input ref={cityInput} type="text" name='city' />
        </FieldsContainer>
        <button>Get Weather</button>
    </FormEl>;
}
