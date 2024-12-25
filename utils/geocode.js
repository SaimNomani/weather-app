import request from "request";

import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY // Loads environment variables from .env into process.env
console.log(apiKey)

const geocode = (address, callback) => {
  const limit = "1";
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    address
  )}&limit=${limit}&appid=${apiKey}`;

  request({ url: geocodingUrl, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to loation service!!`, undefined);
    } else if (response.body.length === 0) {
      callback(`No match found for '${address}'`, undefined);
    } else {
      const geocodingData = response.body[0];
      console.log(geocodingData)
      const { lat, lon, name, state } = geocodingData;
      // const lat = geocodingData.lat;
      // const lon = geocodingData.lon;
      // const name=geocodingData.name
      // const state=geocodingData.state
      callback(undefined, { name, lat, lon, state });
    }
  });
};

export { geocode };
