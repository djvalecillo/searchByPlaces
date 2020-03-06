const ActivitiesService = require('../../api/components/activities/service');

function activityLogger(req, res, next) {
    if(req.originalUrl.indexOf('/api/activities') !== -1) {
        return next();
    }

    const request = {
        endpoint: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        method: req.method,
        byIp: req.ip,
        datetime: new Date()
    };
    
    const activity = new ActivitiesService();
    activity.register(request);
    next()
}

module.exports = activityLogger;