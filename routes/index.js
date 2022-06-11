var express = require('express');
var router = express.Router();
const methods = require('../methods');
const User = require('../models/user');

// constantes para rutas de paginas, login y register
const loginPage = "../views/pages/login";
const registerPage = "../views/pages/register";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Student's Grade Calculator" });
});

// registro de rutas
router.get('/home', function(req, res) {
  if (req.user) {
    res.render('home', {
      userName: req.user.fullName 
    });
  } else {
    res.render(loginPage, {
      message: "Por favor, inicie sesion para continuar",
      messageClass: "alert-danger"
    });
  }
});

//Metodos GET de las paginas Login y Register
//LOGIN
router.get('/login', (req, res) => {
  res.render(loginPage);
});
//REGISTER
router.get('/register', (req,res) => {
  res.render(registerPage);
});

//Metodos POST de las paginas Login y Register
//LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);

  user = await User.findOne({ email: email, password: hashedPassword })

    .then(user => {
      if(user){
        const authToken = methods.generateAuthToken();
        methods.authTokens[authToken] = user;
        res.cookie('AuthToken', authToken); //setting token
        res.redirect("/home"); //redirect
      } else {
        res.render(loginPage, {
          message: "Usuario y contraseña invalidos. Por favor, vuelva a intentarlo.",
          messageClass: "alert-danger"
        });
      }
    }) 
});

//REGISTER
router.post('/register', async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  // validacion
  if (password === confirmPassword) {
    user = await User.findOne({ email: email })
    .then(user => {
      if(user) {
        res.render(registerPage, {
          message: "El usuario ya esta registrado",
          messageClass: "alert-danger"
        });
      } else {
        const hashedPassword = methods.getHashedPassword(password);
        const userDB = new User({
          'fullName': fullName,
          'email': email,
          'password': hashedPassword
        });
        userDB.save();
        
        res.render(loginPage, {
          message: "Registro exitoso. Inicie sesion.",
          messageClass: "alert-success"
        });
      }
    })
  } else {
    res.render(registerPage, {
      message: "Las contaseñas no coinciden. Por favor, vuelva a intentarlo.",
      messageClass: "alert-danger"
    });
  }

});

//LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
});

module.exports = router;
