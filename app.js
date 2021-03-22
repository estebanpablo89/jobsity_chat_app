const express = require('express');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// route files
const index = require('./routes/index');
const users = require('./routes/users');
const messages = require('./routes/messages');

// create app variable
const app = express();

//socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
global.io = io;

// passport
require('./config/passport')(passport);

// ejs
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express session
app.use(
  session({
    secret: 'He4SOovxy5',
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// mount routers
app.use('/', index);
app.use('/users', users);
app.use('/messages', messages);

// io.on('connection', () => {
//   console.log('a user connected');
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
