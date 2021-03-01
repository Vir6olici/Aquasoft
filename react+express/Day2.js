const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('D:/Atom/Projects/nodekb/server/database/connection.js')
///////////////////////////
const PORT = 27017
///////////////////////////
const app = express();

//conecteaza baza de date la server
connectDB();
//incarcare parser in app
app.use(bodyParser());
app.use(cookieParser());
// incarca asseturi

// incarca rute
app.use('/',require('D:/Atom/Projects/nodekb/server/routes/router.js'));
app.use('/sortatejs',require('D:/Atom/Projects/nodekb/server/routes/router.js'));
app.use('/sortateagregate',require('D:/Atom/Projects/nodekb/server/routes/router.js'));


app.listen(PORT, function(){
  console.log('server started on port 3000!');
});
