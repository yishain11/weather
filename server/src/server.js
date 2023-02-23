require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT;
const weatherUrl = process.env.WEATHER_URL;
const weatherKey = process.env.WEATHER_KEY;

app.use(express.static(path.join(__dirname, '../../client/weather-react/dist/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    const reactStream = fs.createReadStream(path.join(__dirname, '../../client/weather-react/dist/index.html'));
    reactStream.pipe(res);
});

app.get('/weather', async (req, res) => {
    const url = 'http://api.positionstack.com/v1/forward?' + new URLSearchParams({
        access_key: process.env.GEOCODE_KEY,
        query: 'central jerusalem, israel',
    });
    console.log('url', url);
    const data = await fetch(url).then(res => res.json());
    console.log('data', data);
    res.send(JSON.stringify(data)).end();
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// weather url
/*
curl 'https://api.open-meteo.com/v1/forecast?latitude=31.77&longitude=35.22&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,precipitation_hours,windspeed_10m_max&timezone=auto&timeformat=iso8601' | json_pp
*/

// geocode url
// http://api.positionstack.com/v1/forward?access_key=6becd3e3ba3f93eaf369c6127bd1f4c8