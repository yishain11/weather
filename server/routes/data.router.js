const express = require('express');
const fs = require('fs');
const path = require('path');
const weatherHelpers = require('../helpers/getWeatherHelpers');
const router = express.Router();

router.get('/countries', (req, res) => {
    fs.createReadStream(path.join(__dirname, '../data/countries.json'), 'utf-8').pipe(res);
});

router.post('/loadCities', (req, res) => {
    const { country } = req.body;
    const cities = weatherHelpers.getCities(country);
    if (cities) {
        res.send(cities).end();
        return;
    }
    res.send({ msg: `no cities found for country: ${country}` }).end();
    return;
});

module.exports = router;