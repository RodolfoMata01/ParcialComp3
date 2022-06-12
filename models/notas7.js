const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas7Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas7 = mongoose.model('Nota7', notas7Schema);

module.exports = Notas7;