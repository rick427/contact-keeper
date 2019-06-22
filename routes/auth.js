const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route   GET api/auth
// desc     Get logged in user
// access   private
router.get('/', (req, res) => res.send("Get logged in user"));


// @route   POST api/auth
// desc     Auth user and get token
// access   public
router.post('/', [
    check('email', 'Please include a vaild email').isEmail(),
    check('password', 'A password is required').not().isEmpty()

], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err: errors.array()})
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
          return res.status(400).json({err: "User does not exist"})
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
          return res.status(400).json({err: 'Invalid Credentials'})
      }

      //send token 
      const payload = {user: {id: user.id}}

      jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 7200}, (err, token) => {
          if(err) throw err;
          res.json({token});
      })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;