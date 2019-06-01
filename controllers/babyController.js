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
			ownerId: currentUser
		})

		await thisBaby.save();
		currentUser.baby.push(thisBaby);
		await currentUser.save();
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




module.exports = router;