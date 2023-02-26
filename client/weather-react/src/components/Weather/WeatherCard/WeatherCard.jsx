import DataCard from '../../DataCard/DataCard';
import * as SC from './WeatherCard.style';


export default function WeatherCard({ weatherData }) {
    return <SC.Section>
        {weatherData && Object.entries(weatherData).map((data, i) => {
            if (typeof data[1] === 'object') {
                return;
            }
            return <DataCard data={data} key={i} />;
        })}
    </SC.Section>;
}
