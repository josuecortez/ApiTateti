const express = require("express");
const UserService = require("../services/ServicesUsers");
const TableroService = require("../services/ServicesTablero")
const response = require("../network/response");

function userApi(app) {
  const router = express.Router();
  app.use("/", router);
  const userService = new UserService.UserService();
  const tableroService = new TableroService.TableroService();

  router.post("/user", function (req, res) {
    userService
      .postUser(req.body.name, res)
      .then((user) => {
        if (user) {
          //response.success(req.body, res, 'Ok', 200);
          res.status(200).json(user._id);
        }
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesPostUser]: " + err, 500, err);
      });
  });
  //obtener todos los usuarios
  router.get("/user", function (req, res) {
    userService
      .getAllUser()
      .then((users) => {
        // response.success(req,res.send(users),'Ok',200);
        res.status(200).json(users);
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesGetAll]:" + err, 500, err);
      });
  });
  //obtener un usuario por id
  app.get("/user/:id", function (req, res) {
    userService.getOneUser(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesGetOne]:" + err, 500, err);
      });
  });

  //obtener posicion del tablero
  router.get("/tablero", function (req, res) {
      tableroService.getPosition()
        .then(()=> {
            //respuesta
        })
        .catch((err) => {
            //error
        })
  });
}
module.exports = userApi;
