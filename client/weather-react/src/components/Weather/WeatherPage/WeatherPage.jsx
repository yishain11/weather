import { useContext } from 'react';
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../../contexts/WeatherDataContext";

export default function WeatherPage() {
    const WC = useContext(WeatherDataContext);
    return <div>
        <h1>WeatherPage</h1>
        <WeatherCard weatherData={WC.currentWeather} />
    </div>;
}
