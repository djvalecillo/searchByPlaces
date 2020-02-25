const Model = require('./model');
const MongoDB = require('../../../store/mongodb');


class UserSevice {
    constructor() {
        this.db = new MongoDB();
    }

    async listUsers(user) {
        let filter = {};
        if(user !== null) {
            filter = user;
        }
    
        return await this.db.list(Model, filter);
    }

    async getUser(id) {
        const findUser = await this.db.getOne(Model, id);
        return findUser;
    }

    async insertUser(user) {
        try {
            const newUser = await this.db.insert(Model, user);
            return newUser;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findUser(user) {
        const result = await this.db.findOne(Model, user);
        return result;
    }
}

module.exports = UserSevice;

