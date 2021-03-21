const express = require('express');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// route files
const index = require('./routes/index');
const users = require('./routes/users');

// create app variable
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// mount routers
app.use('/', index);
app.use('/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
