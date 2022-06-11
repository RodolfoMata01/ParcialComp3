const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apuntesSchema = new Schema ({
    Titulo: String,
    Fecha: Date,
    Descripcion: String
});

const Apuntes = mongoose.model('Apunte', apuntesSchema);

module.exports = Apuntes;