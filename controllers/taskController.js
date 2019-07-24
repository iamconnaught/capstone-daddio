const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');

router.post('/new', async (req, res, next) => {
	if(req.session.loggedIn){
		try {
			const currentUser = await User.findById(req.session.userDbId);
			const thisTask = new Task({
				title: req.body.title,
				details: req.body.details,
				isCompleted: req.body.isCompleted,
				ownerId: currentUser._id
			})

			await thisTask.save();
			currentUser.task.push(thisTask);
			await currentUser.save();
			res.status(200).json(thisTask);
		} catch (err){
			next(err)
		}
	} else {
		res.json({
			data: "not signed in"
		});
	}
});

router.get('/', async (req, res, next) => {
	if(req.session.loggedIn){
		const foundTask = await Task.find({ownerId: req.session.userDbId});
		res.status(200).json(foundTask)
		
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
			const foundUser = await Task.findById(req.params.id).populate('ownerId')
			const foundTask = await Task.findById(req.params.id);
			res.status(200).json(foundTask);
		}
	} catch (err){
		next(err);
	}
});

router.put('/:id', (req,res) => {

	console.log("you are hitting the put route for task")
	console.log("req.body");
	console.log(req.body);

	if (req.session.loggedIn) {
		Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTask) => {
			res.status(200).json(updatedTask);
		})
	} else {
		res.json({
			data: "not signed in"
		});
	}
});

router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const deletedTask = await Task.findByIdAndRemove(req.params.id);
			res.status(200).json('deleted: ' + deletedTask);
		} catch (err){
			next(err)
		}
	} else {
		res.json({
			data: "not signed in"
		});
	}
})







module.exports = router;