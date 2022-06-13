const express = require("express");
const router = express.Router();

// controllers
const { uploadImage, userProfile, addUser } = require("../controllers/users");

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});

router.post("/users", addUser);
router.post("/upload-image", uploadImage);
router.get("/user-profile/:userId", userProfile);
module.exports = router;
