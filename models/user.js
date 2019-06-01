const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	baby: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Baby'
	}],
	task: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	post: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}],
	name: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Name'
	}]

});

module.exports = mongoose.model('User', UserSchema);