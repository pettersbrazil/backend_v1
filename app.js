require('./src/config/db');

const express = require('express');
const cors = require('cors');
const app = express();

const indexRoute = require('./src/routers/index-route');

app.get('/', (req, res) =>
    res.sendFile('index.html', { root: 'src/views/' })
);
app.get('/assets/*', (req, res) =>
    res.sendFile('logo_greenwater.png', { root: 'src/assets/' })
);

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb'}));
app.use('/v1/', indexRoute);

app.listen(process.env.PORT || 3000);

module.exports = app;