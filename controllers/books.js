const Book = require('../models/books');

// Add Book (Admin)
const addBook = async (req, res) => {
    try {
        const { title, author, ISBN, publicationDate, genre, totalcopies,  availablecopies  } = req.body;
        const book = new Book({
            title,
            author,
            ISBN,
            publicationDate,
            genre,
            totalcopies, 
            availablecopies
        
        });
        await book.save();
        res.status(201).json({success:true,message:"Book added successfully"});
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
};
// Update Book (Admin)
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book){
            return res.status(404).json({ message: 'Book not found' });
        } 
        res.json({ success: true, message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
};  

// Delete Book (Admin)
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book){
            return res.status(404).json({ message: 'Book not found' });
        } 
        res.json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};
// List Books with Pagination and Filtering
const listBooks = async (req, res) => {
    const { page = 1, limit = 10, genre, author } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    const books = await Book.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    const count = await Book.countDocuments(filter);
    res.json({
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    });
};


module.exports = {
  addBook,
  updateBook,
  deleteBook,
  listBooks,
};