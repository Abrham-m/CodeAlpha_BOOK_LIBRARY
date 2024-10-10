const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const mongoose = require("mongoose");

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new book
router.post("/books", async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single book
router.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const retrievedBook = await Book.findById(bookId);
    if (!retrievedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(retrievedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book
router.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book
router.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
