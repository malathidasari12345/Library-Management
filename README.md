# Nalanda Library Management System

## Overview
Nalanda Library Management System is a backend system designed to manage library operations. It includes functionalities for user management, book management, and borrowing system.  This system supports  RESTful  APIs built with Node.js, Express, and MongoDB.

## Tech Stack
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **JWTWEBTOKEN**: JSON Web Tokens for authentication.

## Features

### User Management
- **User Registration**: Users can register with their name, email, and password.
- **User Login**: Users can log in using their email and password.
- **User Roles**: Two roles are supported:
  - **Admin**: Access to all operations.
  - **Member**: Restricted access to certain operations.

### Book Management
- **Add Book**: Admins can add new books with details such as title, author, ISBN, publication date, genre, and number of copies.
- **Update Book**: Admins can update book details.
- **Delete Book**: Admins can delete books from the library.
- **List Books**: All users can view the list of books with pagination and filtering options 

### Borrowing System
- **Borrow Book**: Members can borrow books if available (copies > 0).
- **Return Book**: Members can return borrowed books.
- **Borrow History**: Members can view their borrowing history.

### Reporting
- **Book Availability**: Provide a summary report of book availability, including:
  - Number of available books.
   
## Installation

1. **Clone the repository**:
   git clone https://bitbucket.org/yourusername/nalanda-library-management.git
