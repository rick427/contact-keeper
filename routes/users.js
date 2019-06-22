const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// desc     Register a user
// access   public
router.post('/', [
    check('name', 'A name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err: errors.array()})
    }
    res.send('passed');
});

module.exports = router;