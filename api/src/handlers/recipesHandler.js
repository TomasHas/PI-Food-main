const {
  getAllRecipes,
  getRecipeByName,
  getRecipeById,
  postRecipe,
  filterRecipeByDiet,
  getDbRecipes,
} = require("../controllers/recipesController");

const getRecipes = async (req, res) => {
  const { name } = req.query;
  // const allRecipes = getAllRecipes()
  //   .then((response) => {
  //     return res.status(200).send(response);
  //   })
  //   .catch((error) => {
  //     return res.status(400).json({ message: error.message });
  //   });

  try {
    const allRecipes = await getAllRecipes();

    if (!name) {
      return res.status(200).send(allRecipes);
    } else {
      try {
        const recipeName = await getRecipeByName(name);
        return res.status(200).send(recipeName);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { idRecipe } = req.params;

  try {
    const byId = await getRecipeById(idRecipe);

    res.status(200).send(byId);
  } catch (error) {
    // res.status(400).send(error)
    res.status(400).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  const { name, image, summary, healthScore, preparation, diets } = req.body;

  try {
    const newRecipe = await postRecipe(
      name,
      image,
      summary,
      healthScore,
      preparation,
      diets
    );
    // console.log(newRecipe);
    return res.status(200).send(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getRecipes, getById, createRecipe };
