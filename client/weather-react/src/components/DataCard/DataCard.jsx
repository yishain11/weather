import { Col, Row } from '../Containers/Containers';
import imgMag from '../../assets/img/ImgMap';

export default function DataCard({ data, img }) {
    return <Row>
        <Col style={{ width: "70%" }}>
            <h4>{data[0]}</h4>
            <p>{data[1]}</p>
        </Col>
        <Col style={{ width: "30%" }}>
            {data[0] === "weathercode" && <img src={imgMag[data[0]][data[1]]} width="50" height="50" />}
        </Col>
    </Row>;
}
