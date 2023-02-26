import { Col, Row } from '../Containers/Containers';
import imgMag, { getImg } from '../../assets/img/ImgMap';
import { Data, DataCol, DataRow, Title } from './DataCard.style';

const titleMap = {
    temperature: 'temperature',
    windspeed: 'wind speed',
    winddirection: 'wind direction',
    weathercode: 'weather code',
    time: 'time'
};

export default function DataCard({ data, img, showTime }) {
    const [title, value] = data;
    const [src, desc] = getImg(title, value);
    return <DataRow>
        <DataCol style={{ width: "60%" }}>
            <Title>{titleMap[title]}</Title>
            <Data>{value}</Data>
        </DataCol>
        <DataCol style={{ width: "40%" }}>
            {(src && title !== 'time') && <img src={src} width="25%" height="25%" title={desc} alt={desc} />}
        </DataCol>
    </DataRow>;
}
