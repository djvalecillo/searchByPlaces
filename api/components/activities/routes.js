const express = require('express')
const response = require('../../../utils/response');
const Controller = require('./controller');
const secure = require('../../../utils/middleware/secure');

const ActivityController = new Controller();

function activityRoutes(app) {
    const router = express.Router();
    app.use('/api/activities', router);
    router.use(secure('logged'));

    router.get('/', function(req, res, next) {
        const filter = req.query || null;
        ActivityController.listActivities(filter)
            .then(activities => {
                response.success(req, res, activities, 200);
            })
            .catch(next);
    });

    router.get('/:id', function(req, res, next) {
        const id = req.params.id || null;
        ActivityController.getActivity(id)
            .then(activity => {
                response.success(req, res, activity, 200);
            })
            .catch(next);
    });
}

module.exports = activityRoutes;