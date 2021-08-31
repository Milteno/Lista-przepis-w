const router = require("express").Router();
const authRoutes = require("./auth");
const recipeRoutes = require("./recipe");
const path = require("path");

router.use("/auth", authRoutes);
router.use("/recipe", recipeRoutes);

router.use("/uploads/:name", (req, res) => res.sendFile(path.join(__dirname, "../uploads/" + req.params.name)));
router.use("*", (req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));

module.exports = router;