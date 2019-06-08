const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Baby = require('../models/baby')

router.post('/new', async (req, res, next) => {
	try {

		const currentUser = await User.findById(req.session.userDbId);
		const thisBaby = new Baby({
			dateOfBirth: req.body.date,
			name: req.body.name,
			gender: req.body.gender,
			ownerId: currentUser._id
		})

		await thisBaby.save();
		currentUser.baby.push(thisBaby);
		await currentUser.save();
		res.status(200).json({
			data: thisBaby
		})
	} catch (err){
		next(err)
	}
})

router.get('/', async (req, res, next) => {
	if (req.session.loggedIn) {
		const foundBabies = await Baby.find({ownerId: req.session.userDbId});
		res.json({
			status: 200,
			data: foundBabies
		})
	// 	Baby.find({}, (err, foundBabies) => {
	// 		if(err){
	// 			res.send(err);
	// 		} else {
	// 			res.status(200).json(foundBabies)
	// 		}
	// 	})
	// } else {
	// 	res.json({
	// 		data: "not signed in"
	// 	})
	}
});

router.get('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		const foundUser = await Baby.findById(req.params.id).populate('ownerId')
		const baby = await Baby.findById(req.params.id)
		console.log(baby.dateOfBirth);
		res.status(200).json(baby)
	} else {
		res.json({
			data: "not signed in"
		})
	}
})

router.put('/:id', (req,res) => {

	console.log("hitting the update baby route")

	console.log("here are params")
	console.log(req.body)

	if (req.session.loggedIn) {
		Baby.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBaby) => {
			
			console.log("Here is updated baby:")
			console.log(updatedBaby)

			res.status(200).json(updatedBaby);
		})
	}
})

router.delete('/:id', async (req, res, next) => {
	if (req.session.loggedIn) {
		try {
			const deletedBaby = await Baby.findByIdAndRemove(req.params.id);
			res.status(200).json('deleted: ' + deletedBaby)
		} catch (err){
			next(err)
		}
	}
})



module.exports = router;