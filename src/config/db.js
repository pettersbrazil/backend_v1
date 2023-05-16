require('dotenv').config();
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER || 'devpetters';
const DB_PASSWORD = process.env.DB_PASSWORD || 'PeTTers1';

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@petterscluster.wa1xsyn.mongodb.net/?retryWrites=true&w=majority`
    )
    .then()
    .catch();