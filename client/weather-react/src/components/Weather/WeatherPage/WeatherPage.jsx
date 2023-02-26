import { useContext } from 'react';
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../../contexts/WeatherDataContext";
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../../Form/Form.styled';
import { Row } from '../../Containers/Containers';
import { NavBtn } from './WeatherPage.style';

export default function WeatherPage() {
    const WC = useContext(WeatherDataContext);
    const navigate = useNavigate();

    if (!WC.currentCity || !WC.currentCountry) {
        return <Navigate to="/" />;
    }
    return <div>
        <h1>WeatherPage for {WC.currentCity}, {WC.currentCountry}</h1>
        {Object.keys(WC.currentWeather).length > 0 ? <WeatherCard weatherData={WC.currentWeather} /> : <h2>No data found for {WC.currentCity}, {WC.currentCountry}</h2>}
        <Row style={{ marginTop: '1vh' }}>
            <NavBtn onClick={() => { navigate('/'); }}>
                Choose Another Location
            </NavBtn>
            <NavBtn>Show 5 days predictions</NavBtn>
        </Row>
    </div>;
}
