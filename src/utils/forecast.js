const request = require('request');
const forecast = (lat, long, callback) => {
  const url =
    'https://api.darksky.net/forecast/366e635c958a2afe55d94268b364d568/' +
    encodeURI(lat) +
    ',' +
    encodeURI(long);
  //equal to url:url                because we use body only from response
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature
      });
    }
  });
};

module.exports = forecast;
