require('./src/config/db');

const express = require('express');
const indexRoute = require('./src/routers/index-route');

const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb'}));
app.use('/v1/', indexRoute);

app.listen(port);

module.exports = app;