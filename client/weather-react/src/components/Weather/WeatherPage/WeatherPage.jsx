import { useContext, useState } from 'react';
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../../contexts/WeatherDataContext";
import { Navigate, useNavigate } from 'react-router-dom';
import { ColContainer, Row } from '../../Containers/Containers';
import { Container, NavBtn } from './WeatherPage.style';

export default function WeatherPage() {
    const WC = useContext(WeatherDataContext);
    const dailyVals = WC.nextDaysWeather.dailyData.sort((a, b) => {
        return a.time - b.time;
    });
    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate();

    if (!WC.currentCity || !WC.currentCountry) {
        return <Navigate to="/" />;
    }
    return <Container>
        {Object.keys(WC.currentWeather).length > 0 ? <WeatherCard weatherData={WC.currentWeather} /> : <h2>No data found for {WC.currentCity}, {WC.currentCountry}</h2>}
        <Row style={{ marginTop: '1vh' }}>
            <NavBtn onClick={() => { navigate('/'); }}>
                Choose Another Location
            </NavBtn>
            <NavBtn onClick={() => { setShowMore(!showMore); }}>{showMore ? 'Hide' : 'Show'} 5 days predictions</NavBtn>
        </Row>
        {showMore && <ColContainer style={{ margin: "auto" }}>
            <h1>Weather for the coming days:</h1>
            {dailyVals.map((el, i) => {
                return <ColContainer key={i} style={{ width: "100%" }}>
                    <h1>Weather for: {el.time}</h1>
                    <WeatherCard weatherData={el} />
                </ColContainer>;
            })}
        </ColContainer>}
    </Container>;
}
