var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methods = require('./methods');
const hbs = require('hbs');

//declaracion de rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var asignaturasRouter = require('./routes/asig'); //declaracion de ruta asignatura
var agendaRouter = require('./routes/agenda')//declaracion de la ruta agenda
var apuntesRouter = require('./routes/apunte'); //declaracion de la ruta apuntes
var calendarioRouter = require('./routes/calendario')//declaracion de la ruta calendario
var alumnoRouter = require('./routes/alumno')//declaracion de la ruta agenda
var estudiantesRouter = require('./routes/estudiante'); //declaracion de la ruta estudiantes
var notaRouter = require('./routes/nota');//declaracion de la ruta nota
var vernotaRouter = require('./routes/vernota');//declaracion de la ruta vernota
var horarioRouter = require('./routes/horarios');
var nota1Router = require('./routes/nota1')//declaracion de la ruta nota1
var nota2Router = require('./routes/nota2')//declaracion de la ruta nota2
var nota3Router = require('./routes/nota3')//declaracion de la ruta nota3
var nota4Router = require('./routes/nota4')//declaracion de la ruta nota4
var nota5Router = require('./routes/nota5')//declaracion de la ruta nota5
var nota6Router = require('./routes/nota6')//declaracion de la ruta nota6
var nota7Router = require('./routes/nota7')//declaracion de la ruta nota7
var nota8Router = require('./routes/nota8')//declaracion de la ruta nota8
var nota9Router = require('./routes/nota9')//declaracion de la ruta nota9
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials', function(err){});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//colocar antes de las rutas
//inyectar solicitud leyendo authtoken
app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  req.user = methods.authTokens[authToken];
  next();
})

//registro de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/asignaturas', asignaturasRouter); //ruta de asignatura
app.use('/agenda', agendaRouter); //ruta de agenda
app.use('/apuntes', apuntesRouter); //ruta de apuntes
app.use('/calendario',calendarioRouter)//ruta de calendario
app.use('/alumno', alumnoRouter); //ruta de Alumno
app.use('/estudiantes', estudiantesRouter); //ruta de Estudiantes
app.use('/nota', notaRouter); //ruta de nota
app.use('/vernota', vernotaRouter); //ruta de nota
app.use('/horario', horarioRouter);
app.use('/notas1', nota1Router); //ruta de nota de primer grado
app.use('/notas2', nota2Router); //ruta de nota de segundo grado
app.use('/notas3', nota3Router); //ruta de nota de tercer grado
app.use('/notas4', nota4Router); //ruta de nota de cuarto grado
app.use('/notas5', nota5Router); //ruta de nota de quinto grado
app.use('/notas6', nota6Router); //ruta de nota de sexto grado
app.use('/notas7', nota7Router); //ruta de nota de septimo grado
app.use('/notas8', nota8Router); //ruta de nota de octavo grado
app.use('/notas9', nota9Router); //ruta de nota de noveno grado


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Se establecio conexion a mongodb"))
.catch((e) => console.log("Error", e))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
