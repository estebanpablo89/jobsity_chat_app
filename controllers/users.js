const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.login = (req, res) => {
  res.render('login');
};

exports.register = (req, res) => {
  res.render('register');
};

exports.logging = (req, res, next) => {
  global.io.on('connection', socket => {
    socket.join(req.body.room);
  });

  passport.authenticate('local', {
    successRedirect: `/dashboard?room=${req.body.room}`,
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

exports.createUser = asyncHandler(async (req, res, next) => {
  let errors = [];

  const { name, email, password, password2 } = req.body;

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // check passwords match
  if (password2 !== password) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // check pass length
  if (password.length < 3) {
    errors.push({ msg: 'Password should be at least 3 characters' });
  }

  if (errors.length < 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // validation passed
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // user exists
      errors.push({ msg: 'Email is already registered' });
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      try {
        const newUser = await User.create({ name, email, password });
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        );
        res.redirect('/users/login');
      } catch (error) {
        console.log(error);
      }
    }
  }
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
};
