require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const weatherHelpers = require('../helpers/getWeatherHelpers')

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../client/weather-react/dist/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    const reactStream = fs.createReadStream(path.join(__dirname, '../../client/weather-react/dist/index.html'));
    reactStream.pipe(res);
});

app.post('/weather', async (req, res) => {
    const { city, country } = req.body;
    const data = weatherHelpers.getLatLng(country, city);
    if (!data) {
        res.send({ msg: `err, no lat long values for country: ${country}, city: ${city}` }).end();
        return;
    }
    weatherHelpers.getWeatherData(data.lat, data.lon).then(weatherRes => {
        res.send({ weatherRes }).end();
        return;
    }).catch(err => {
        console.error('err', err);
        res.send({ 'err in get weather': err }).end();
        return;
    });
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