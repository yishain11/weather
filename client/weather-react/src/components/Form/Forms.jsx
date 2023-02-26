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

    const countryInput = useRef(null);
    const cityInput = useRef(null);

    useEffect(() => {
        if (WC.currentCity) {
            const filteredCities = WC.cities.filter(el => el.includes(WC.currentCity) && el !== WC.currentCity);
            setFilteredCities(filteredCities);
            setIsFilCityData(filteredCities.length > 0)
        } else {
            setFilteredCities([])
            setIsFilCityData(false)
        }
    }, [WC.currentCity]);
    useEffect(() => {
        if (WC.currentCountry) {
            const filteredCountries = WC.countries.filter(el => el.includes(WC.currentCountry) && el !== WC.currentCountry);
            setFilteredCountries(filteredCountries);
            setIsFilCountryData(filteredCountries.length > 0)
        } else {
            setFilteredCountries([])
            setIsFilCountryData(false)
        }
    }, [WC.currentCountry]);

    function handleInput(e, type) {
        if (e.target.value) {
            type === 'city' ? WC.setCurrentCity(e.target.value) : WC.setCurrentCountry(e.target.value);
        } else {
            type === 'city' ? WC.setCurrentCity(WC.cities) : WC.setCurrentCountry(WC.countries)
        }
    }
    const debounceInput = useCallback(debounce(handleInput, 500), []);

    function handleSelectSug(type, option) {
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
        const country = WC.currentCountry.toLowerCase();
        console.log('country', country)
        const city = WC.currentCity.toLowerCase();
        console.log('city', city)
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
        setIsData(true);
    }
    if (isData) {
        console.log('isData', isData);
        return <Navigate to="/weatherData" />;
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
