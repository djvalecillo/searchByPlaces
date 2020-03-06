const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const Service = require('./service');

class UserController {
    constructor() {
        this.service = new Service();
    }

    listUsers(filter) {
        return this.service.listUsers(filter);
    }
    
    getUser(id) {
        if (!id){ 
            Promise.reject();
            return false;
        }
        return this.service.getUser(id);
    }
    
    async insertUser(data) {
        const pass = await bcrypt.hash(data.password, 5);
        const user = {
            id: null,
            username: data.username,
            password: pass,
            email: data.email,
            created: new Date()
        };
        const result = await this.service.insertUser(user);
        return result;
    }
    
    async login(username, password) {
        const data = await this.service.findUser({username: username});
        
        return bcrypt.compare(password, data.password)
            .then(success => {
                if(success) {
                    return auth.sign(data.password)
                } else {
                    throw new Error('Invalid Data')
                }
            })
    }
}

module.exports = UserController;
 