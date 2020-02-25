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

    async list(model, filter) {   
        return await model.find(filter);
    }

    async getOne(model, id) {
        const find = await model.findById(id);
        return find;
    }

    async insert(Model, user) { 
        const insert = new Model(user);
        return await insert.save(user); 
    }

    async findOne(model, user) {
        const result = await model.findOne(user);
        return result;
    }
}

module.exports = MongoDB;