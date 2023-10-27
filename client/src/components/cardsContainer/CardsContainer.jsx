import React from "react";

import styles from "./cardsContainer.module.css";
import Card from "../Card/Card";

const CardContainer = (props) => {
  if (props.recipes.length === 0)
    return (
      <div className={styles.container}>
        {" "}
        <h1 className={styles.notFound}>No matches found </h1>
      </div>
    );

  return (
    <div className={styles.container}>
      {props.recipes.map((c, i) => {
        return (
          <Card
            key={i}
            id={c.id}
            name={c.name}
            healthScore={c.healthScore}
            summary={c.summary}
            preparation={c.preparation}
            image={c.image}
            diets={c.diets}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
