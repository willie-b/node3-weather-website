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
      // const [temperatureHigh] = response.body.daily.data;
      callback(undefined, `It is currently ${currently.temperature} degrees out. The high today is ${response.body.daily.data[0].temperatureHigh} with a low of ${response.body.daily.data[0].temperatureLow}. There is a ${currently.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;
