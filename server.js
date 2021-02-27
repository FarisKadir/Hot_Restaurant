//Dependencies

const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const http = require('http');
const fs = require('fs')

// Sets up the Express App

const app = express();
const PORT = 3000; //added so that Heroku can use a dynamic port.

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



const displayHome = (res) => {
    // Here we use the fs package to read our index.html file
    fs.readFile(`${__dirname}/home.html`, (err, data) => {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};
const displayTables = (res) => {
    // Here we use the fs package to read our index.html file
    fs.readFile(`${__dirname}/tables.html`, (err, data) => {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};
const displayReserve = (res) => {
    // Here we use the fs package to read our index.html file
    fs.readFile(`${__dirname}/reserve.html`, (err, data) => {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};

const dispWait = (res)  =>  {
    res.json(waitList)
}
const display404 = (url, res) => {
    const myHTML = `
    <html>
      <body>
        <h1>404 Not Found </h1>
        <p>The page you were looking for: ${url} can not be found</p>
      </body>
    </html>`;

    // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
    res.writeHead(404, { 'Content-Type': 'text/html' });

    // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
    res.end(myHTML);
};


const handleRequest = (req, res) => {
    // Capture the url the request is made to
    const path = req.url;

    // Depending on the URL, display a different HTML file.
    switch (path) {
        case '/':
        case '/home':
            return displayHome(res);

        case '/tables':
            return displayTables(res);

        case '/reserve':
            return displayReserve(res);
        case '/api/waitlist':
            return dispWait(res);


        default:
            return display404(path, res);
    }
};





// Routes

//HTML Routes

app.get('/', (req, res) => displayHome(res));
app.get('/home', (req, res) => displayHome(res));
app.get('/tables', (req, res) => displayTables(res));
app.get('/reserve', (req, res) => displayReserve(res));

//API Routes
//Displays the waitlist
app.get('/api/waitlist', (req, res) => res.json(waitList));

// Displays the reservation tables
app.get('/api/tables', (req, res) => res.json(resList));


// Create New Reservation - takes in JSON input
app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.id = newRes.customerName.replace(/\s+/g, '').toLowerCase();
  console.log(newRes);

  resList.push(newRes);
  res.json(newRes);
});


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

