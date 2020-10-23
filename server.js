// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const { response } = require("express");
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
// app.get("/goat", function (request, response) {
//   // const allQuotes  = request.quotes
//   response.send("Ebenezer");
// });

//START OF YOUR CODE...
// Route for quotes
app.get("/quotes", function (request, response) {
  const allQoutes = quotes.map((item) => {
    return item.quote;
  });
   response.send(allQoutes);
});

//Search for a particular term or word
app.get("/quotes/search", (request, response) => {
  const term = request.query.term;
  const search = quotes.filter(
    (item) =>
      item.quote.toLowerCase().includes(term.toLowerCase()) ||
      item.author.toLowerCase().includes(term.toLowerCase())
  );
  if (term != null) {
    response.send(search);
  } else {
    response.end();
  }

  // let term = req.query.search;
  // res.send(`${searchQuery}`);
});

//
app.get("/quotes/random", function (request, response) {
  response.send(pickFromArray(quotes));
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
