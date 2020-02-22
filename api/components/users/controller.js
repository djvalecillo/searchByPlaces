const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const service = require('./service');


function listUsers() {
    return service.list();
}

function getUser(id) {
    if (!id){ 
        Promise.reject();
        return false;
    }

    return service.get(id);
}

async function insertUser(data) {
    const pass = await bcrypt.hash(data.password, 5);
    const user = {
        id: null,
        username: data.username,
        password: pass,
        email: data.email,
        created: new Date()
    };
    const result = await service.insert(user);
    return result;
}

async function login(username, password) {
    const data = await service.query({username: username});
    
    return bcrypt.compare(password, data.password)
        .then(success => {
            if(success) {
                return auth.sign(data.password)
            } else {
                throw new Error('Invalid Data')
            }
        })
}

module.exports = {
    listUsers,
    getUser,
    insertUser,
    login,
};
 