// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Apuntes = require('../models/apuntes');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/apunte/apuntesAddEdit", {
            viewTitle: "Nuevo Apunte"
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
    newApunte(req, res);
    else
    updateApunte(req, res);
});

//metodo para registrar
function newApunte(req, res) {
    var apunte = new Apuntes();
    apunte.Titulo = req.body.Titulo;
    apunte.Fecha = Date.parse(req.body.Fecha);
    apunte.Descripcion = req.body.Descripcion;
    apunte.save((err) => {
        if(!err){
            res.redirect("apuntes/listApuntes");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateApunte(req, res) {
    Apuntes.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("apuntes/listApuntes");
            } else {
                console.log("pages/apunte/apuntesAddEdit", {
                    viewTitle: "Editar Apunte",
                    apunte: req.body
                })
            }
        });
}

router.get('/listApuntes', (req, res) => {

    if (req.user) {
        Apuntes.find((err, docs) => {
            if(!err){
                res.render("pages/apunte/listApuntes", {
                    viewTitle: "Lista de Apuntes",
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
    Apuntes.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/apunte/apuntesAddEdit", {
                viewTitle: "Editar Apunte",
                apunte: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Apuntes.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/apuntes/listApuntes");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})

module.exports = router;