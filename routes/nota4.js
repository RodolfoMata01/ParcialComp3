// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas4 = require('../models/notas4');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota4/notas4AddEdit", {
            viewTitle: "Nuevo promedio"
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
    newNota4(req, res);
    else
    updateNota4(req, res);
});

//metodo para registrar
function newNota4(req, res) {
    var nota4 = new Notas4();
    nota4.Nombres = req.body.Nombres;
    nota4.Apellidos = req.body.Apellidos;
    nota4.NotaAC = req.body.NotaAC;
    nota4.NotaAI = req.body.NotaAI;
    nota4.NotaEX = req.body.NotaEX;
    nota4.Prom = req.body.Prom;
    nota4.Prom = ` ${(Math.round((nota4.NotaAC + nota4.NotaAI + nota4.NotaEX)/3))}`;
    nota4.save((err) => {
        if(!err){
            res.redirect("notas4/listNotas4");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota4(req, res) {
    Notas4.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas4/listNotas4");
        } else {
            res.render("notas4/notas4AddEdit", {
                viewTitle: "Modificar Datos",
                nota4: req.body
            })
        }
    });
}

router.get('/listNotas4', (req, res) => {
    if (req.user) {
        Notas4.find((err, docs) => {
            if(!err){
                res.render("pages/nota4/listNotas4", {
                    viewTitle: "Modificar Datos",
                    list: docs
                });
            } else {
                console.log("Error al modificar" + err);
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
    Notas4.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota4/notas4AddEdit", {
                viewTitle: "Modificar Datos",
                nota4: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas4.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas4/listNotas4");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 


module.exports = router;