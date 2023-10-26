import { dynamicSearchName, getFilteredRecipes } from "../../../redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./filterOptions.module.css";

export default function FilterOptions() {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const [filterPanel, setFilterPanel] = useState({
    diets: "none",
    alphabet: "none",
    score: "none",
    source: "none",
    name: "none",
  });

  let diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getFilteredRecipes(filterPanel));
  }, [dispatch, filterPanel]);

  function handleClick(e) {
    e.preventDefault();
    setFilterPanel(() => {
      return { ...filterPanel, [e.target.name]: e.target.value };
    });
    dispatch(getFilteredRecipes(filterPanel));
  }

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(dynamicSearchName(e.target.value));

    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      {/* ////////////////////&  by alphabet */}
      <div className={styles.selectContainer}>
        <select
          name="alphabet"
          className={styles.select}
          defaultValue="Filter by Alphabet"
          onChange={(e) => handleClick(e)}
        >
          <option>Filter by Alphabet</option>
          <option key="az" value="az">
            A to Z
          </option>
          <option key="za" value="za">
            Z to AZ
          </option>
        </select>
      </div>
      {/* ////////////////////&  filter diet */}
      <div className={styles.selectContainer}>
        <select
          name="diets"
          className={styles.select}
          defaultValue="Filter by Diet"
          onChange={(e) => handleClick(e)}
        >
          <option>Filter by Diet</option>
          {diets?.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      {/* ////////////////////&  search health Score */}
      <div className={styles.selectContainer}>
        <select
          name="score"
          className={styles.select}
          defaultValue="Order by Health Score"
          onChange={(e) => handleClick(e)}
        >
          <option>Order by Score</option>
          <option key="high" value="high">
            High
          </option>
          <option key="low" value="low">
            Low
          </option>
        </select>
      </div>
      {/* ////////////////////&  filter source */}
      <div className={styles.selectContainer}>
        <select
          name="source"
          className={styles.select}
          defaultValue="Filter by Source"
          onChange={(e) => handleClick(e)}
        >
          <option>Order by Source</option>
          <option key="api" value="api">
            API
          </option>
          <option key="db" value="db">
            Data Base
          </option>
          <option key="all" value="all">
            API & DB
          </option>
        </select>
      </div>
      {/* ////////////////////&  search name */}
      <div className={styles.searchContainer}>
        <input
          value={input}
          className={styles.input}
          onChange={(e) => handleChange(e)}
          placeholder="Search..."
        ></input>
        <button
          name="name"
          value={input}
          type="submit"
          className={styles.button}
          onClick={(e) => handleClick(e)}
        >
          Search Name
        </button>{" "}
      </div>
    </div>
  );
}
