const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route   POST api/users
// desc     Register a user
// access   public
router.post('/', [
    check('name', 'A name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})

], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({err: errors.array()})
    }
    
    const {name,email, password} = req.body;

    try {
      let user = await User.findOne({email});

      if(user){
          res.status(400).json({err: 'User already exists'});
      }

      user = new User({
        name,
        email,
        password
      });

      // hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      
      //create token 
      const payload = {user: {id: user.id}};

      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 7200
      }, (err, token) => {
          if(err) throw err;
          res.json({token})
      });

    }
    catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;