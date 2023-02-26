import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { WeatherDataContext } from '../../contexts/WeatherDataContext';
import { debounce } from '../../helpers/debounce.function';
import { FormEl, FieldsContainer, Label, Input, Button } from './Form.styled';
import SuggestionsList from '../suggestionsList/SuggestionsList';
import FormField from './FormField';

export default function Form() {
    const [isData, setIsData] = useState(false)

    const WC = useContext(WeatherDataContext);

    const [filteredCountries, setFilteredCountries] = useState(WC.countries);
    const [filteredCities, setFilteredCities] = useState(WC.cities);

    const [isFilCountryData, setIsFilCountryData] = useState(false);
    const [isFilCityData, setIsFilCityData] = useState(false);

    const [currentCountry, setCountry] = useState('');
    const [currentCity, setCity] = useState('')

    const countryInput = useRef(null);
    const cityInput = useRef(null);

    useEffect(() => {
        if (currentCity) {
            const filteredCities = WC.cities.filter(el => el.includes(currentCity));
            console.log('filteredCities', filteredCities);
            setFilteredCities(filteredCities);
            setIsFilCityData(true)
        } else {
            setFilteredCities([])
            setIsFilCityData(false)
        }
    }, [currentCity]);
    useEffect(() => {
        if (currentCountry) {
            const filteredCountries = WC.countries.filter(el => el.includes(currentCountry));
            console.log('filteredCountries', filteredCountries);
            setFilteredCountries(filteredCountries);
            setIsFilCountryData(true)
        } else {
            setFilteredCountries([])
            setIsFilCountryData(false)
        }
    }, [currentCountry]);

    function handleInput(e, type) {
        if (e.target.value) {
            type === 'city' ? setCity(e.target.value) : setCountry(e.target.value);
        } else {
            type === 'city' ? setCity(WC.cities) : setCountry(WC.countries)
        }
    }

    const debounceInput = useCallback(debounce(handleInput, 500), []);

    function handleSelectSug(type, option) {
        console.log('option', option)
        if (type === 'city') {
            setCity(option);
            cityInput.current.value = option;
            setIsFilCityData(false);
        } else if (type == "country") {
            setCountry(option);
            countryInput.current.value = option;
            setIsFilCountryData(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const country = currentCountry.toLowerCase();
        const city = currentCity.toLowerCase();
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
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
        } else {
            const currentWeather = WC.weatherData.current[country][city][`${currentDay}-${currentMonth}`].current_weather;
            WC.setCurrentWeather({ ...currentWeather });
        }
        setIsData(true);
    }
    if (isData) {
        return <Navigate to="weatherData" />;
    }
    return <FormEl onSubmit={handleSubmit}>
        <FormField inputRef={countryInput} type="country" debounceInput={(e) => {
            debounceInput(e, 'country');
        }} />
        {isFilCountryData && <SuggestionsList options={filteredCountries} onClickFn={handleSelectSug} type="country" />}
        <FormField inputRef={cityInput} type="city" debounceInput={(e) => {
            debounceInput(e, 'city');
        }} />
        <Button>Get Weather</Button>
    </FormEl>;
}
