// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas2 = require('../models/notas2');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota2/notas2AddEdit", {
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
    newNota2(req, res);
    else
    updateNota2(req, res);
});

//metodo para registrar
function newNota2(req, res) {
    var nota2 = new Notas2();
    nota2.Nombres = req.body.Nombres;
    nota2.Apellidos = req.body.Apellidos;
    nota2.NotaAC = req.body.NotaAC;
    nota2.NotaAI = req.body.NotaAI;
    nota2.NotaEX = req.body.NotaEX;
    nota2.Prom = req.body.Prom;
    nota2.Prom = ` ${(Math.round((nota2.NotaAC + nota2.NotaAI + nota2.NotaEX)/3))}`;
    nota2.save((err) => {
        if(!err){
            res.redirect("notas2/listNotas2");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota2(req, res) {
    Notas2.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas2/listNotas2");
        } else {
            res.render("notas2/notas2AddEdit", {
                viewTitle: "Modificar Datos",
                nota2: req.body
            })
        }
    });
}

router.get('/listNotas2', (req, res) => {
    if (req.user) {
        Notas2.find((err, docs) => {
            if(!err){
                res.render("pages/nota2/listNotas2", {
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
    Notas2.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota2/notas2AddEdit", {
                viewTitle: "Modificar Datos",
                nota2: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas2.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas2/listNotas2");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 




module.exports = router;