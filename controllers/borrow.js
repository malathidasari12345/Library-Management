const Borrow = require('../models/borrow');
const Book = require('../models/books');

// Borrow a Book
const borrowBook = async (req, res) => {
    try {
        const { bookid } = req.body;
        console.log(bookid);
        if (!bookid) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required',
            });
        }

        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.availablecopies > 0) {
            const borrow = new Borrow({
                userid: req.user._id,
                bookid: book._id,
                bookname: book.title,
                username: req.user.name,
            });
            book.availablecopies -= 1;
            await book.save();
            await borrow.save();
            return res.status(201).json({
                success: true,
                message: `${book.title} is borrowed by ${req.user.name}`
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No copies available',
            });
        }
    } catch (error) {
        console.error('Error borrowing book:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to borrow book',
            error: error.message,
        });
    }
};

// Return a Borrowed Book
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;
        const borrow = await Borrow.findById(id);
        if (!borrow){
            return res.status(404).json({ 
                success: false,
                 message: 'Borrow record not found' 
        })} 
        const book = await Book.findById(borrow.bookid);
        if (!book){
            return res.status(404).json({ success: false, message: 'Book not found' });
        } 
        borrow.returnedAt = Date.now();
        book.availablecopies += 1;
        await borrow.save();
        await book.save();
        res.json({ success: true, message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to return book', error: error.message });
    }
};

// View Borrowing History
const borrowHistory = async (req, res) => {
    try {
        console.log(req.user);
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }
        const userId = req.user._id;
        console.log(userId);

        // Find all borrows by the userId
        const borrows = await Borrow.find({ userid: userId })
            .populate('bookid', 'title') 
            .populate('userid', 'name'); 

        const history = borrows.map(borrow => ({
            bookName: borrow.bookname,
            username: borrow.username,
            userid: borrow.userid._id,
            bookid: borrow.bookid._id,
            borrowedDate: borrow.borrowedAt,
            returnedDate: borrow.returnedAt
        }));

        return res.json(history);
    } catch (error) {
        console.error('Error fetching borrow history:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get borrow history',
            error: error.message,
        });
    }
};

module.exports = {
    borrowHistory,
    borrowBook,
    returnBook,
};
