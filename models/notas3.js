const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas3Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas3 = mongoose.model('Nota3', notas3Schema);

module.exports = Notas3;