// ///////////////////////////////////////////////////////////////////
// *****************Lecture 4: Introduction to web servers and Express
// ///////////////////////////////////////////////////////////////////

// import express from 'express'

// const app =express()

// app.get('', (req,res)=>{
//     res.send(`hello express`)
// })
// app.get('/help', (req,res)=>{
//     res.send(`help page`)
// })
// app.get('/about', (req,res)=>{
//     res.send(`about page`)
// })
// app.get('/weather', (req,res)=>{
//     res.send(`weather page`)
// })

// //Starts the server, listening for requests on port 3000.
// app.listen(3000, ()=>{
//     console.log(`server is running on port 3000`)
// })

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 5: serving html and json
// ///////////////////////////////////////////////////////////////////

// app.get('', (req,res)=>{
//     res.send(`<h1>hello express</h1>`)
// })
// app.get('/help', (req,res)=>{
//     res.json([
//         {name: "John"},
//         {name: "Joe"},
//     ])
// })
// app.get('/about', (req,res)=>{
//     res.send(`<h1>about page</h1>`)
// })
// app.get('/weather', (req,res)=>{
//     res.send({
//         city:"karachi",
//         temp:10,
//         unit: 'C'
//     })
// })

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 6: serving static assets(html, css, js, imgs )
// ///////////////////////////////////////////////////////////////////

// import express from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// // Convert import.meta.url to file path
// // for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// for common js __filename and __dirname by default available

// console.log(__dirname); // Should print the directory of the current file
// console.log(__filename); // Should print the full path of the current file

// const publicDirPath = path.join(__dirname, "../public");

// console.log(publicDirPath);

// const app = express();

// app.use(express.static(publicDirPath));
// // 1. express.static('public') is a middleware
// // that tells Express to serve files located in the public directory when requested by the client.
// //
// // 2. app.use() is used to add the express.static middleware to the app's middleware stack.

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// // ///////////////////////////////////////////////////////////////////
// // *****************Lecture 7: Dynamic pages with templating enginr hbs(handlebars)
// // ///////////////////////////////////////////////////////////////////

// // HBS:
// //  1. to handle dynamic content.
// // 2. to reuse pieces of markups

// import express from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import hbs from "hbs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const publicDirPath = path.join(__dirname, "../public");

// console.log(publicDirPath);

// const app = express();

// app.set("view engine", "hbs"); // to tell express what templating engine we are using.
// // express expects all the views(templates) in 'views' folder in root of project

// // to customize views directory like changing its name or location
// const viewsDirPath = path.join(__dirname, "../../templates/views"); // customized the name of views to templates
// app.set("views", viewsDirPath);

// // app.engine(
// //   "hbs",
// //   exphbs({
// //     extname: "hbs", // Sets the file extension for Handlebars files to '.hbs'.
// //     defaultLayout: "main", // Specifies 'main.hbs' as the default layout file for all views.
// //     partialsDir: path.join(__dirname, "views", "partials"), // Defines the directory where Handlebars will look for partials.
// //   })
// // );

// // to tell handleBars where partials are located
// const partialsPath = path.join(__dirname, "../../templates/partials");
// hbs.registerPartials(partialsPath);

// app.use(express.static(publicDirPath));

// // setting up route for dynamic page lives in views folder
// app.get("/", (req, res) => {
//   res.render(
//     "index", // render converts view(template) to html and serve
//     {
//       title: "Weather",
//       name: "Saim",
//     }
//   ); // passing object to template, to make template dynamic
// });

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About",
//     name: "Saim",
//   });
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     title: "Help",
//     name: "Saim",
//     helpText: "This is some helpful text",
//   });
// });

// app.get("/help/*", (req, res) => {
//   res.render("error404", {
//     title: "404",
//     message: "Help article not found.",
//     name: "Saim",
//   });
// });

// app.get("*", (req, res) => {
//   res.render("error404", {
//     title: "404",
//     message: "Page not found.",
//     name: "Saim",
//   });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// ///////////////////////////////////////////////////////////////////
// *****************section 2: Accessing API from Browser
// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////
// *****************Lecture 8: Query string
// ///////////////////////////////////////////////////////////////////

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";

import { geocode } from "../../utils/geocode.js";
import { forcast } from "../../utils/forcast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDirPath = path.join(__dirname, "../public");

console.log(publicDirPath);

const app = express();

const port=process.env.PORT || 3000
//process.env.PORT: for production
// 3000: for local dev

app.set("view engine", "hbs");

const viewsDirPath = path.join(__dirname, "../../templates/views");
app.set("views", viewsDirPath);

const partialsPath = path.join(__dirname, "../../templates/partials");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Saim",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Saim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Saim",
    helpText: "This is some helpful text",
  });
});

// Handle GET requests to the "/weather" endpoint
app.get("/weather", (req, res) => {
  // Check if the "address" query parameter is missing
  if (!req.query.address) {
    // If "address" is not provided, send an error response
    return res.send({
      error: "No address provided", // Error message to indicate missing address
    });
  }

  // Call the geocode function with the address provided in the query parameter
  geocode(req.query.address, (error, geocodeData = {}) => {
    // If an error occurs in the geocode function, send the error response
    if (error) {
      return res.send({
        error, // Pass the error message from the geocode function
      });
    }

    // Destructure latitude, longitude, and state from the geocodeData
    const { lat, lon, state } = geocodeData;

    // Call the forcast function using the latitude and longitude from geocode
    forcast(lat, lon, (error, forcastData) => {
      // If an error occurs in the forcast function, send the error response
      if (error) {
        return res.send({
          error, // Pass the error message from the forcast function
        });
      }

      // Destructure weather details from the forcastData
      const { main, temp, feelsLike, name, units } = forcastData;

      // Send the combined weather and location data as the response
      res.send({
        location: `${req.query.address}, ${state}`, // Combine the input address and state
        temp, // Current temperature
        feelsLike, // Feels like temperature
        description: main, // Weather condition description
        units
      });
    });
  });
});


app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "404",
    message: "Help article not found.",
    name: "Saim",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "404",
    message: "Page not found.",
    name: "Saim",
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// lecture 9 on public/js/index.js