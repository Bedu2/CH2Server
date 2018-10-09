const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
var cors = require('cors');
require('./models/Usuario');
require('./models/Dependiente');

// mongoose.connect(keys.mongoRed);

const app = express();
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({origin: '*'}));

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
