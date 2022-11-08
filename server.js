const express = require('express');
const app = express();
const mongoose = require('mongoose');

//para porde referenciar los contenidos estaticos como imagenes, js, styles
app.use(express.static(__dirname + '/public' ));

//carpete de todos los htmls que son interpretados como ejs
app.set('views', __dirname + '/views');

//motor interprete de las vistas
app.set('view engine', 'ejs');

//para recuperar campos de formularios
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extends: true }));

//para conectarnos o crear la BD
mongoose.connect('mongodb://localhost/animalsdb', { useNewUrlParser: true });

//Generamos un esquema de objeto JSON que almacenaremos
const AnimalSchema = new mongoose.Schema(
    {
    name: {type: String, required: [true,'Nombre: no puede ser vacio'], unique:[true,'Nombre: ya existe registrado']},
    typeanimal: { type: String, required: [true,'Tipo: no puede ser vacio']},
    age: { type: String, required: [true,'Edad: no puede ser vacio']}
    },{timestamps: true }
);

// crea un objeto que contenga métodos para que Mongoose interactúe con MongoDB
const Animal = mongoose.model('Animal', AnimalSchema);

//carga la paginia inical del sitio
app.get('/', function (req, res) {
    let arrErrores = [''];

    Animal.find()
    .then(data => res.render("default", { animals: data, errores: arrErrores }))
    .catch(err => {
        for (var key in err.errors) {
            arrErrores.push(err.errors[key].message)
        }
        res.render('default', {errores: arrErrores})
    });
});

app.post('/mongooses/nuevo', function (req, res) {
    res.render('nuevo',{errores:''})
})

app.post('/mongooses/showedit', (req, res) => {

    let arrErrores = [''];
    let myId = req.query.id;

    Animal.find({name: myId})

    .then(data => res.render("editar", { animals: data, errores: arrErrores }))
    .catch(err => {
        for (var key in err.errors) {
            arrErrores.push(err.errors[key].message)
        }
        res.render('default', {errores: arrErrores})
    });
});


app.post('/mongooses/detail', (req, res) => {

    let arrErrores = [''];
    let myId = req.query.id;

    Animal.find({name: myId})
    .then(data => res.render("animal", { animals: data}))
    .catch(err => {
        for (var key in err.errors) {
            arrErrores.push(err.errors[key].message)
        }
        res.render('default', {errores: arrErrores})
    });
});

//agrega una ruta que permite agregar un elemento a la BD
app.post('/saveEdit', (req, res) => {
    let arrErrores = ['(*) campos requeridos'];
    
    //db.ninjas.update({name: "Trey"}, {location: "Mountain View"})
    Animal.updateOne({name: req.body.name},{ $set: {typeanimal:req.body.typeanimal,age:req.body.age}})
        .then(() =>  res.redirect('./'))
        .catch(err => {
            for (var key in err.errors) {
                arrErrores.push(err.errors[key].message)
            }
            res.render('editar', {errores: arrErrores})
        });
});

//agrega una ruta que permite agregar un elemento a la BD
app.post('/mongooses/borrar', (req, res) => {
    
    Animal.deleteOne({name: req.query.id})
        .then(() =>  res.redirect('/'))
        .catch(err => {
            for (var key in err.errors) {
                arrErrores.push(err.errors[key].message)
            }
            res.render('editar', {errores: arrErrores})
        });
});


//agrega una ruta que permite agregar un elemento a la BD
app.post('/add', (req, res) => {
    let arrErrores = ['(*) campos requeridos'];
    
    const animal = new Animal();
    animal.name = req.body.name;
    animal.typeanimal = req.body.typeanimal;
    animal.age = req.body.age;

    animal.save()
        .then(() =>  res.redirect('/'))
        .catch(err => {
            for (var key in err.errors) {
                arrErrores.push(err.errors[key].message)
            }
            res.render('nuevo', {errores: arrErrores})
        });
});




//exponemos el servidor en el la ip:puerto requerido
app.listen(5000, function () {
    console.log('servidor ejecutandose en http://localhost:5000');
});