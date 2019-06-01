const express = require('express');
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res,next) => {
	const password = req.body.password;
	console.log('password');
	console.log(password);
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	console.log('passwordHash');
	console.log(passwordHash);
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;

	try {
		const createdUser = await User.create(userDbEntry);
		req.session.loggedIn = true;
		req.session.userDbId = createdUser._id;
		console.log("just registered as: ");
		console.log(createdUser);
		console.log("here is session ");
		console.log(req.session);

		res.json({
			status: 200,
			data: createdUser
		})

	} catch (err){
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const foundUser = await User.findOne({'username': req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				req.session.message = '';
				req.session.loggedIn = true;
				req.session.userDbId = foundUser._id;

				console.log('current session');
				console.log(req.session);

				res.json({
					status: 200,
					data: foundUser
				});
			} else {
				req.session.message = "Username or Password Invalid";
			}
		} else {
				req.session.message = "Username or Password Invalid";
			}

	} catch (err){
		res.send(err);
	}
});

router.get('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			next(err)
		} else {
			res.json({
				status: 200,
				data: "logged out"
			});
		}
	});
});


module.exports = router;