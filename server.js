//Dependencies

const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const Reservation = require("./list");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000; //added so that Heroku can use a dynamic port.

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)

const waitList = [
    {
        customerId: 17,
        customerName: `Frank`,
        customerEmail: `test@gmail.com`,
        phoneNumber: `954-465-7228`,
    },
    {
        customerId: 19,
        customerName: `Frank`,
        customerEmail: `test@gmail.com`,
        phoneNumber: `954-465-7228`,
    },
]

const resList = [
    {
        customerId: 17,
        customerName: `Tom`,
        customerEmail: `test@gmail.com`,
        phoneNumber: `954-465-7228`,
    },
    {
        customerId: 19,
        customerName: `Jane`,
        customerEmail: `test@gmail.com`,
        phoneNumber: `954-465-7228`,
    },
]

// Routes


// Displays everyone on the waitlist
app.get('/api/waitlist', (req, res) => res.json(waitList));

// Displays everyone on the reservation list
app.get('/api/reserve', (req, res) => res.json(resList));



// Create New Reservation - takes in JSON input
app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.id = newRes.name.replace(/\s+/g, '').toLowerCase();
  console.log(newRes);

  resList.push(newRes);
  res.json(newRes);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
