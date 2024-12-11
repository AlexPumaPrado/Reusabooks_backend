const express = require("express");
const Book = require("./book.model");
const router = express.Router();
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

//frontend => baackend server =>controller=>book schema=>database=>server=>frontend

//post book
router.post("/create-book", postABook);

//get all books
router.get("/", getAllBooks);

//get one book
router.get("/:id", getSingleBook);

//update a book endpoint
router.put("/edit/:id", UpdateBook);

//delete book
router.delete("/:id", deleteABook);

module.exports = router;
