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
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @route   POST api/contact
// desc     Add new contact
// access   private
router.post('/', [auth, [
    check('name', 'A name is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err: errors.array()});
    }

    const {name, email, phone, type} = req.body;

    try {
       let newContact = new Contact({
           name,
           email,
           phone,
           type,
           user: req.user.id
       })

       const contact = await newContact.save();
       res.json(contact);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }

});


// @route   PUT api/contacts/:id
// desc     Update contact
// access   private
router.put('/:id', auth, async (req, res) => {
    const {name, email, type, phone} = req.body;

    //build contact field
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);
      if(!contact){
          return res.status(404).json({err: 'Contact not found'});
      }

      //make sure user owns contact to be updated
      if(contact.user.toString() !== req.user.id){
          return res.status(401).json({err: 'Unauthorized'});
      }

      contact = await Contact.findByIdAndUpdate(req.params.id, 
        {$set: contactFields}, // set the contacFields described above
        {new: true});          // if the contact doesnt exist, create it

        res.json(contact);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @route   POST api/contacts/:id
// desc     delete contacts
// access   public
router.delete('/:id', auth, async (req, res) => {
    try 
    {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({err: 'Contact not found'});
        }
  
        //make sure user owns contact to be updated
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({err: 'Unauthorized'});
        }
  
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: "Contact Deleted"});
      }
      catch(err){
          console.error(err.message);
          res.status(500).send("Server Error");
      }
});

module.exports = router;