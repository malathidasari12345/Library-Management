const Book = require('../models/books');
const Borrow = require('../models/borrow');

// Book Availability Report
const getBookAvailability = async (req, res) => {
  try {
    const books = await Book.find(
      { totalcopies: { $exists: true } },
      { _id: 1, title: 1, availablecopies: 1, totalcopies: 1 }
    );

    const totalBooks = books.map((book) => {
      const borrowedCopies = book.totalcopies - book.availablecopies; 
      return {
        id: book._id,
        title: book.title,
        borrowedCopies: borrowedCopies,
        totalCopies: book.totalcopies,
        availableCopies: book.availablecopies,
      };
    });

    console.log(totalBooks);
    res.json(totalBooks); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getBookAvailability
};
