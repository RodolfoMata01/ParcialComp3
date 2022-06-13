// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes = require('../models/estudiantes');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante/estudiantesAddEdit", {
            viewTitle: "Nuevo Estudiante"
        });
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    newEstudiante(req, res);
    else
    updateEstudiante(req, res);
});

//metodo para registrar
function newEstudiante(req, res) {
    var estudiante = new Estudiantes();
    estudiante.Nombres = req.body.Nombres;
    estudiante.Apellidos = req.body.Apellidos;
    estudiante.Grado = req.body.Grado;
    estudiante.Seccion = req.body.Seccion;
    estudiante.save((err) => {
        if(!err){
            res.redirect("estudiantes/listEstudiantes");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante(req, res) {
    Estudiantes.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("estudiantes/listEstudiantes");
        } else {
            res.render("estudiantes/estudiantesAddEdit", {
                viewTitle: "Editar Estudiante",
                estudiante: req.body
            })
        }
    });
}

router.get('/listEstudiantes', (req, res) => {
    if (req.user) {
        Estudiantes.find((err, docs) => {
            if(!err){
                res.render("pages/estudiante/listEstudiantes", {
                    viewTitle: "Lista de Estudiantes",
                    list: docs
                });
            } else {
                console.log("Error al listar los estudiantes" + err);
            } 
        })
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
})

router.get('/:id', (req, res) => {
    Estudiantes.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/estudiante/estudiantesAddEdit", {
                viewTitle: "Editar Estudiante",
                estudiante: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/estudiantes/listEstudiantes");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;