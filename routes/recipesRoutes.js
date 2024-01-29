const router = require("express").Router();
const recipesController = require("../controllers/recipesController");

router
  .route("/")
  .get(recipesController.getAllRecipes)
  .post(recipesController.searchRecipes);

module.exports = router;
