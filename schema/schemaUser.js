const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    _id: Schema.ObjectId,
    nombre: String,
    ganador: Boolean
}, {collection: 'User'});

const model = mongoose.model('user', mySchema);
module.exports = model;