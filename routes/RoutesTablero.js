const express = require("express");
const TableroService = require("../services/ServicesTablero")
const response = require("../network/response");

function tableroApi(app) {
  const router = express.Router();
  app.use("/", router);
  const tableroService = new TableroService.TableroService();

  //obtener posicion del tablero
  router.get("/tablero", function (req, res) {
    tableroService.getPositionInicial(req.headers.id)
      .then((tablero)=> {
          res.status(200).json(tablero);
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesGetTableroInicial]:" + err, 500, err);
      })
});

  //obtener posicion del tablero
  router.post("/tablero/:position", function (req, res) {
      tableroService.setPosition(req.params.position,req.headers.id)
        .then((tablero)=> {
            res.status(200).json(tablero);
        })
        .catch((err) => {
            response.error(req, res, "[UserRoutesPostTablero]:" + err, 500, err);
        })
  });

  //reiniciar tablero
  router.get("/tablero/reiniciar", function (req, res) {
    tableroService.reiniciar(req.headers.id)
      .then((tablero)=> {
          //respuesta
          res.status(200).json(tablero);
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesGetReiniciar]:" + err, 500, err);
      })
});

 //reiniciar tablero
 router.get("/tablero/reiniciarHistorial", function (req, res) {
    tableroService.reiniciarHistorial(req.headers.id)
      .then((tablero)=> {
          //respuesta
          res.status(200).json(tablero);
      })
      .catch((err) => {
        response.error(req, res, "[UserRoutesGetReiniciarTablero]:" + err, 500, err);
      })
});

}
module.exports = tableroApi;
