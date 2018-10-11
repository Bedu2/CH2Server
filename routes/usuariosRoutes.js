const mongoose = require('mongoose');
const keys = require('../config/keys');

const Usuario = mongoose.model('usuarios');

module.exports = (app, escogerBdd) => {

	app.get('/api/usuarios/:equipo', escogerBdd, async (req, res) => {

		const usuarios = await Usuario.find({});
		res.send(usuarios);
	});

//=========================================================================

	app.get('/api/usuarios/:equipo/:id', escogerBdd, async (req, res) => {

		const usuarios = await Usuario.find({ _id: req.params.id });
		res.send(usuarios);
	});

//=========================================================================

	app.post('/api/usuarios/:equipo', escogerBdd, async (req, res) => {

		const { nombre, apellidos, edad } = req.body;
		const { paterno, materno } = apellidos;

		if (!nombre) res.send('Falta el nombre.');
		if (!paterno) res.send('Falta apellido paterno.');
		if (!materno) res.send('Falta apellido materno.');
		if (!edad) res.send('Falta la edad.');

		const usuario = new Usuario({
			nombre, apellidos, edad
		});
		const respuesta = await usuario.save();

		res.send(respuesta);
	});

//=========================================================================

	app.post('/api/usuarios/:equipo/:id', escogerBdd, async (req, res) => {

		const { nombre, apellidos, edad } = req.body;
		const { paterno, materno } = apellidos;

		if (!nombre) res.send('Falta el nombre.');
		if (!paterno) res.send('Falta apellido paterno.');
		if (!materno) res.send('Falta apellido materno.');
		if (!edad) res.send('Falta la edad.');

		const respuesta = await Usuario.findOneAndUpdate(
			{ _id: req.params.id },
			{ nombre, apellidos, edad },
			{ new: true }
		).exec();

		res.send(respuesta);
	});

//=========================================================================

	app.delete('/api/usuarios/:equipo/:id', escogerBdd, async (req, res) => {

		const usuarios = await Usuario.deleteOne({ _id: req.params.id });
		res.send(usuarios);
	});

};
