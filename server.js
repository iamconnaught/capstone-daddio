require('dotenv').config();

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session');
const bcrypt 		 = require('bcryptjs');
const methodOverride = require('method-override');
const superagent 	 = require('superagent');


require('./db/db');

//MiddleWare
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const authController = require('./controllers/authController');
app.use('/auth', authController);

app.listen(process.env.PORT, () => {
	console.log('listening on port', process.env.PORT);
})
