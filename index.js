const express = require('express');
const app = express();

// Middleware Function: Logs the request details and moves on to the next middleware or route handler
const myMiddleware = (req, res, next) => {
    console.log("Time:", Date.now());
    console.log("Request Type:", req.method);
    console.log("Request URL:", req.originalUrl);
    next(); // Call the next middleware or route handler in the stack
}

const SERVER_PORT = 3000; // Define the port on which the server will listen

// Global Middleware: This middleware will be executed for every incoming request
app.use(myMiddleware);

// Route-specific Middleware: This middleware will be executed for requests to "/query" route
app.use("/query", (req, res, next) => {
    console.log('Query Middleware');
    next(); // Call the next middleware or route handler for "/query" route
});

// Serve static files from the "views" directory
app.use(express.static(__dirname + '/views'));

// Route for "/hello": Sends a welcome message
app.get('/hello', (req, res) => {
    res.send('Hello, Welcome to my Web Page');
});

// Route for "/about": Sends a introduction message
app.get('/about', (req, res) => {
    res.send('Hi, I am Rishabh Vinay Bhagat. This is my assignment-3 of DevOps.');
});

// Route for "/datetime": Sends the current date and time
app.get('/datetime', (req, res) => {
    const currentdate = new Date();
    const datetostring = currentdate.toLocaleString();
    res.send(`Today's Date and Time: ${datetostring}`);
});

// Params Route: Example URL - localhost:3000/contact/RishabhVinay/Bhagat
// This route extracts the first name (fn) and last name (ln) from the URL parameters and sends a response
app.get('/contact/:fn/:ln', (req, res) => {
    console.log(req.params); // Log the route parameters
    res.send('Contact Page : ' + req.params.fn + ' ' + req.params.ln); // Send a response with the full name
});

// Query Route: Example URL - localhost:3000/query?fn=RishabhVinay&ln=Bhagat
// This route extracts the first name (fn) and last name (ln) from the query string and sends a response
app.get('/query', (req, res) => {
    console.log(req.query); // Log the query parameters
    res.send('Query Page : ' + req.query.fn + ' ' + req.query.ln); // Send a response with the full name from the query parameters
});

// if want to serve an HTML file for "/index"
// app.get('/index',(req,res) => {
//     res.sendFile(__dirname + '/views/index.html');
// })

// Start the server and listen on the defined port
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
