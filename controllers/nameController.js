const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Name = require('../models/name');
const superagent = require('superagent');

router.post('/new', async (req, res, next) => {
	if(req.session.loggedIn){
		try {
			console.log("hitting post route for name");
			console.log("req.body:")
			console.log(req.body);
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
	} else {
		res.json({
			data: "not signed in"
		});
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

router.get('/random', (req, res, next) => {
	const apiCall = `https://www.behindthename.com/api/random.json?number=6&key=${process.env.BEHIND_NAME_API}`
	console.log("here is the API Call for random name");
	console.log(apiCall);
	superagent
		.get(apiCall)
		.set('Accept', 'application/json')
		.then((data) => {
			const actualData = JSON.parse(data.text)
			// const justTheDataIWant = actualData.names.map(names => {
			// 	return{
			// 		name: names.name
			// 	}
			// })
			res.status(200).json(actualData)
		})

})

// router.get('/search/behind', (req, res, next) => {
// 	const apiCall = `https://www.behindthename.com/api/lookup.json?name=${req.query.name}&key=${process.env.BEHIND_NAME_API}`
// 	console.log("here is the API Call for behind the name");
// 	console.log(apiCall);
// 	superagent
// 		.get(apiCall)
// 		.set('Accept', 'application/json')
// 		.then((data) => {
// 			const actualData = JSON.parse(data.text)
			
// 			res.status(200).json(actualData)
// 		})

// })

// router.get('/search/related', (req, res, next) => {
// 	const apiCall = `https://www.behindthename.com/api/related.json?name=${req.query.name}&key=${process.env.BEHIND_NAME_API}`
// 	console.log("here is the API Call for related names");
// 	console.log(apiCall);
// 	superagent
// 		.get(apiCall)
// 		.set('Accept', 'application/json')
// 		.then((data) => {
// 			const actualData = JSON.parse(data.text)
		
// 			res.status(200).json(actualData)
// 		})

// })


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
	} else {
		res.json({
			data: "not signed in"
		});
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
	} else {
		res.json({
			data: "not signed in"
		});
	}
});

module.exports = router;