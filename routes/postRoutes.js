const express = require('express'); 

const postController = require('../controllers/postController');
const protect = require("./middleware/authMiddleware");

const router = express.Router();


router
.route("/")
.get(postController.getAllPosts)
.post(protect, postController.createPost) 

router
.route("/:id")
.get(protected, postController.getOnePosts)
.patch(protected, postController.updateOnePost)
.delete(protected, postController.deleteOnePost) //



module.exports = router;