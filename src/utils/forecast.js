const request = require('request')
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=811b5eef3d2caa9f899f8268a450d4a8&query='+latitude +','+longitude+'&units=f'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + ", It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out. And humidity is  "+body.current.humidity+"%.")
        }
    })
}

module.exports = forecast