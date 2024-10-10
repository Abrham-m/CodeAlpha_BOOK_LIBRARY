import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/BookStyles.css";

const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "", category: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/books/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch book");
          }
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error("Error fetching book:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:5000/books/${id}`
      : "http://localhost:5000/books";
    const method = id ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error("Failed to save book");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="main-title">Book Library</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={book.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Enter book description"
                rows="4"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="submit-button">
            {id ? "Update" : "Add"} Book
          </button>
        </form>
      )}
    </div>
  );
};
export default BookForm;
