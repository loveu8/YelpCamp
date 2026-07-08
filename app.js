const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('CONNECTION OPEN!!');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campground', async (req, res) => {
    const camp = new Campground({
        title: 'MyBackyard',
        description: 'cheap camping!'
    });
    await camp.save();
    res.send(camp);
});

app.listen(9487, () => {
    console.log('Serving on port 9487');
});
