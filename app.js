require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Request-With, Authorization, Accept");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/uploads', express.static('uploads'));
app.use('/members', require('./api/routes/members'));
app.use('/shares', require('./api/routes/shares'));

app.use((req, res, next) => {
    const error = new Error('Resources not found');
    error.status = 404
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;