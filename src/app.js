const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()

// Defining path for express config.
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsPath)

// Setup handlebar engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gurcharan Singh Sokhi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'This is about page',
        name: "Created by Guri"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'Guri'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    geoCode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: "You must provide a search term"
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: "Location not found!"
                })
            }
             res.send({
                 forecast: "It is snowing",
                 location: location,
                 name: forecastData
             })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'This is help page',
        name: 'Guri',
        errorMessage: "Articles not found for help page."

    })
})

app.get('*', (req, res) => {
    res.render("404", {
        errorMessage: "Page not found"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

console.log(__dirname)
console.log(path.join(__dirname,'../public'))