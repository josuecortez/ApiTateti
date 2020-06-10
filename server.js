const express =  require('express');
const bodyParser = require('body-parser');
const {config} = require('./config/index');
const userApi = require('./routes/RoutesUser');
const tableroApi = require('./routes/RoutesTablero');
const db = require('./lib/mongo');
var app = express();

db('mongodb+srv://dbUser:dbUser@progavanzada-adlzk.mongodb.net/tatetiMongo?retryWrites=true&w=majority');
app.use(bodyParser.json());
userApi(app);
tableroApi(app);
app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})
module.exports = app;