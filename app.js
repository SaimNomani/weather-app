import { geocode } from "./utils/geocode.js";
import { forcast } from "./utils/forcast.js";

// Geocoding
// Address->lat/lon->weather

// 1. forward geocoding: To get latitude and longititude from address

// const unit = "metric"; // C
// const address = "karachi";
// const limit = "1";

// const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=${limit}&appid=${apiKey}`;

// request({ url: geocodingUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log(`Unable to connect to loation service!!`);
//   } else if (response.body.length === 0) {
//     console.log(`No match found for '${address}'`);
//   } else {
//     const geocodingData = response.body;
//     const lat = geocodingData[0].lat;
//     const lon = geocodingData[0].lon;
//     console.log(`lat= ${lat}, lon= ${lon}`);

//     const currectWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

//     request({ url: currectWeatherUrl, json: true }, (error, response) => {
//       if (error) {
//         console.log(`Unable to connect to weather service!!`);
//       } else if (response.body.cod === "400") {
//         console.log(`Unable to find weather data`);
//       } else {
//         const weatherData = response.body;
//         console.log(
//           `${weatherData.weather[0].description}, it' ${weatherData.main.temp} C, feels like ${weatherData.main.feels_like} C`
//         );
//       }
//     });
//   }
// });

const address = process.argv[2];

if (!address) {
  console.log("please provide an address.");
} else {
  geocode(address, (error, geocodeData) => {
    if (error) {
      return console.log(error);
    }

    forcast(geocodeData.lat, geocodeData.lon, (error, forcastData) => {
      if (error) {
        console.log(error);
      }
      console.log(`${geocodeData.name}, ${geocodeData.state}`);
      console.log(
        `It's currently ${forcastData.temp} C. It feels like ${forcastData.feelsLike} C.`
      );
    });
  });
}
