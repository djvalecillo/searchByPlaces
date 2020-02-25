const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('[DB]: base de datos conectada con exito'); // eslint-disable-line
    }).catch(err => {
        console.log('[DB]: ' + err); // eslint-disable-line
    });
}

module.exports = {connect};