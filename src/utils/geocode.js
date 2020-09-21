const request = require('request')
const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?types=address&access_token=pk.eyJ1IjoiZ3VyY2hhcmFuLXNpbmdoIiwiYSI6ImNrZjduZHJjbjAzd3Ayc2xrc3ZhdmJrdzAifQ.Nls2cN2J5C2NGQPlK1vlsQ'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback("unable to connect to location service!", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode