const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

const ponerCors = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'get, post, delete');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}

const escogerBdd = async (req, res, next) => {
	switch (req.params.equipo) {
		case 'red': await mongoose.connect(keys.mongoRed); break;
		case 'green': await mongoose.connect(keys.mongoGreen); break;
		case 'orange': await mongoose.connect(keys.mongoOrange); break;
	}
	next();
};

const app = express();
app.use(bodyParser.json());
app.use(ponerCors);

require('./routes/usuariosRoutes')(app, escogerBdd);
require('./routes/dependientesRoutes')(app, escogerBdd);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
