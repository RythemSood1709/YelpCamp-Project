const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utils/catchAsync");
const multer=require('multer');
const {storage}= require('../cloudinary')

const upload=multer({
  storage,
  limits: {files: 10}
})


const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNew));


router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post("/search", campgrounds.search)

router
  .route("/:id")
  .get(catchAsync(campgrounds.show))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.edit))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editForm));

module.exports = router;
