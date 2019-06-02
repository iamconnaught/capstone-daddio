const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.post('/new', async (req, res, next) => {
	try {
		const currentUser = await User.findById(req.session.userDbId);
		const thisPost = new Post({
			title: req.body.title,
			text: req.body.text,
			date: req.body.date,
			ownerId: currentUser._id
		})

		await thisPost.save();
		currentUser.post.push(thisPost);
		await currentUser.save();
		res.status(200).json(thisPost);
	} catch (err){
		next(err)
	}
});

router.get('/', async (req, res, next) => {
	if(req.session.loggedIn){
		Post.find({}, (err, foundPosts) => {
			if (err) {
				next(err)
			} else res.status(200).json(foundPosts)
		})
	} else {
		res.json({
			data: "not signed in"
		});
	}
});


module.exports = router;