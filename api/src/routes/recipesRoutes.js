const { Router } = require("express");
const {
  getRecipes,
  getById,
  createRecipe,
  getByDiet,
} = require("../handlers/recipesHandler");

const recipesRouter = Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/:idRecipe", getById);
recipesRouter.post("/", createRecipe);
// recipesRouter.get("/dietTypes", getByDiet);

module.exports = recipesRouter;
