const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horarioSchema = new Schema ({
    Hora: String,
    Lunes: String,
    Martes: String,
    Miercoles: String,
    Jueves: String,
    Viernes: String
});

const Horario = mongoose.model('Horario', horarioSchema);

module.exports = Horario;