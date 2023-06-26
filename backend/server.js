var express = require('express');
var parser = require('body-parser');
var mongo = require('mongoose');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use('/', require('./routes'));

mongo.connect('mongodb://localhost:27017/tennis', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database...');
    })
    .catch(err => {
        console.log(err);
    })

app.listen(8083, function () {
    console.log('App started...');
})