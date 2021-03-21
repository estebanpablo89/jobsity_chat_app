const User = require('../models/User');
const asyncHandler = require('../middleware/async');

exports.login = (req, res) => {
  res.render('login');
};

exports.register = (req, res) => {
  res.render('register');
};

exports.createUser = asyncHandler(async (req, res, next) => {
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
    const user = await User.create(req.body);
    res.send('pass');
  }
});
