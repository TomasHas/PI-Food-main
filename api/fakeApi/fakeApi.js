const recipes = require("./spoonacular.json");

function getFakeRecipeById(id) {
  const recipeFound = recipes.results.find(
    (recipe) => recipe.id === parseInt(id)
  );
  if (recipeFound) return recipeFound;
  return null;
}

function getFakeRecipes() {
  return recipes;
}

module.exports = { getFakeRecipeById, getFakeRecipes };
