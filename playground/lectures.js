// ///////////////////////////////////////////////////////////////////
// *****************Lecture 1: Asynchronous Basics
// ///////////////////////////////////////////////////////////////////

// console.log("starting");
// setTimeout(() => console.log("2 sec wait"), 2000);
// setTimeout(() => console.log("0 sec wait"), 0);
// console.log("ending");

/*
OUTPUT:
staring
ending
0 sec wait
2 sec wait

NOTE: Callbacks cannot be executed before the top-level functions are invoked.
*/

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 2: Making Http Requests and Error handling
// ///////////////////////////////////////////////////////////////////

import request from "request";

request(
  {
    url: "endpoint",
    json: true, // to automatically parse json string to js object
  },
  (error, response) => {
    if (error) {
      console.log(error); // only for os related errors like no internet connection
    } else if (response.body.cod === "400") {
      console.log("bad request"); // for errors in making bad requests
    } else {
      console.log(response.body); // actual content
    }
  }
);

// ///////////////////////////////////////////////////////////////////
// *****************Lecture 3: Callback functions
// ///////////////////////////////////////////////////////////////////

// Callback function: A callback function is a function passed as an argument to another function,
// which is then executed at a later time, typically after an event or an asynchronous operation is completed.

// NOTE: Not all functions that take callbacks are asynchronous.
//  Functions can accept callbacks in both synchronous and asynchronous contexts.

const arr = [1, 2, 3, 4];
console.log(arr.filter((ele) => ele > 2)); // sync function with callback
                                        // Synchronous callbacks execute immediately during the function call.

setTimeout(()=>console.log(`log after 2 sec`), 2000)  // async function with callback
    // Asynchronous callbacks execute later, triggered by events, timers, or other asynchronous operations.

// USER DEFINED CALLBACK FUNCTIONS

const geocode=()=>{
    setTimeout(()=>{
        const data={
            lat:0,
            lon:0
        }
        return data
    }, 2000)
}

console.log(geocode()) // The function geocode returns undefined because the setTimeout function is asynchronous.
//The return data inside the setTimeout is executed after a delay of 2 seconds, 
// but the geocode function itself finishes execution and returns undefined immediately, 
// without waiting for the setTimeout to complete.
//To handle the result, you need to use a callback or a promise.

const geocodeCallback=(callback)=>{
    setTimeout(()=>{
        const data={
            lat:0,
            lon:0
        }
        callback(data)
    }, 2000)
}

geocodeCallback((data)=>console.log(data)) //{ lat: 0, lon: 0 }

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add=(num1, num2, callback)=>{
    setTimeout(()=>{
        callback(num1+num2)
    },2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})