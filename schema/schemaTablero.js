const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: Schema.ObjectId,
    tableroOcupado: [Number],
    tableroMaquina:[Number],
    tableroHumano:[Number],
    empate: Boolean,
    ganadorHumano: Boolean,
    ganadorMaquina: Boolean,
    cantidadEmpates: Number,
    cantidadGanadorHumano: Number,
    cantidadGanadorMaquina: Number
},{collection: 'Tablero'});

const model = mongoose.model('tablero', mySchema);
module.exports = model;

//sort(function(a, b){return a-b});
//.find((element) => element == position)