const Model = require('./model');


async function list(user) {
    let filter = {};
    if(user !== null) {
        filter = { name: user}
    }

    return await Model.find(filter);
}

async function get(id) {
    const findMessage = await Model.findById(id);
    return findMessage;
}

async function insert(user) {
    try {
        const newUser = new Model(user);
        return await newUser.save(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function query(user) {
    const result = await Model.findOne(user);
    return result;
}

module.exports = {
    list,
    get,
    insert,
    query
}

