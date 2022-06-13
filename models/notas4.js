const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas4Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas4 = mongoose.model('Nota4', notas4Schema);

module.exports = Notas4;