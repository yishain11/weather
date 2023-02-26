import { useContext } from 'react';
import { WeatherDataContext } from '../../../contexts/WeatherDataContext';
import DataCard from '../../DataCard/DataCard';
import * as SC from './WeatherCard.style';


export default function WeatherCard({ weatherData }) {
    const WC = useContext(WeatherDataContext)
    return <SC.Section>
        <h1>Weather Page for {WC.currentCity}, {WC.currentCountry}</h1>
        {weatherData && Object.entries(weatherData).map((data, i) => {
            if (typeof data[1] === 'object') {
                return;
            }
            return <DataCard data={data} key={i} />;
        })}
    </SC.Section>;
}
