const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas2Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas2 = mongoose.model('Nota2', notas2Schema);

module.exports = Notas2;