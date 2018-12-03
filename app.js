const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getWelcomePage, getPausePage, getFinishPage} = require('./routes/static');
const {getGlobalPage} = require('./routes/global');
const {getCompanyPage, getCompanyResultPage} = require('./routes/company');
const {getSetPage} = require('./routes/set');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'takumi',
  database: 'ledesma'
});

// connect to database
db.connect((err) => {
  if (err) {
  throw err;
}
console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'dist'))); // configure express to use public folder
app.use(express.static( path.join(__dirname, 'js'))); // configure express to use public folder

// routes for the app

app.get('/', getWelcomePage);
app.get('/pause', getPausePage);
app.get('/finish', getFinishPage);
app.get('/global', getGlobalPage);

app.get('/company/:id', getCompanyPage);
app.get('/company/:id/result', getCompanyResultPage);

app.get('/set', getSetPage);
/*
 app.get('/add', addPlayerPage);
 app.get('/edit/:id', editPlayerPage);
 app.get('/delete/:id', deletePlayer);
 app.post('/add', addPlayer);
 app.post('/edit/:id', editPlayer);
 */

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});