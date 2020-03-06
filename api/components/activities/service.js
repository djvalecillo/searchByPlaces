const Model = require('./model');
const MongoDB = require('../../../store/mongodb');

class ActivitiesService {
    constructor() {
        this.db = new MongoDB();
    }

    async listActivities(filter) {
        return await this.db.list(Model, filter);
    }

    async getActivity(id) {
        return await this.db.getOne(Model, id);
    }

    async register(request) {
        return await this.db.insert(Model, request);
    }
}

module.exports = ActivitiesService;
