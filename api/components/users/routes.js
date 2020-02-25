const express = require('express')
const response = require('../../../utils/response');
const controller = require('./controller');
const validationHandler = require('../../../utils/middleware/validationHandlers');
const {
    userIdSchema,
    createUserSchema,
    loginUserSchema
} = require('../../../utils/schemas/users');

function usersRoutes(app) {
    const router = express.Router();
    app.use('/api/users', router);

    router.get('/', function(req, res, next) {
        const filter = req.query || null;
        controller.listUsers(filter)
            .then(users => {
                response.success(req, res, users, 200);
            })
            .catch(next);
    });

    router.get('/:id', validationHandler({ id: userIdSchema }, 'params'), function(req, res, next) {
        const id = req.params.id || null;
        controller.getUser(id)
            .then(user => {
                response.success(req, res, user, 200);
            })
            .catch(next);
    });

    router.post('/', validationHandler(createUserSchema), function(req, res, next) {
        const data = req.body;
        controller.insertUser(data)
            .then(user => {
                response.success(req, res, user, 200);
            })
            .catch(next);
    });

    router.post('/login', validationHandler(loginUserSchema), function(req, res, next) {
        controller.login(req.body.username, req.body.password)
            .then(token => {
                response.success(req, res, token, 200)
            })
            .catch(next)
    });
}

module.exports = usersRoutes;