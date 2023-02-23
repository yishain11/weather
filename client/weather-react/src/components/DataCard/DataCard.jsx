export default function DataCard({ data, img }) {
    return <div>
        <h4>{data.key}</h4>
        <h6>{data.value}</h6>
        <img src={img} width="50" height="50" />
    </div>;
}
