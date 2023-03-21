// const app = require('express')();
// const AbortController = require("abort-controller")
// const controller = new AbortController();
// const signal = controller.signal;

// const abortSignal = controller.signal

// function abortRequest() {
//   controller.abort()
// }

// app.get("/", {
//   signal: abortSignal,
// })


// app.get('/post/visibility', {
//     // console.log("ABORTED");
//     signal: abortSignal,
// });


// module.exports = { abortRequest };



const axios = require('axios');
const AbortController = require("abort-controller")
const controller = new AbortController();


async function makeRequest() {
    try {
      const response = await axios.get('http://localhost:3000/post/waum_blc', {
        signal: controller.signal
     });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

// cancel the request
controller.abort()

module.exports = { makeRequest };