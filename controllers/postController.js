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
			keywords: req.body.keywords,
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

router.get('/:id', async (req, res, next) => {
	try {
		if (!req.session.loggedIn) {
			res.json({
				data: "not logged in"
			})
		} else {
			const foundPost = await Post.findById(req.params.id);
			res.status(200).json(foundPost);
		}
	} catch (err){
		next(err);
	}
});

router.put('/:id', (req,res) => {
	if (req.session.loggedIn) {
		Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
			res.status(200).json(updatedPost);
		})
	}
});

router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const deletedPost = await Post.findByIdAndRemove(req.params.id);
			res.status(200).json('deleted: ' + deletedPost);
		} catch (err){
			next(err)
		}
	}
})


module.exports = router;