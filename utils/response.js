exports.success = function(req, res, message, status) {
    let statusCode = status || 200
    let statusMessage = message || 'Success'
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    })
}

exports.error = function(req, res, message, status) {
    let statusCode = status || 500
    let statusMessage = message || 'INTERNAL SERVER ERROR'
    res.status(statusCode).send({
        error: statusMessage,
        status: status,
        body: ''
    })
}