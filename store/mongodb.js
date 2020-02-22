const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('[DB]: base de datos conectada con exito');
    }).catch(err => {
        console.log('[DB]: ' + err);
    });
}

module.exports = {connect};