const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Name = require('../models/name');

router.post('/new', async (req, res, next) => {
	try {
		const currentUser = await User.findById(req.session.userDbId);
		const thisName = new Name({
			name: req.body.name
		});
		await thisName.save();
		currentUser.name.push(thisName);
		await currentUser.save();
		res.status(200).json(thisName);
	} catch (err){
		next(err)
	}
})

router.get('/', async (req, res, next) => {
	if(req.session.loggedIn){
		Name.find({}, (err, foundNames) => {
			if (err) {
				next(err)
			} else res.status(200).json(foundNames)
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
			const foundName = await Name.findById(req.params.id);
			res.status(200).json(foundName);
		}
	} catch (err){
		next(err);
	}
});

router.put('/:id', (req,res) => {
	if (req.session.loggedIn) {
		Name.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedName) => {
			res.status(200).json(updatedName);
		})
	}
});

router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const deletedName = await Name.findByIdAndRemove(req.params.id);
			res.status(200).json('deleted: ' + deletedName);
		} catch (err){
			next(err)
		}
	}
});

module.exports = router;