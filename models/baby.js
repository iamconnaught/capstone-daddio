const mongoose = require('mongoose');

const BabySchema = new mongoose.Schema({
	dateOfBirth: Date,
	name: String,
	gender: String,
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Baby', BabySchema);