const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas5Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas5 = mongoose.model('Nota5', notas5Schema);

module.exports = Notas5;