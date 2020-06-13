const express =  require('express');
const bodyParser = require('body-parser');
const {config} = require('./config/index');
const userApi = require('./routes/RoutesUser');
const tableroApi = require('./routes/RoutesTablero');
const db = require('./lib/mongo');
var app = express();

db('mongodb+srv://dbUser:dbUser@progavanzada-adlzk.mongodb.net/tatetiMongo?retryWrites=true&w=majority');
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,id');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
userApi(app);
tableroApi(app);
app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})
module.exports = app;