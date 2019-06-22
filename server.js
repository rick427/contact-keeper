const express = require('express');
const Users = require('./routes/users');
const Auth = require('./routes/auth');
const Contacts = require('./routes/contacts');
const connectDB = require('./config/db');

connectDB();

const app = express();

//init req.body middleware
app.use(express.json({extended: false}));

//define routes
app.use('/api/users', Users);
app.use('/api/contacts', Contacts);
app.use('/api/auth', Auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));