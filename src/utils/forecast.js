const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f79acb33773ce091f3d4543a9dad9a0b/${
    encodeURIComponent(longitude)},${encodeURIComponent(latitude)}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (response.body.error) {
      callback('Unable to find location!');
    } else {
      const { currently } = response.body;
      callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain`);
    }
  });
};

module.exports = forecast;
