const Book = require('../models/books');
const User = require('../models/users');
const Borrow = require('../models/borrow');

// Most Borrowed Books
const getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowedBooks = await Borrow.aggregate([
      { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 }
    ]);
    const books = await Book.find({ _id: { $in: mostBorrowedBooks.map(b => b._id) } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Active Members
const getActiveMembers = async (req, res) => {
  try {
    const activeMembers = await Borrow.aggregate([
      { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 }
    ]);
    const members = await User.find({ _id: { $in: activeMembers.map(m => m._id) } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book Availability Report
const getBookAvailability = async (req, res) => {
    try {
      // Get all books with their copies using Projection
      // const books = await Book.find({}, { _id: 1, title: 1, availablecopies: 1, totalcopies:1 });
      const books = await Book.find({ totalcopies: { $exists: true } }, { _id: 1, title: 1, availablecopies: 1, totalcopies: 1 });

      // Get borrowed books count
      const borrowedBooks = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalBorrowed: { $sum: 1 },
          },
        },
      ]);
  
      // Map borrowed books by their IDs
      const borrowedBooksMap = borrowedBooks.reduce((map, b) => {
        map[b._id] = b.totalBorrowed;
        return map;
      }, {});
  
      // Calculate the availability for each book
      console.log(books)
      const booksAvailability = books.map(book => {
        console.log(book)
        const borrowedCount = borrowedBooksMap[book._id] || 0;
        const availableCopies = book.availablecopies - borrowedCount;
  
        return {
          id: book._id,
          title: book.title,
          totalCopies: book.totalcopies,
          borrowedCopies: borrowedCount,
          availableCopies: availableCopies,
        };
      });
  
      res.json({ booksAvailability });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
     
module.exports ={
    getMostBorrowedBooks,
    getActiveMembers,
    getBookAvailability
}