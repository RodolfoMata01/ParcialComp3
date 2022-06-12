const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas9Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas9 = mongoose.model('Nota9', notas9Schema);

module.exports = Notas9;