// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas9 = require('../models/notas9');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota9/notas9AddEdit", {
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
    newNota9(req, res);
    else
    updateNota9(req, res);
});

//metodo para registrar
function newNota9(req, res) {
    var nota9 = new Notas9();
    nota9.Nombres = req.body.Nombres;
    nota9.Apellidos = req.body.Apellidos;
    nota9.NotaAC = req.body.NotaAC;
    nota9.NotaAI = req.body.NotaAI;
    nota9.NotaEX = req.body.NotaEX;
    nota9.Prom = req.body.Prom;
    nota9.Prom = ` ${(Math.round((nota9.NotaAC + nota9.NotaAI + nota9.NotaEX)/3))}`;
    nota9.save((err) => {
        if(!err){
            res.redirect("notas9/listNotas9");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota9(req, res) {
    Notas9.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas9/listNotas9");
        } else {
            res.render("pages/notas9/notas9AddEdit", {
                viewTitle: "Modificar Datos",
                nota9: req.body
            })
        }
    });
}

router.get('/listNotas9', (req, res) => {
    if (req.user) {
        Notas9.find((err, docs) => {
            if(!err){
                res.render("pages/nota9/listNotas9", {
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
    Notas9.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota9/notas9AddEdit", {
                viewTitle: "Modificar Datos",
                nota9: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas9.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas9/listNotas9");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas9', function(req, res){
  var NotaAC = parseFloat(req.body.NotaAC) || 0;
  var NotaAI = parseFloat(req.body.NotaAI) || 0;
  var NotaEX = parseFloat(req.body.NotaEX) || 0;
  var Prom = '';
  Prom = ` ${((NotaAC + NotaAI + NotaEX)/3)}`;

  var viewData = {
        "NotaAC": NotaAC,
        "NotaAI": NotaAI,
        "NotaEX": NotaEX,
        "Prom": Prom

    };

    var viewData2 = {
        NotaAC,
        NotaAI,
        NotaEX,
        Prom
      }
      res.render('notas9', viewData2);



})


module.exports = router;