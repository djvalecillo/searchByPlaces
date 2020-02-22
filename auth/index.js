const JWT = require('jsonwebtoken')
const { config } = require('../config/index')
const secret = config.jwt.secret;

function sign(data) {
    return JWT.sign(data, secret)
}

function verify(token) {
    return JWT.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req)
        console.log(decoded);
        if(decoded.id !== owner) {
            throw new Error('Not Authorize', 401)
        }
    },
    logged: function(req) {
        const decoded = decodeHeader(req)
    }
}

function getToken(auth) {
    if(!auth) {
        throw new Error('Token has not received')
    }
    if(auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid Format')
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded
    return decoded
}

module.exports = {
    sign,
    check
}