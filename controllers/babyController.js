const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Baby = require('../models/baby')

router.post('/new', async (req, res, next) => {
	try {

		const currentUser = await User.findById(req.session.userDbId);
		thisBaby = new Baby({
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

router.get('/', (req, res, next) => {
	if (req.session.loggedIn) {
		Baby.find({}, (err, foundBabies) => {
			if(err){
				res.send(err);
			} else {
				res.status(200).json(foundBabies)
			}
		})
	} else {
		res.json({
			data: "not signed in"
		})
	}
});

router.put('/:id', (req,res) => {
	Baby.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBaby) => {
		User.findOne({'baby': req.params.id}, (err, foundUser) => {
			if(foundUser._id.toString() !== req.body.userId){

			}
		})
	})
})



module.exports = router;