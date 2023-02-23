import { Row } from '../Containers/Containers';

export default function DataCard({ data, img }) {
    return <Row>
        <h4>{data[0]}</h4>
        <h6>{data[1]}</h6>
        {/* <img src={img} width="50" height="50" /> */}
    </Row>;
}
