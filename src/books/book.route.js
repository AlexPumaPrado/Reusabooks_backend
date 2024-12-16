const express = require("express");
const Book = require("./book.model");
const router = express.Router();
const { cloudinary, upload } = require("../utils/cloudinary");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");
//const verifyAdminToken = require("../middleware/verifyAdminToken");

//frontend => baackend server =>controller=>book schema=>database=>server=>frontend

//post book
router.post("/create-book", upload.single("coverImage"), async (req, res) => {
  const { title, description, category, Price } = req.body;
  const file = req.file;
  try {
    if (file) {
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        folder: "reusabooks",
      });
      if (uploadRes) {
        const book = new Book({
          title,
          description,
          category,
          coverImage: uploadRes.secure_url,
          Price,
        });
        const savedProduct = await book.save();
        res.status(200).json(savedProduct);
      }
    } else {
      res.status(400).send("No se envió una imagen.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al procesar la solicitud.");
  }
});

//get all books
router.get("/", getAllBooks);

//get one book
router.get("/:id", getSingleBook);

//update a book endpoint
router.put("/edit/:id", UpdateBook);

//delete book
router.delete("/:id", deleteABook);

module.exports = router;
