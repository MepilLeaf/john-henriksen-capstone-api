const router = require("express").Router();
const recipesController = require("../controllers/recipesController");

router
  .route("/")
  .get(recipesController.getAllRecipes)
  .post(recipesController.postRecipe);

// recipes/search?search_query=search+terms
router.route("/search").get(recipesController.searchRecipes);

router.route("/:id").get(recipesController.getRecipeById);

module.exports = router;
