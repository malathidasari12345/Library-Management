const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
         type: String,
          required: true 
        },
    author: { 
        type: String,
         required: true
         },
    ISBN: {
         type: String, 
         required: true, 
         unique: true 
        },
    publicationDate: {
         type: Date,
          required: true 
        },
    genre: { 
        type: String,
         required: true
         },
    totalcopies: { 
        type: Number, 
        required: true 
    },
   availablecopies: { 
        type: Number, 
        required: true 
    },

});

module.exports = mongoose.model('Book', bookSchema);
