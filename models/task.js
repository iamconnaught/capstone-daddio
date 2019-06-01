const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	title: String,
	details: String,
	isCompleted: Boolean,
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Task', TaskSchema);