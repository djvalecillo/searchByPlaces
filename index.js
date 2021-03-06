const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { config } = require('./config/index');
const userRoutes = require('./api/components/users/routes');
const placesRoutes = require('./api/components/places/routes');
const activitiesRoutes = require('./api/components/activities/routes');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notfoundHandler');
const activityLogger = require('./utils/middleware/activityLogger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(activityLogger);

//routes
userRoutes(app);
placesRoutes(app);
activitiesRoutes(app);

//handle 404
app.use(notFoundHandler);

//errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`); // eslint-disable-line
});