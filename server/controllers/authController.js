const User = require('../models/user');

exports.login = (req, res) => {
    const {email, password} = req.body;

    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).json({error: 'Invalid email or password'});
    }

    const user = new User(email, password);

    req.session.user = user;

    res.json({success: true, user});
};

const isValidEmail = (email) => {
    return true;
  };
  
  const isValidPassword = (password) => {
    return password.length >= 6 && password.length <= 20;
  };