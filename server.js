const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log(`Listening http://localhost:${3000}`);
})

app.get('/', function(req, res) {
    res.send('hello world');
});