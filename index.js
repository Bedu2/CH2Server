const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

const ponerCors = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
}

const escogerBdd = async (req, res, next) => {
	switch (req.params.equipo) {
		case 'red': await mongoose.connect(keys.mongoRed);
		case 'green': await mongoose.connect(keys.mongoGreen);
		case 'orange': await mongoose.connect(keys.mongoOrange);
	}
	next();
};

const app = express();
app.use(bodyParser.json());
app.use(ponerCors);

require('./routes/usuariosRoutes')(app, escogerBdd, ponerCors);
require('./routes/dependientesRoutes')(app, escogerBdd, ponerCors);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
