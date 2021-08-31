const router = require("express").Router();
const recipeController = require("../controllers/recipeController");
const messageController = require("../controllers/messageController");
const auth = require("../middleware");

router.post("/", auth, recipeController.save);
router.delete("/:id", auth, recipeController.remove);
router.get("/", recipeController.get);
router.post("/:id/message", auth, messageController.save);
router.get("/:id/message", auth, messageController.get);

module.exports = router;