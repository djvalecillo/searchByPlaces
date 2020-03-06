const ActivitiesService = require('./service');

class ActivityController {
    constructor() {
        this.service = new ActivitiesService();
    }

    listActivities(filter) {
        return this.service.listActivities(filter);
    }

    getActivity(id) {
        if(!id) {
            return Promise.reject('Invalid or empty data');
        }

        return this.service.getActivity(id);
    }
}

module.exports = ActivityController;