const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
});

const escogerBdd = (equipo) => {
	switch (equipo) {
		case 'red': return mongoose.connect(keys.mongoRed);
		case 'green': return mongoose.connect(keys.mongoGreen);
		case 'orange': return mongoose.connect(keys.mongoOrange);
	}
};

require('./routes/usuariosRoutes')(app, escogerBdd);
require('./routes/dependientesRoutes')(app, escogerBdd);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
