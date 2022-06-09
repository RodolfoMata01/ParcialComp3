//importar referencia
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamanos al modelo
const Asignaturas = require('../models/asignaturas');

router.get('/', (req, res) =>{
    if (req){
        res.render("pages/asignatura/AddAsig",{
            viewTitle: "Añadir asignatura",
            
        });
      }else{
        res.render('../views/pages/login',{
          message: "inicie seccion para continuar",
          messageClass: "alert-danger"
        });
    
      }
});

router.post('/',(req, res) => {
  if(req.body._id == '')
  newAsig(req, res)
});

function newAsig(req, res){
  var asignatura = new Asignaturas();
  asignatura.course = req.body.course;
  asignatura.description = req.body.description;
  asignatura.save((err) =>{
      if(!err){
          res.redirect("/asignaturas/lista");

      }
      else{
          console.log("Erro, no se puedo mostrar")
      }
  });

}

router.get('/lista', (req, res) =>{
  if (req){
      Asignaturas.find((err, docs) =>{
          if(!err){
              res.render("pages/asignatura/listAsig", {
                  viewTitle1: "Asignaturas",
                  list: docs
              });
          } else{
              console.log("ERROR,no se pudo mostrar" + err);
          }
      });

  }
  
});


router.get('/delete/:id', (req, res) =>{
  Asignaturas.findByIdAndRemove(req.params.id,(err, docs) =>{
      if(!err){
          res.redirect('/asignaturas/lista')

      } else{
          console.log("No se ha podido eliminar")
      }
  })
})


module.exports = router;