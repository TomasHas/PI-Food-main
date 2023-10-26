const axios = require("axios");
const { Diet } = require("../db");
require("dotenv").config();
const { getFakeRecipes } = require("../../fakeApi/fakeApi");

const { API_URL, API_KEY, RECIPE_EXT } = process.env;

const getApiDiets = async () => {
  //&/  API //////////////////////
  // const response = (
  //   await axios.get(`${API_URL}?apiKey=${API_KEY}${RECIPE_EXT}&number=100`)
  // ).data;
  //&/ API //////////////////////

  const response = getFakeRecipes();

  const dietsArr = response.results.map((d) => d.diets).flat();
  const allDiets = [...new Set(dietsArr)];

  const data = allDiets.map((string) => {
    const [name] = string.split(",");
    return { name };
  });

  await Diet.count()
    .then((count) => {
      if (count === 0) {
        data.forEach(async (diet) => {
          await Diet.create(diet);
        });
      } else {
        console.log("DB is not Empty");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const dbDiets = await Diet.findAll();

  return dbDiets;
};

module.exports = { getApiDiets };
