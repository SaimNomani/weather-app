console.log(`client side javascript`);

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 9: Browser Http request with fetch
// ///////////////////////////////////////////////////////////////////

// sending HTTP requests to an API endpoint directly from a browser using the browser's fetch API
// getting forcast information in clientsids js

// fetch("http://localhost:3000/weather?address=karachi").then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//     }
//   });
// });

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 9: Creating form, making Http request through form, sending data back to browser
// ///////////////////////////////////////////////////////////////////

const weatherForm = document.querySelector("form");
const searchEl = document.querySelector("input");
const msg = document.querySelector("#msg");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchEl.value;
  //   console.log(location);

  msg.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        msg.textContent = data.error;
      } else {
        // console.log(`Location: ${data.location}`);
        // console.log(`temperature: ${data.temp}`);
        // console.log(`Feels like: ${data.feelsLike}`);
        // console.log(`forcast: ${data.description}`);
        const { location, temp, feelsLike, description, units } = data;
        const forcast = `Location: ${location} <br/>
                        temperature: ${temp} ${units}<br/>
                        Feels like: ${feelsLike} ${units}<br/>
                        forcast: ${description}`;
        msg.innerHTML = forcast;
      }
    });
  });
});
