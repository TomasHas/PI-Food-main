import { React, useEffect, useState } from "react";
import styles from "./navBar.module.css";

import { useDispatch } from "react-redux";
import { getFilteredRecipes } from "../../redux/actions";
import { NavLink } from "react-router-dom";
// import FilterName from "./filters/FilterName";

// import { getRecipes } from "../../redux/actions";
import FilterOptions from "./sorts/FilterOptions";

function NavBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getRecipes());
    // dispatch(getFilteredRecipes());
  }, [dispatch]);

  return (
    <div className={styles.NavBar}>
      <div className={styles.leftSide}>
        <div className={styles.links} id="hidden">
          <NavLink className={styles.homeButton} to="/home">
            Home
          </NavLink>
          <NavLink className={styles.homeButton} to="/form">
            Create Recipe
          </NavLink>
          <div>
            {" "}
            <FilterOptions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
