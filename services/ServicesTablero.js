const ModelTablero = require("../schema/schemaTablero");
const tableroCompleto = [1,2,3,4,5,6,7,8,9];
const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
class TableroService {
  async getPositionInicial(idUsuario) {
    const tablero = await ModelTablero.findOne({ _id: idUsuario });
    if(tablero){
        return tablero;
    }
    else {
      const jsonTablero = {
        _id: idUsuario,
        tableroOcupado: [],
        tableroMaquina: [],
        tableroHumano: [],
        empate: false,
        ganadorHumano: false,
        ganadorMaquina: false,
        cantidadEmpates: 0,
        cantidadGanadorHumano: 0,
        cantidadGanadorMaquina: 0,
      };
      let tableroNuevo = new ModelTablero(jsonTablero);
      tableroNuevo.save();
      return ({
        msgError:
          "No se encuentra ningun tablero para este usuario, se creo uno",
        datoAdicional: "",
      });
    }
  }
  async setPosition(position, idUsuario) {
    let jsonResult = {
      msgError: String,
      datoAdicional: String,
    };
    const tablero = await ModelTablero.findOne({ _id: idUsuario });
    if (tablero) {
      //verificar si esta entre el 1 y el 9
      if (position > 0 && position <= 9) {
        //verificar si alguien gano
        if (
          !tablero.empate &&
          !tablero.ganadorHumano &&
          !tablero.ganadorMaquina
        ) {
          //verificar que no este ocupada
          if (!tablero.tableroOcupado.find((element) => element == position)) {
            //verificar si esta lleno
            if(tablero.tableroOcupado.length == 9){
                return (jsonResult = {
                    msgError: "No existen mas lugares, el tablero debe reiniciarse en /tablero/reiniciar",
                    datoAdicional: "Con dato adicional el header key: id y value:" + idUsuario,
                  });
            }
            if(tablero.tableroOcupado.length < 8){
                tablero.tableroHumano.push(position);
                tablero.tableroHumano.sort(function(a, b){return a-b});
                tablero.tableroOcupado.push(position);
                tablero.tableroOcupado.sort(function(a, b){return a-b})
                let isWin = checkWinner(tablero.tableroHumano);
                //verificar si gano humano
                if(isWin){
                    tablero.ganadorHumano = true;
                    tablero.cantidadGanadorHumano = tablero.cantidadGanadorHumano + 1;
                    tablero.save();
                    return tablero;
                }
                //si no gano humano tratar de buscar si gana maquina
                let celdaM = checkSiGana(tablero.tableroMaquina);
                if(celdaM > -1){
                    tablero.tableroMaquina.push(celdaM);
                    tablero.tableroMaquina.sort(function(a, b){return a-b});
                    tablero.tableroOcupado.push(celdaM);
                    tablero.tableroOcupado.sort(function(a, b){return a-b});
                    tablero.ganadorMaquina= true;
                    tablero.cantidadGanadorMaquina = tablero.cantidadGanadorMaquina + 1;
                    tablero.save();
                    return tablero;
                }
                //verificar si esta por ganar el humano
                let celdaH = checkSiGana(tablero.tableroHumano);
                if(celdaH > -1){
                    tablero.tableroMaquina.push(celdaH);
                    tablero.tableroMaquina.sort(function(a, b){return a-b});
                    tablero.tableroOcupado.push(celdaH);
                    tablero.tableroOcupado.sort(function(a, b){return a-b});
                    tablero.save();
                    return tablero;
                }
                //si no esta por ganar el humano poner celda en cualquier lado.
                let tableroDesocupado = tableroCompleto.diff(tablero.tableroOcupado);
                //obtener celda aleatoria
                let celdaRandom = tableroDesocupado[Math.floor(Math.random()*tableroDesocupado.length)];
                tablero.tableroOcupado.push(celdaRandom);
                tablero.tableroOcupado.sort(function(a,b){return a-b});
                tablero.tableroMaquina.push(celdaRandom);
                tablero.tableroMaquina.sort(function(a,b){return a-b});
                tablero.save();
                return tablero;
            }
            //quiere decir que jugo el humano y solo queda una celda
            if(tablero.tableroOcupado.length == 8){
              //si no esta por ganar el humano poner celda en cualquier lado.
              let tableroDesocupado = tableroCompleto.diff(tablero.tableroOcupado);
              //obtener celda aleatoria
              let celdaRandom = tableroDesocupado[Math.floor(Math.random()*tableroDesocupado.length)];
              tablero.tableroOcupado.push(celdaRandom);
              tablero.tableroOcupado.sort(function(a,b){return a-b});
              tablero.tableroMaquina.push(celdaRandom);
              tablero.tableroMaquina.sort(function(a,b){return a-b});
              //checkear si gano la maquina
              let isWin = checkWinner(tablero.tableroMaquina);
              if(isWin){
                tablero.ganadorMaquina= true;
                tablero.cantidadGanadorMaquina = tablero.cantidadGanadorMaquina + 1;
                tablero.save();
              }
              //hay empate
              tablero.empate = true;
              tablero.cantidadEmpates = tablero.cantidadEmpates + 1;
              tablero.save();
              return tablero;
            }
            

        } else {
            return (jsonResult = {
              msgError: "La posición ya esta ocupada, debe elegir otra",
              datoAdicional: "",
            });
          }
        }
        else{
            return (jsonResult = {
                msgError: "Ya existe un ganador, el tablero debe reiniciarse en /tablero/reiniciar",
                datoAdicional: "Con dato adicional el header key: id y value:" + idUsuario,
              });
        }
      } else {
        return (jsonResult = {
          msgError: "La posición debe estar comprendida entre 1 y 9",
          datoAdicional: "",
        });
      }
    } else {
      const jsonTablero = {
        _id: idUsuario,
        tableroOcupado: [],
        tableroMaquina: [],
        tableroHumano: [],
        empate: false,
        ganadorHumano: false,
        ganadorMaquina: false,
        cantidadEmpates: 0,
        cantidadGanadorHumano: 0,
        cantidadGanadorMaquina: 0,
      };
      let tableroNuevo = new ModelTablero(jsonTablero);
      tableroNuevo.save();
      return (jsonResult = {
        msgError:
          "No se encuentra ningun tablero para este usuario, se creo uno",
        datoAdicional: "",
      });
    }
  }

  //reiniciar
  async reiniciar(idUsuario) {
    let jsonResult = {
      msgError: String,
      datoAdicional: String,
    };
    const tablero = await ModelTablero.findOne({ _id: idUsuario });
    if(tablero){
      tablero.tableroOcupado = [];
      tablero.tableroMaquina = [];
      tablero.tableroHumano = [];
      tablero.empate = false;
      tablero.ganadorHumano = false;
      tablero.ganadorMaquina = false;
      tablero.save();
      return tablero;
    }
    else{
      return (jsonResult = {
        msgError: "Algo sucedio mal en el reinicio del tablero",
        datoAdicional: ""
      })
    }
  }

  //reiniciarHistorial
  async reiniciarHistorial(idUsuario) {
    let jsonResult = {
      msgError: String,
      datoAdicional: String,
    };
    const tablero = await ModelTablero.findOne({ _id: idUsuario });
    if(tablero){
      tablero.cantidadEmpates = 0;
      tablero.cantidadGanadorHumano = 0;
      tablero.cantidadGanadorMaquina = 0;
      tablero.save();
      return tablero;
    }
    else{
      return (jsonResult = {
        msgError: "Algo sucedio mal en el reinicio del historial",
        datoAdicional: ""
      })
    }
  }
}
function checkWinner(tablero) {
    let hayGanador = false;
    winningCombos.forEach(element => {
        var _elemento0 = tablero.find((e)=> e == element[0]);
        var _elemento1 = tablero.find((e)=> e == element[1]);
        var _elemento2 = tablero.find((e)=> e == element[2]);
        if (_elemento0 && _elemento1 && _elemento2) {
            hayGanador = true;
            return hayGanador
        }
    })
    return hayGanador;
}
function checkSiGana(tablero) {
    let celda = -1;
    winningCombos.forEach(element => {
        var _elemento0 = tablero.find((e)=> e == element[0]);
        var _elemento1 = tablero.find((e)=> e == element[1]);
        var _elemento2 = tablero.find((e)=> e == element[2]);
        if (_elemento1 && _elemento2) {
            celda = element[0];
            return 
        }
        if (_elemento0 &&  _elemento2) {
            celda = element[1];
            return 
        }
        if (_elemento0 && _elemento1) {
          celda = element[2];
          return 
      }
    })
    return celda;
}
//obtener diferencia entre arrays
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


module.exports = {
  TableroService,
};
