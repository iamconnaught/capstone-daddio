const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/Task');

router.post('/new', async (req, res, next) => {
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
});

router.get('/', async (req, res, next) => {
	if(req.session.loggedIn){
		Task.find({}, (err, foundTasks) => {
			if (err) {
				next(err)
			} else res.status(200).json(foundTasks)
		})
	} else {
		res.json({
			data: "not signed in"
		});
	}
});



module.exports = router;