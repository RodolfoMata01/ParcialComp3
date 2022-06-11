const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantesSchema = new Schema ({
    Nombres: String,
    Apellidos: String,
    Grado: String,
    Seccion: String
});

const Estudiantes = mongoose.model('Estudiante', estudiantesSchema);

module.exports = Estudiantes;