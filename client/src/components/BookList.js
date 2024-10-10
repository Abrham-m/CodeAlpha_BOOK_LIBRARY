import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/BookStyles.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header-container">
        <h1 className="main-title">Book Library</h1>
        <Link to="/add" className="add-book-link">
          Add New Book
        </Link>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={book.imageUrl || "https://i.ibb.co/DwWKTk2/Book.jpg"}
              alt={book.title}
              className="book-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.ibb.co/DwWKTk2/Book.jpg";
              }}
            />

            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-description">
                {book.description
                  ? book.description.substring(0, 100) + "..."
                  : "No description available"}
              </p>
              <div className="book-actions">
                <Link to={`/edit/${book._id}`} className="edit-button">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
