const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    tableroOcupado: [Number],
    tableroLleno: [Number]
},{collation: 'Tablero'});

const model = mongoose.model('tablero', mySchema);
module.exports = model;