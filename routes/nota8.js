// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Notas8 = require('../models/notas8');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota8/notas8AddEdit", {
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
    newNota8(req, res);
    else
    updateNota8(req, res);
});

//metodo para registrar
function newNota8(req, res) {
    var nota8 = new Notas8();
    nota8.Nombres = req.body.Nombres;
    nota8.Apellidos = req.body.Apellidos;
    nota8.NotaAC = req.body.NotaAC;
    nota8.NotaAI = req.body.NotaAI;
    nota8.NotaEX = req.body.NotaEX;
    nota8.Prom = req.body.Prom;
    nota8.Prom = ` ${(Math.round((nota8.NotaAC + nota8.NotaAI + nota8.NotaEX)/3))}`;
    nota8.save((err) => {
        if(!err){
            res.redirect("notas8/listNotas8");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota8(req, res) {
    Notas8.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas8/listNotas8");
        } else {
            res.render("pages/notas8/notas8AddEdit", {
                viewTitle: "Modificar Datos",
                nota8: req.body
            })
        }
    });
}

router.get('/listNotas8', (req, res) => {
    if (req.user) {
        Notas8.find((err, docs) => {
            if(!err){
                res.render("pages/nota8/listNotas8", {
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
    Notas8.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota8/notas8AddEdit", {
                viewTitle: "Modificar Datos",
                nota8: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas8.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas8/listNotas8");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas8', function(req, res){
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
      res.render('notas8', viewData2);



})


module.exports = router;