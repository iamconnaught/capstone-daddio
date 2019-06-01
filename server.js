require('dotenv').config();

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session');
const bcrypt 		 = require('bcryptjs')
const methodOverride = require('method-override')
const superagent 	 = require('superagent')


require('./db/db');

