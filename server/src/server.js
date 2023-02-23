require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const weatherRouter = require('../routes/weatherRouter');
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../client/weather-react/dist/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use('/weather', weatherRouter)

app.get('/', (req, res) => {
    const reactStream = fs.createReadStream(path.join(__dirname, '../../client/weather-react/dist/index.html'));
    reactStream.pipe(res);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});