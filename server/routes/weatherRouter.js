const express = require('express');
const weatherHelpers = require('../helpers/getWeatherHelpers');
const router = express.Router();

router.post('/', async (req, res) => {
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

module.exports = router;