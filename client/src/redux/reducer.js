import axios from "axios";

const {
  GET_RECIPES,
  GET_DIETS,
  GET_DETAIL_BY_ID,

  DYNAMIC_SEARCH_NAME,

  GET_FILTERED_RECIPES,
} = require("./actions");

const initialState = {
  allRecipes: [],
  recipes: [],
  recipeDetail: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, allRecipes: action.payload };
    case GET_DIETS:
      return { ...state, diets: action.payload };
    case GET_DETAIL_BY_ID:
      return { ...state, recipeDetail: action.payload };

    // case GET_RECIPE_BY_NAME:
    //   return { ...state, recipes: action.payload };

    case GET_FILTERED_RECIPES:
      const filterRecipes = () => {
        let result = action.payload.recipes;

        if (action.payload.filterPanel.alphabet === "az") {
          result = result.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        } else if (action.payload.filterPanel.alphabet === "za") {
          result = result.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        }

        if (action.payload.filterPanel.source === "db") {
          result = result.filter((r) => isNaN(r.id))
            ? result.filter((r) => isNaN(r.id))
            : alert("database is empty");

          console.log(result);
        } else if (action.payload.filterPanel.source === "api") {
          result = result.filter((r) => !isNaN(r.id));
        } else {
          result = action.payload.recipes;
        }

        if (action.payload.filterPanel.score === "low") {
          result = result.sort((a, b) => a.healthScore - b.healthScore);
        } else if (action.payload.filterPanel.score === "high") {
          result = result.sort((a, b) => b.healthScore - a.healthScore);
        }

        if (action.payload.filterPanel.diets !== "none") {
          console.log(
            "action.filterPanel.diets",
            action.payload.filterPanel.diets
          );
          result = result.filter((d) =>
            d.diets.includes(action.payload.filterPanel.diets)
          );
        }
        console.log("result", result, action.payload.filterPanel.diets);
        return result;
      };
      return { ...state, recipes: filterRecipes() };

    default:
      return { ...state };
  }
};

export default rootReducer;
