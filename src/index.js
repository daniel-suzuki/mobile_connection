require('dotenv').config()
const express = require(`express`);
const useragent = require('express-useragent');
const mongoose = require('mongoose');

const router = require('./routes');
var app = express();

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tgpxh.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(router);

app.listen(5000 || process.env.PORT, () => {
    console.log(`Listening to PORT/: http://localhost:${5000 || process.env.PORT}`);
});