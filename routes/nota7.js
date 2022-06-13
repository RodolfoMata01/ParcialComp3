// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas7 = require('../models/notas7');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota7/notas7AddEdit", {
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
    newNota7(req, res);
    else
    updateNota7(req, res);
});

//metodo para registrar
function newNota7(req, res) {
    var nota7 = new Notas7();
    nota7.Nombres = req.body.Nombres;
    nota7.Apellidos = req.body.Apellidos;
    nota7.NotaAC = req.body.NotaAC;
    nota7.NotaAI = req.body.NotaAI;
    nota7.NotaEX = req.body.NotaEX;
    nota7.Prom = req.body.Prom;
    nota7.Prom = ` ${(Math.round((nota7.NotaAC + nota7.NotaAI + nota7.NotaEX)/3))}`;
    nota7.save((err) => {
        if(!err){
            res.redirect("notas7/listNotas7");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota7(req, res) {
    Notas7.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas7/listNotas7");
        } else {
            res.render("pages/notas7/notas7AddEdit", {
                viewTitle: "Modificar Datos",
                nota7: req.body
            })
        }
    });
}

router.get('/listNotas7', (req, res) => {
    if (req.user) {
        Notas7.find((err, docs) => {
            if(!err){
                res.render("pages/nota7/listNotas7", {
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
    Notas7.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota7/notas7AddEdit", {
                viewTitle: "Modificar Datos",
                nota7: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas7.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas7/listNotas7");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas7', function(req, res){
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
      res.render('notas7', viewData2);



})


module.exports = router;