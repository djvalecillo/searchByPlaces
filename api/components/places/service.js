var GooglePlaces = require('google-places');
const {config} = require('../../../config/index');


function search(city, type) {
    const places =  searchPlace(city, type);
    if(!places) {
        return Promise.reject('not found places');
    }

    return places;
}

function searchPlace(city, type) {
    const placesApi = new GooglePlaces(config.google_places.key);
    /*placesApi.search({keyword: city}, function(err, response) {
        console.log("search: ", response.results);
       
        placesApi.details({reference: response.results[0].reference}, function(err, response) {
          console.log("search details: ", response.result.website);
        });
    });*/
       
    placesApi.autocomplete({input: city, types: `(${type})`}, function(err, response) {
        console.log("autocomplete: ", response.predictions);
        let success = function(err, response) {
            console.log("did you mean: ", response.result.name);
        };

        return response.predictions || [];
    });
}

module.exports = {
  search
};