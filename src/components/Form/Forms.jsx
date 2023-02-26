import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { debounce, handleFilter, handleSelection } from '../../helpers/util.function';
import { FormEl, Button } from './Form.styled';
import FormField from './FormField';

export default function Form() {
    const [isData, setIsData] = useState(false)

    const WC = useContext(WeatherDataContext);

    const [filteredVals, setFilteredVals] = useState({ country: '', city: '' });
    const [countryVal, setCountryVal] = useState('');
    const [cityVal, setCityVal] = useState('')

    const navigate = useNavigate()

    const [filteredCountries, setFilteredCountries] = useState(WC.countries);
    const [filteredCities, setFilteredCities] = useState(WC.cities);

    const [isFilCountryData, setIsFilCountryData] = useState(false);
    const [isFilCityData, setIsFilCityData] = useState(false);

    const countryInput = useRef(null);
    const cityInput = useRef(null);

    useEffect(() => {
        handleFilter(cityVal, WC.cities, setFilteredCities, setIsFilCityData);
    }, [cityVal]);
    useEffect(() => {
        handleFilter(countryVal, WC.countries, setFilteredCountries, setIsFilCountryData);
    }, [countryVal]);

    function handleInput(e, type) {
        if (e.target.value) {
            type === 'city' ? setCityVal(e.target.value) : setCountryVal(e.target.value);
        } else {
            type === 'city' ? setCityVal(WC.currentCity) : setCountryVal(WC.currentCountry);
        }
    }
    const debounceInput = useCallback(debounce(handleInput, 800), []);

    function handleSelectSug(type, option) {
        type === 'city' ? handleSelection(WC.setCurrentCity, option, cityInput, setIsFilCityData) : handleSelection(WC.setCurrentCountry, option, countryInput, setIsFilCountryData)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const country = WC.currentCountry.toLowerCase();
        const city = WC.currentCity.toLowerCase();
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        if (!country || !city) {
            return;
        }
        if (!(country in WC.weatherData)) {
            WC.weatherData.current[country] = {};
        }
        if (!(city in WC.weatherData.current[country])) {
            WC.weatherData.current[country][city] = {};
        }
        if (!(`${currentDay}-${currentMonth}` in WC.weatherData.current[country][city])) {
            WC.setCurrentCountry(country);
            WC.setCurrentCity(city);
        } else {
            const currentWeather = WC.weatherData.current[country][city][`${currentDay}-${currentMonth}`].current_weather;
            WC.setCurrentWeather({ ...currentWeather });
        }
        navigate('/weatherData')
    }
    if (isData) {
        return <Navigate to="/weatherData" />;
    }
    return <FormEl onSubmit={handleSubmit}>
        {['country', 'city'].map((type, i) => {
            const input = type === 'city' ? cityInput : countryInput;
            const isData = type === 'city' ? isFilCityData : isFilCountryData;
            const options = type === 'city' ? filteredCities : filteredCountries;
            return <FormField key={i} inputRef={input} type={type} isData={isData} onClickFn={handleSelectSug} options={options} debounceInput={(e) => {
                debounceInput(e, type);
            }} >
            </FormField>;
        })}
        <Button>Get Weather</Button>
    </FormEl>;
}
