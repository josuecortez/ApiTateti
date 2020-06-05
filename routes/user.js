const express = require('express');
const UserService = require('../services/users.js');
const response = require('../network/response');

function userApi(app){
    const router = express.Router();
    app.use('/', router);   
    const  userService = new UserService.UserService();

    router.post('/user', function (req, res) {
        userService.postUser(req.header,res)
            .then((user)=> {
                if(user){
                    response.success(req.headers, res, 'Ok', 200);
                }
                       
            })
            .catch(err => {
                response.error(req,res,'[MutantRoutes]: ' + err, 500, err);
            })   
    });

}
module.exports = userApi;