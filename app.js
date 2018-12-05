const port = 5000;
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
}); //require('http').Server(app);
const io = require('socket.io').listen(server);
const fs = require('fs');
//const css = fs.readFileSync('dist/ledesma.css').toString();

const {getPerTeamPage} = require('./routes/perteam');
const {getWelcomePage, getPausePage, getFinishPage} = require('./routes/static');
const {getGlobalPage} = require('./routes/global');
const {getCompanyResultPage} = require('./routes/company');
const {getSetPage} = require('./routes/set');


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'ledesma',
  password: 'azucar',
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
global.css = fs.readFileSync('dist/ledesma.css').toString();;

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

app.get('/company/:company', getPerTeamPage);
app.get('/company/:company/result', getCompanyResultPage);

app.get('/set', getSetPage);

// set the app to listen on the port

io.on('connection', function(socket){
  /**
   * Join Room
   */
  socket.on('change', function(data){
    io.emit('change', data.page);
  });

  socket.on('refresh', function(data){
    io.emit('refresh', data.id);
  });
});
