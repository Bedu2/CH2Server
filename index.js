const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

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
app.use(cors());

require('./routes/usuariosRoutes')(app, escogerBdd);
require('./routes/dependientesRoutes')(app, escogerBdd);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
