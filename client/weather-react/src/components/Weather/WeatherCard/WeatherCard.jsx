import DataCard from '../../DataCard/DataCard';
import * as SC from './WeatherCard.style';

export default function WeatherCard({ weatherData }) {
    console.log('weatherData', weatherData)
    return <SC.Section>
        <h1>weather data</h1>
        {weatherData && Object.entries(weatherData).map((data, i) => {
            console.log('data', data);
            if (typeof data[1] === 'object') {
                return;
            }
            return <DataCard data={data} key={i} />;
        })}
    </SC.Section>;
}
