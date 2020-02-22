const service = require('./service');
const DEFAULT_TYPE = 'restaurant';


async function searchPlaces(city, type) {
    if(!city) {
        return Promise.reject('Invalid Data');
    }

    const searchtype = type || DEFAULT_TYPE;

    const places = await service.search(city, searchtype);
    return places;
}

module.exports = {
    searchPlaces,
}