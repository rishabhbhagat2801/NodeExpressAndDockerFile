const express = require('express');
const app = express();

// Middleware Function
const myMiddleware = (req,res, next) => {
    console.log("Time:", Date.now());
    console.log("Request Type:", req.method);
    console.log("Request URL:", req.originalUrl);
    next();
}

const SERVER_PORT = 3000;

// Global Middleware 
app.use(myMiddleware);

// Route Middleware
app.use("/query",(req,res,next) => {
    console.log('Query Middleware');
    next();
});

app.use("/static", express.static(__dirname + '/views'));

app.get('/hello',(req,res) => {
    res.send('Hello World');
});

app.get('/about',(req,res) => {
    res.send('About Page');
});

// Params Route
// localhost:3000/contact/RishabhVinay/Bhagat
app.get('/contact/:fn/:ln',(req,res) => {
    console.log(req.params);
    res.send('Contact Page : ' + req.params.fn + ' ' + req.params.ln);
});

// Query Route
// localhost:3000/query?fn=RishabhVinay&ln=Bhagat
app.get('/query',(req,res) => {
    console.log(req.query);
    res.send('Query Page : ' + req.query.fn + ' ' + req.query.ln);
});

//app.get('/index',(req,res) => {
//     res.sendFile(__dirname + '/views/index.html');
// })

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});