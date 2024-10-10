const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  borrowed: { type: Boolean, default: false },
  borrowedDate: Date,
  returnDate: Date
});

module.exports = mongoose.model('Book', bookSchema);
