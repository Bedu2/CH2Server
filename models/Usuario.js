const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
	nombre: String,
	apellidos: {
		paterno: String,
		materno: String
	},
	edad: Number
});

mongoose.model('usuarios', usuarioSchema);