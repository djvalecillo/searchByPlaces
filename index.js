const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { config } = require('./config/index');
const { connect } = require('./store/mongodb');
const userRoutes = require('./api/components/users/routes');
const placesRoutes = require('./api/components/places/routes');

const mongo_url = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@cluster0-iw489.mongodb.net/${config.mongodb.dbname}`;
connect(mongo_url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

userRoutes(app);
placesRoutes(app);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});