const express = require('express')
const response = require('../../../utils/response');
const controller = require('./controller');

function usersRoutes(app) {
    const router = express.Router();
    app.use('/api/users', router);

    router.get('/', function(req, res) {
        const filter = req.query || null;
        controller.listUsers(filter)
            .then(users => {
                response.success(req, res, users, 200);
            })
            .catch(err => {
                response.error(req, res, err, 200);
            });
    });

    router.get('/:id', function(req, res) {
        const id = req.params.id || null;
        controller.getUser(id)
            .then(user => {
                response.success(req, res, user, 200);
            })
            .catch(err => {
                response.error(req, res, err, 200);
            });
    });

    router.post('/', function(req, res) {
        const data = req.body;
        controller.insertUser(data)
            .then(user => {
                response.success(req, res, user, 200);
            })
            .catch(err => {
                response.error(req, res, err, 200);
            });
    });

    router.post('/login', function(req, res) {
        controller.login(req.body.username, req.body.password)
            .then(token => {
                response.success(req, res, token, 200)
            })
            .catch(err => {
                console.log(err);
                response.error(req, res, 'Invalid Data', 400)
            })
    });
}

module.exports = usersRoutes;