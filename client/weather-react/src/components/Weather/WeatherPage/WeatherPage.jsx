import { useContext } from 'react';
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../../contexts/WeatherDataContext";
import { Navigate } from 'react-router-dom';

export default function WeatherPage() {
    const WC = useContext(WeatherDataContext);
    if (!WC.currentCity || !WC.currentCountry) {
        return <Navigate to="/" />;
    }
    return <div>
        <h1>WeatherPage for {WC.currentCity}, {WC.currentCountry}</h1>
        {Object.keys(WC.currentWeather).length > 0 ? <WeatherCard weatherData={WC.currentWeather} /> : <h2>No data found for {WC.currentCity}, {WC.currentCountry}</h2>}
    </div>;
}
