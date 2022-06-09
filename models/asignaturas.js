const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asigSchema = new Schema({
    course: String,
    description: String
});

const Asignaturas = mongoose.model('Asignaturas', asigSchema);

module.exports= Asignaturas;