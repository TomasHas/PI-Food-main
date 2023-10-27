import React from "react";
import styles from "./landing.module.css";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.bg}>
      {" "}
      <div className={styles.title}>
        <h1 className={styles.h1}>Food App</h1>{" "}
      </div>
      {/* <div className={styles.bg}></div> */}
      <Link to="/home">
        <button className={styles.button}>PRESS HERE</button>
      </Link>
    </div>
  );
};

export default Landing;
