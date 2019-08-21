// dependencies
const express = require('express'),
const exphbs = require('express-handlebars'),
//bodyParser = require('body-parser'),
const logger = require('morgan'),
const mongoose = require('mongoose'),
//methodOverride = require('method-override');
const axios = require("axios");
const cheerio = require("cheerio");


// express
const PORT = process.env.PORT || 3000;
let app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//handlebars
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(require('./controllers'));

//connect mongodb
mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI);

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
    // start the server, listen on port 3000
    app.listen(PORT, function() {
        console.log("App running on port " + PORT);
    });
});

module.exports = app;
    

