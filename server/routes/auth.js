import express from "express";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/index";

// controllers
import {
  register,
  login,
  currentUser,
  forgotPassword,
  ProfileUpdate,
  findPeople,
  addFollower,
  userFollow,
  userFollowing,
  removeFollower,
  userUnfollow,
  searchUser,
  getUser,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignin, ProfileUpdate);
router.get("/find-people", requireSignin, findPeople);

router.put("/user-follow", requireSignin, addFollower, userFollow);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);
router.get("/user-following", requireSignin, userFollowing);

router.get("/search-user/:query", searchUser);
router.get("/user/:username", getUser);

router.get("/current-admin", requireSignin, isAdmin, currentUser);

module.exports = router;
