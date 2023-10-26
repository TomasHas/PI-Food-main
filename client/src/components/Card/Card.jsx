import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        {" "}
        <img className={styles.img} src={props.image} alt={props.name} />{" "}
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{props.name}</h2>
      </div>
      {/* <div></div> */}

      <div className={styles.dietsContainer}>
        <div>
          <h4 className={styles.dietsTitle}>DIETS </h4>
        </div>
        <div>
          {props.diets.map((d, i) => (
            <li key={i} className={styles.li}>
              {d}
            </li>
          ))}
        </div>
      </div>
      <div className={styles.moreDetails}>
        <Link to={`/recipes/${props.id}`}>More Details</Link>
      </div>
    </div>
  );
}
