const mongoose = require('mongoose');
const keys = require('../config/keys');

const Dependiente = mongoose.model('dependientes');

module.exports = (app, escogerBdd, aceptarCors) => {

	app.get('/api/dependientes/:equipo', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

		const dependientes = await Dependiente.find({});
		res.send(dependientes);
	});

//=========================================================================

	app.get('/api/dependientes/:equipo/:id', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

		const dependientes = await Dependiente.find({ _id: req.params.id });
		res.send(dependientes);
	});

//=========================================================================

	app.get('/api/dependientes_usuario/:equipo/:id', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

		const dependientes = await Dependiente.find({ _usuario: req.params.id });
		res.send(dependientes);
	});

//=========================================================================

	app.post('/api/dependientes/:equipo', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

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

	app.post('/api/dependientes/:equipo/:id', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

		const { nombre_completo, edad, _usuario, dependencia } = req.body;

		if (!nombre_completo) res.send('Falta el nombre completo.');
		if (!dependencia) res.send('Falta dependencia.');
		if (!edad) res.send('Falta la edad.');
		if (!_usuario) res.send('Falta ID de usuario.');

		const respuesta = await Dependiente.findOneAndUpdate(
			{ _id: req.params.id },
			{ nombre, apellidos, edad },
			{ new: true }
		).exec();

		res.send(respuesta);
	});

//=========================================================================

	app.delete('/api/dependientes/:equipo/:id', aceptarCors async (req, res) => {
		await escogerBdd(req.params.equipo);

		const dependientes = await Dependiente.deleteOne({ _id: req.params.id });
		res.send(dependientes);
	});

};
