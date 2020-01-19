const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars views and location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// Setup static directory to serve public resources
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Robot',
    name: 'Robot',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some helpful text!',
    title: 'Help',
    name: 'Andrew',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    errorMsg: 'Help article not found',
    name: 'Willie',
    title: '404',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    errorMsg: 'Page not found',
    name: 'Willie',
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
