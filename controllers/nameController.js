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


module.exports = router;