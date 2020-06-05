const express =  require('express');
const bodyParser = require('body-parser');
const {config} = require('./config/index');
const userApi = require('./routes/RoutesUser')
const db = require('./lib/mongo');
var app = express();
//new MongoLib().connect();
db('mongodb+srv://dbUser:dbUser@progavanzada-adlzk.mongodb.net/tatetiMongo?retryWrites=true&w=majority');
app.use(bodyParser.json());
userApi(app);
app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})
module.exports = app;