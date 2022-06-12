const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas1Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas1 = mongoose.model('Nota1', notas1Schema);

module.exports = Notas1;