import { Col, Row } from '../Containers/Containers';
import imgMag, { getImg } from '../../assets/img/ImgMap';
import { Data, DataCol, DataRow, Title } from './DataCard.style';

export default function DataCard({ data, img }) {
    const [title, value] = data;
    const [src, desc] = getImg(title, value);
    return <DataRow>
        <DataCol style={{ width: "60%" }}>
            <Title>{title}</Title>
            <Data>{value}</Data>
        </DataCol>
        <DataCol style={{ width: "40%" }}>
            {(src && title !== 'time') && <img src={src} width="30%" height="30%" title={desc} alt={desc} />}
        </DataCol>
    </DataRow>;
}
