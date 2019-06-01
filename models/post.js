const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: String,
	text: String,
	date: Date,
	keywords: Array,
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Post', PostSchema);