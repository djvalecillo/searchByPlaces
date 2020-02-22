require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    mongodb: {
        user: process.env.DB_USER ||'david',
        password: process.env.DB_PASS ||'wCgczeGZS4YbZmYZ',
        dbname: process.env.DB_NAME ||'test_tyba'
    },
    jwt: {
        secret: process.env.SECRET ||'stringsecret'
    },
    google_places: {
        key: process.env.GOOGLE_PLACES_API_KEY || "AIzaSyC_GiC73ihVMnYWqXJV1ReVeauQToZGZmk",
        format: process.env.GOOGLE_PLACES_OUTPUT_FORMAT || "json",
    }
}

module.exports = { config };