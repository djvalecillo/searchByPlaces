const { https } = require('node-follow-redirects');
const { isValidLatitude } = require('is-valid-geo-coordinates');
const { isValidLongitude } = require('is-valid-geo-coordinates');
const {config} = require('../../../config/index');
const googleMapsClient = require('@google/maps').createClient({
    key: config.google_maps.key
});

class SearchPlacesService {

    nearBySearch(addres, type) {
        const radius = 5500;
        const coordinate = this._convertAddress(addres);
        if(!coordinate) {
            Promise.reject('Inmposible convert address.');
            return false;
        }

        https.request({
            host: 'maps.googleapis.com',
            path: `/maps/api/place/nearbysearch/json?location=${coordinate.lat},${coordinate.lon}&radius=${radius}&type=${type}&key=${config.google_maps.key}`,
            method: 'GET'
        }, response => {
            let data;
            response.on('data', function(chunk) {
                data += chunk;
            });
            response.on('end', function() {
                return Promise.resolve(JSON.parse(data));
            });
        }).on('error', err => {
            return Promise.reject(err);
        });
        
    }

    _convertAddress(address) {
        if(address.indexOf(",") !== -1) {
            const coordinate = this._isACoordinate(address);
            if(coordinate) {
                return coordinate;
            }
        }

        googleMapsClient.geocode({
            address: address
        }, function(err, res) {
            if (err) {
                console.log(`[Geocode Error]: ${err.json.error_message}`); // eslint-disable-line
                return false;
            }
            
            const result = res.json.results;
            return {
                lat: result[0].latitude,
                lon: result[0].longitude
            }
        });
    }

    _isACoordinate(address) {
        const coordinate = address.split(",", 2);
        if(coordinate.lenght === 2) {
            if(isValidLatitude(coordinate[0]) && isValidLongitude(coordinate[1])) {
                return {
                    lat: coordinate[0],
                    lon: coordinate[1]
                }
            }
        }
        return false;
    }
}


module.exports = SearchPlacesService;