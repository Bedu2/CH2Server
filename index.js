const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

const app = express();
const aceptarCors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
	next();
}
app.use(bodyParser.json());
app.use(aceptarCors());

const escogerBdd = (equipo) => {
	switch (equipo) {
		case 'red': return mongoose.connect(keys.mongoRed);
		case 'green': return mongoose.connect(keys.mongoGreen);
		case 'orange': return mongoose.connect(keys.mongoOrange);
	}
};

require('./routes/usuariosRoutes')(app, escogerBdd, aceptarCors);
require('./routes/dependientesRoutes')(app, escogerBdd, aceptarCors);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
