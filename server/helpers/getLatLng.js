const fs = require('fs');
const path = require('path');

const dataObj = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/parsed.json'), 'utf-8'));
const countriesArray = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/countries.json'), 'utf-8'));

function getLatLng(country, city) {
    if (!countriesArray.includes(country)) {
        return;
    }
    return dataObj[country][city];
}

module.exports = getLatLng;