const { Recipe, Diet, diet_recipe } = require("../db");

const { getFakeRecipeById, getFakeRecipes } = require("../../fakeApi/fakeApi");

//? Trae la info de la API
const getApiRecipes = async () => {
  const data = getFakeRecipes();

  const response = data.results.map((r) => {
    return {
      vegetarian: r.vegetarian,
      glutenFree: r.glutenFree,
      vegan: r.vegan,
      id: r.id,
      name: r.title,
      image: r.image,
      summary: r.summary,
      healthScore: r.healthScore,
      preparation: r.analyzedInstructions.map((s) => {
        return s.steps.map((s) => {
          return s.step;
        });
      }),
      diets: r.diets,
    };
  });
  return response;
};
//? Trae la info de la DB
const getDbRecipes = async () => {
  const result = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  for (let i = 0; i < result.length; i++) {
    const diets = result[i].diets.map((d) => d.name);
    result[i] = { ...result[i].toJSON(), diets };
  }
  return result;
};

//? junta la info de la API y la DB
const getAllRecipes = async () => {
  const apiData = await getApiRecipes();
  const dbData = await getDbRecipes();
  return [...dbData, ...apiData];
};

//? Trae la info por ID
const getIdDb = async (id) => {
  let result = await Recipe.findOne({
    where: { id },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  console.log(result);
  const diets = result.diets.map((diet) => diet.name);

  return {
    ...result.toJSON(),
    diets,
  };
};

//? Trae la info del nombre de la receta
const getRecipeByName = async (name) => {
  const allData = await getAllRecipes();

  const searchData = allData.filter((r) => {
    return r.name.toLowerCase().includes(name.toLowerCase());
  });

  if (searchData[0] !== undefined) {
    return searchData;
  } else {
    return [];
  }
};

//? Trae por ID la API
const getIdApi = async (id) => {
  //& //////////////////
  // const data = (
  //   await axios.get(
  //     `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}${RECIPE_EXT}&number=100`
  //   )
  // ).data;
  // console.log(data);
  //& //////////////////
  const data = getFakeRecipeById(id);

  const response = {
    id: data.id,
    name: data.title,
    image: data.image,
    summary: data.summary,
    healthScore: data.healthScore,
    preparation: data.analyzedInstructions.map((s) => {
      return s.steps.map((s) => {
        return s.step;
      });
    }),
    diets: data.diets,
  };

  return response;
};

//? RECIPE BY ID //
const getRecipeById = async (id) => {
  console.log(parseInt(id));

  if (isNaN(id)) {
    return getIdDb(id);
  } else {
    return getIdApi(id);
  }
};

//? CREATE RECIPE //
const postRecipe = async (
  name,
  image,
  summary,
  healthScore,
  preparation,
  diets
) => {
  const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    preparation,
  });

  diets.forEach(async (e) => {
    const dbDiets = await Diet.findOne({ where: { name: e } });

    await newRecipe.addDiet(dbDiets);
  });

  return newRecipe;
};

module.exports = {
  getAllRecipes,
  getRecipeByName,
  getRecipeById,
  postRecipe,
  // filterRecipeByDiet,
  getDbRecipes,
};
// const getApiRecipes = async () => {
//   console.log(API_KEY, API_URL, RECIPE_EXT);
//   const data = await axios.get(`${API_URL}?apiKey=${API_KEY}$`);
//   return data.data.results;
// };
