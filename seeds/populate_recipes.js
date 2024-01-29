/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const recipeData = require("../seed_data/recipes");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("recipes").del();
  await knex("recipes").insert(recipeData);
};
