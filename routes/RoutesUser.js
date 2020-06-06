const express = require('express');
const UserService = require('../services/ServicesUsers.js');
const response = require('../network/response');

function userApi(app){
    const router = express.Router();
    app.use('/', router);   
    const  userService = new UserService.UserService();

    router.post('/user', function (req, res) {
        userService.postUser(req.body.name,res)
            .then((user)=> {
                if(user){
                    //response.success(req.body, res, 'Ok', 200);
                    res.json(user)
                }
                       
            })
            .catch(err => {
                response.error(req,res,'[UserRoutesPostUser]: ' + err, 500, err);
            })   
    });

    router.get('/user', function(req,res){
        userService.getAllUser()
            .then((users) => {
                response.success(req,res,'Ok',200);
                res.send(users);
            })
            .catch(err => {
                response.error(req,res,'[UserRoutesGetAll]:' + err, 500, err);
            })
    })

    router.get('/tablero', function(req,res){

    })

}
module.exports = userApi;