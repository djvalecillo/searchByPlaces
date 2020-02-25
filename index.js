const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { config } = require('./config/index');
const { connect } = require('./store/mongodb');
const userRoutes = require('./api/components/users/routes');
const placesRoutes = require('./api/components/places/routes');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notfoundHandler');


const mongo_url = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.dbname}`;
connect(mongo_url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

userRoutes(app);
placesRoutes(app);

//handle 404
app.use(notFoundHandler);

//errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`); // eslint-disable-line
});