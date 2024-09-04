const express = require('express');
const router = express.Router();
const isAuth = require("../middlewares/Auth");
const isAdmin = require("../middlewares/Admin");

const {
    addBook,
    updateBook,
    deleteBook,
    listBooks,
} = require('../controllers/books');

router.post("/addbook", isAuth, isAdmin, addBook);
router.put("/updatebook/:id", isAuth, isAdmin, updateBook);
router.delete("/deletebook/:id", isAuth, isAdmin, deleteBook);
router.get("/allbooks",isAuth,listBooks)
module.exports = router;
