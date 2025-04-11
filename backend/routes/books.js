// backend/routes/books.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const router = express.Router();

const { readJSON, writeJSON } = require("../utils/fileHelpers");

const booksFile = path.join(__dirname, "../data/books.json");

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all books
router.get("/", async (req, res) => {
  const books = await readJSON(booksFile);
  res.json(books);
});

// Add new book
router.post("/", upload.single("coverImage"), async (req, res) => {
  const {
    title,
    author,
    genre,
    location,
    contactEmail,
    contactPhone,
    ownerId,
  } = req.body;

  if (!title || !author || !location || !ownerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const books = await readJSON(booksFile);

  const newBook = {
    id,
    title,
    author,
    genre: genre || "",
    location,
    contactEmail,
    contactPhone,
    ownerId,
    imageUrl,
    isAvailable,
    createdAt: new Date(),
  };

  books.push(newBook);
  await writeJSON(booksFile, books);

  res.status(201).json({ message: "Book listed successfully", book: newBook });
});

// Toggle book status (rented/exchanged)
router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const book = req.body;
  const books = await readJSON(booksFile);
  const updatedBooks = books.map((b) => (b.id === bookId ? book : b));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  await writeJSON(booksFile, updatedBooks);
  res.json({ message: "Status updated", book });
});

// Delete book
router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  let books = await readJSON(booksFile);

  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found", books });

  // Remove image if exists
  if (book.coverImage) {
    const imgPath = path.join(__dirname, "..", book.coverImage);
    if (await fs.pathExists(imgPath)) await fs.remove(imgPath);
  }

  books = books.filter((b) => b.id !== bookId);
  await writeJSON(booksFile, books);

  res.json({ message: "Book deleted successfully" });
});

module.exports = router;
