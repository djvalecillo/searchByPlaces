require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    mongodb: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        dbname: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.SECRET ||'stringsecret'
    },
    google_maps: {
        key: process.env.GOOLE_MAPS_API_KEY,
    }
}

module.exports = { config };