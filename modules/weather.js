
'use strict'

const axios    = require('axios');
module.exports = weatherHandler;

function weatherHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.WEATHER_KEY;
    let url = `http://api.weatherbit.io/v2.0/current?city=${cityQuery}&key=${key}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            let cityData = {
                description: result.data.data[0].weather.description,
                solarRad: result.data.data[0].solar_rad,
                windSpd: result.data.data[0].wind_spd,
                windDir: result.data.data[0].wind_dir,
                temp: result.data.data[0].temp
            }
            console.log(cityData);
            res.send(cityData);
        })
        .catch(err => {
            console.log('inside error');
            res.status(500).send(`error in getting data ==> ${err}`)
        })
}