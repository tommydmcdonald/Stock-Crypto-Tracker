const express                 = require('express');
const mongoose                = require('mongoose');
const passport                = require('passport');
const bodyParser              = require('bodyParser');
const LocalStrategy           = require('LocalStrategy');
const passportLocalMongoose   = require('passportLocalMongoose');

const app = express();

app.get('/', (req, res) => {
   res.send('Node.js server');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
