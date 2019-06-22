const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// desc     Get all users contacts
// access   private
router.get('/', auth, async (req, res) => {
    try {
       const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
       res.json(contacts);
    }
    catch(err) {
        console.error(err.messgae);
        res.status(500).send("Server Error");
    }
});


// @route   POST api/contact
// desc     Add new contact
// access   private
router.post('/', (req, res) => res.send("Add contact"));


// @route   PUT api/contacts/:id
// desc     Update contact
// access   private
router.put('/:id', (req, res) => res.send("update contact"));

// @route   POST api/contacts/:id
// desc     delete contacts
// access   public
router.delete('/:id', (req, res) => res.send("delete contatcs"));

module.exports = router;