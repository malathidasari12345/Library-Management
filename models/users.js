const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
         type: String,
          required: true 
        },
    email: {
         type: String, 
         required: true, 
         unique: true 
        },
    password: {
         type: String, 
         required: true
         },
    role: {
         type: String,
         enum: ['Admin', 'Member'],
         default :"Member"
        }
});

module.exports = mongoose.model('User', usersSchema);
