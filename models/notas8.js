const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas8Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas8 = mongoose.model('Nota8', notas8Schema);

module.exports = Notas8;