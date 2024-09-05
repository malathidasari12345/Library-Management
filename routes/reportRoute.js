const express = require('express');
const router = express.Router();
const {
    getMostBorrowedBooks,
    getActiveMembers,
    getBookAvailability
} = require('../controllers/report');


router.get('/book-availability',   getBookAvailability);

module.exports = router;
