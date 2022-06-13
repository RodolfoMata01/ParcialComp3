// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const horario = require('../models/horario');
var router = express.Router();

//llamado al modelo
const Horarios = require('../models/horario');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/horario/newhora", {
            
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
    newhorario(req, res);
    else
    updatehorario(req, res);
});

//metodo para registrar
function newhorario(req, res) {
    var horario = new Horarios();
    horario.Hora = req.body.Hora;
    horario.Lunes = req.body.Lunes;
    horario.Martes = req.body.Martes;
    horario.Miercoles = req.body.Miercoles;
    horario.Jueves = req.body.Jueves;
    horario.Viernes = req.body.Viernes;
    horario.save((err) => {
        if(!err){0

            res.redirect("horario/listhora");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updatehorario(req, res) {
    Horarios.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("horario/listhora");
            } else {
                res.render("pages/horario/newhora", {

                    horario:req.body
                });
            }
        });
}

router.get('/listhora', (req, res) => {
    if (req.user) {
        Horarios.find((err, docs) => {
            if(!err){
                res.render("pages/horario/listhora", {
         
                    list: docs
                });
            } else {
                console.log("Error al listar los apuntes" + err);
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
    Horarios.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/horario/newhora", {

                horario: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Horarios.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/horario/listhora");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})

module.exports = router;