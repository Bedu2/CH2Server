const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');

// mongoose.connect(keys.mongoRed);

const app = express();
app.use(bodyParser.json());


const escogerBdd = (equipo) => {
	switch (equipo) {
		case 'red': return mongoose.connect(keys.mongoRed);
		case 'green': return mongoose.connect(keys.mongoGreen);
		case 'orange': return mongoose.connect(keys.mongoOrange);
	}
};

require('./routes/usuariosRoutes')(app, escogerBdd);


const PORT = process.env.PORT || 5000;
app.listen(PORT);