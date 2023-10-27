import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const FILTER_BY_NAME_FRONT = "FILTER_BY_NAME_FRONT";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_DIETS = "FILTER_DIETS";
export const GET_DIETS = "GET_DIETS";
export const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
export const GET_FILTERED_RECIPES = "GET_FILTERED_RECIPES";
export const DYNAMIC_SEARCH_NAME = "DYNAMIC_SEARCH_NAME";
// export const FILTER_BY_DIETS = "FILTER_BY_DIETS";

// export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
// export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

export function getRecipes() {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/recipes");
    return dispatch({ type: GET_RECIPES, payload: apiData.data });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/diets");
    return dispatch({ type: GET_DIETS, payload: apiData.data });
  };
}

export function getDetailById(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    // console.log("recipe id", response.data);
    return dispatch({ type: GET_DETAIL_BY_ID, payload: response.data });
  };
}

export function getFilteredRecipes(filters) {
  console.log("action filters", filters);

  return async function (dispacth) {
    let response = [];
    if (filters.name !== "none") {
      response = await axios.get(
        `http://localhost:3001/recipes?name=${filters.name}`
      );

      if (response) {
        dispacth({
          type: GET_FILTERED_RECIPES,
          payload: { recipes: response.data, filterPanel: filters },
        });
      }
    } else {
      response = await axios.get(`http://localhost:3001/recipes`);
      dispacth({
        type: GET_FILTERED_RECIPES,
        payload: {
          recipes: response.data,
          filterPanel: filters,
        },
      });
    }
  };
}

export function dynamicSearchName(name) {
  return function (dispatch) {
    return dispatch({ type: DYNAMIC_SEARCH_NAME, payload: name });
  };
}
