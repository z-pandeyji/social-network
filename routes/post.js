import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import {
  requireSignin,
  canEditDeletePost,
  isAdmin,
} from "../middlewares/index";

// controllers
import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletepost,
  newsFeed,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  totalposts,
  posts,
  getPost,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
// posts
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletepost
);

router.get("/news-feed/:page", requireSignin, newsFeed);

router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);

router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);

router.get("/total-posts", totalposts);

router.get("/posts", posts);

router.get("/post/:_id", getPost);

// admin
router.delete("/admin/delete-post/:_id", requireSignin, isAdmin, deletepost);

module.exports = router;
