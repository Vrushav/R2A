const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");

const {

    getProfile,

    updateProfile

} = require("../controllers/userController");

router.get("/me", authenticateUser, getProfile);

router.put("/me", authenticateUser, updateProfile);

module.exports = router;