const mongoose = require('mongoose');
const keys = require('../config/keys');

const Dependiente = mongoose.model('dependientes');

module.exports = (app, escogerBdd, ponerCors) => {

	app.get('/api/dependientes/:equipo', escogerBdd, ponerCors, async (req, res) => {

		const dependientes = await Dependiente.find({});
		res.send(dependientes);
	});

//=========================================================================

	app.get('/api/dependientes/:equipo/:id', escogerBdd, ponerCors, async (req, res) => {

		const dependientes = await Dependiente.find({ _id: req.params.id });
		res.send(dependientes);
	});

//=========================================================================

	app.get('/api/dependientes_usuario/:equipo/:id', escogerBdd, ponerCors, async (req, res) => {

		const dependientes = await Dependiente.find({ _usuario: req.params.id });
		res.send(dependientes);
	});

//=========================================================================

	app.post('/api/dependientes/:equipo', escogerBdd, ponerCors, async (req, res) => {

		const { nombre_completo, edad, _usuario, dependencia } = req.body;

		if (!nombre_completo) res.send('Falta el nombre completo.');
		if (!dependencia) res.send('Falta dependencia.');
		if (!edad) res.send('Falta la edad.');
		if (!_usuario) res.send('Falta ID de usuario.');

		const dependiente = new Dependiente({
			nombre_completo, edad, _usuario, dependencia
		});
		const respuesta = await dependiente.save();

		res.send(respuesta);
	});

//=========================================================================

	app.post('/api/dependientes/:equipo/:id', escogerBdd, ponerCors, async (req, res) => {

		const { nombre_completo, edad, _usuario, dependencia } = req.body;

		if (!nombre_completo) res.send('Falta el nombre completo.');
		if (!dependencia) res.send('Falta dependencia.');
		if (!edad) res.send('Falta la edad.');
		if (!_usuario) res.send('Falta ID de usuario.');

		const respuesta = await Dependiente.findOneAndUpdate(
			{ _id: req.params.id },
			{ nombre_completo, dependencia, edad },
			{ new: true }
		).exec();

		res.send(req.body);
	});

//=========================================================================

	app.delete('/api/dependientes/:equipo/:id', escogerBdd, ponerCors, async (req, res) => {

		const dependientes = await Dependiente.deleteOne({ _id: req.params.id });
		res.send(dependientes);
	});

};
