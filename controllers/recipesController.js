const knex = require("knex")(require("../knexfile"));

const scoreWord = (word, pattern) => {
  if (RegExp(`^${pattern}$`).test(word)) return 3;

  if (RegExp(pattern).test(word)) return 1;

  return 0;
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await knex("recipes");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).send(`Failed to retrieve data: ${error}`);
  }
};

const searchRecipes = async (req, res) => {
  const query = knex("recipes");

  const terms = req.body.search
    .toLowerCase()
    .split(" ")
    .filter((term) => term !== "");

  const termsAsRegex = `(${terms.join("|")})`;

  terms.forEach((term) => {
    query.orWhere("recipeTitle", "like", `%${term}%`);
    query.orWhere("recipeTags", "like", `%${term}%`);
  });

  try {
    let recipes = await query.select("*");

    recipes = recipes
      .map((recipe) => {
        let score = 0;
        recipe.recipeTitle.split(" ").forEach((word) => {
          score += scoreWord(word, termsAsRegex);
        });
        recipe.recipeTags.split(" ").forEach((tag) => {
          score += scoreWord(tag, termsAsRegex);
        });

        recipe.score = score;

        return recipe;
      })
      .sort((a, b) => {
        return b.score - a.score;
      });

    res.json(recipes);
  } catch (error) {
    res.status(400).send(`Failed to retrieve data: ${error}`);
  }
};

const getRecipeById = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await knex("recipes").where("id", id);
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(`Failed to retrieve data: ${error}`);
  }
};

module.exports = {
  getAllRecipes,
  searchRecipes,
  getRecipeById,
};
