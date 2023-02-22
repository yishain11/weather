require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');
const port = 5454;

app.use(express.static(path.join(__dirname, '../../client/weather-react/dist/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    const reactStream = fs.createReadStream(path.join(__dirname, '../../client/weather-react/dist/index.html'));
    reactStream.pipe(res);
});

app.get('/weather', (req, res) => {

});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});