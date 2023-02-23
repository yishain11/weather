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
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        WC.fetchWeatherDataFN(country, city).then(res => {
            console.log('res client', res);
            setIsData(true);
        }).catch(err => console.error('fetch err', err));
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
