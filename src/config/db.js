require('dotenv').config();
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@petterscluster.wa1xsyn.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!');
    })
    .catch((err) => console.log(err));