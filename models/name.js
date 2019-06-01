const mongoose = require('mongoose');

const NameSchema = new mongoose.Schema({
	name: String,
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Name', NameSchema);