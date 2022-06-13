// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas3 = require('../models/notas3');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota3/notas3AddEdit", {
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
    newNota3(req, res);
    else
    updateNota3(req, res);
});

//metodo para registrar
function newNota3(req, res) {
    var nota3 = new Notas3();
    nota3.Nombres = req.body.Nombres;
    nota3.Apellidos = req.body.Apellidos;
    nota3.NotaAC = req.body.NotaAC;
    nota3.NotaAI = req.body.NotaAI;
    nota3.NotaEX = req.body.NotaEX;
    nota3.Prom = req.body.Prom;
    nota3.Prom = ` ${(Math.round((nota3.NotaAC + nota3.NotaAI + nota3.NotaEX)/3))}`;
    nota3.save((err) => {
        if(!err){
            res.redirect("notas3/listNotas3");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota3(req, res) {
    Notas3.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas3/listNotas3");
        } else {
            res.render("notas3/notas3AddEdit", {
                viewTitle: "Modificar Datos",
                nota3: req.body
            })
        }
    });
}

router.get('/listNotas3', (req, res) => {
    if (req.user) {
        Notas3.find((err, docs) => {
            if(!err){
                res.render("pages/nota3/listNotas3", {
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
    Notas3.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota3/notas3AddEdit", {
                viewTitle: "Modificar Datos",
                nota3: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas3.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas3/listNotas3");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 



module.exports = router;