const mongoose = require('mongoose');
const { Schema } = mongoose;

const dependienteSchema = new Schema({
	nombre_completo: String,
	edad: Number,
	_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
	dependencia: String
});

mongoose.model('dependientes', dependienteSchema);