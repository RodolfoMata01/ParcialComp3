var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('pages/calendario/calendario.hbs');
  });

  

module.exports = router;
