const { config } = require('../config');
const db = require('mongoose');
db.Promise = global.Promise;

const MONGO_URI = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.dbname}`;


class MongoDB {
    constructor() {
        this.connect();
    }

    connect() {
        if(!MongoDB.connection) {
            MongoDB.connection = db.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log('[MONGODB]: Database connected successfully'); // eslint-disable-line
            }).catch(err => {
                console.log('[MONGODB]: ' + err); // eslint-disable-line
            });
        }
        return MongoDB.connection
    }

    async list(model, filter = {}) {   
        return await model.find(filter);
    }

    async getOne(model, id) {
        const find = await model.findById(id);
        return find;
    }

    async insert(Model, data) { 
        const insert = new Model(data);
        return await insert.save(); 
    }

    async findOne(model, data) {
        const result = await model.findOne(data);
        return result;
    }
}

module.exports = MongoDB;