const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true
         },
    bookid: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Book', 
         required: true 
        },
     username:{
            type:String
        },
    bookname :{
        type: String
    },
    borrowedAt: {
         type: Date, 
         default: Date.now
         },
    returnedAt: { 
        type: Date
     }
});

module.exports = mongoose.model('Borrow', borrowSchema);
