import { useContext } from 'react';
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../../contexts/WeatherDataContext";

export default function WeatherPage() {
    const WC = useContext(WeatherDataContext);
    return <div>
        <h1>WeatherPage for {WC.currentCity}, {WC.currentCountry}</h1>
        {Object.keys(WC.currentWeather).length > 0 && <WeatherCard weatherData={WC.currentWeather} />}
        {Object.keys(WC.currentWeather).length === 0 && <h2>No data found for {WC.currentCity}, {WC.currentCountry}</h2>}
    </div>;
}
