const express = require('express');
const { borrowBook, returnBook, borrowHistory } = require('../controllers/borrow');
const isAuth = require("../middlewares/Auth");
const isMember = require("../middlewares/Member");
const router = express.Router();


router.post('/borrowbook',isAuth, isMember, borrowBook);  
router.put('/return/:id',isAuth, isMember, returnBook);  
router.get('/history',isAuth, isMember, borrowHistory);  

module.exports = router;
