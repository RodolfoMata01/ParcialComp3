const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas6Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Prom: Number
});

const Notas6 = mongoose.model('Nota6', notas6Schema);

module.exports = Notas6;