import React from "react";
import { getDetailById } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./detail.module.css";

const Detail = () => {
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const idRecipe = useParams();

  console.log(recipeDetail);
  console.log(idRecipe.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailById(idRecipe.id));
  }, [dispatch, idRecipe]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div>
              <h2 className={styles.recipeNameTitle}>
                {recipeDetail.name?.toUpperCase()}
              </h2>
              <div>
                <img
                  className={styles.img}
                  src={recipeDetail.image}
                  alt={recipeDetail.name}
                />{" "}
              </div>
              <div className={styles.shortInfo}>
                {/* <h4>Name: {recipeDetail.name?.toUpperCase()}</h4> */}
                <div className={styles.HSContainer}>
                  <h4 className={styles.healthScoreTitle}> HealthScore </h4>
                  <div className={styles.healthScoreNumber}>
                    {recipeDetail.healthScore}
                  </div>
                </div>
                <div className={styles.dietsContainer}>
                  <h4 className={styles.dietsTitle}>Diets</h4>
                  <div className={styles.diets}>
                    {recipeDetail.diets?.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.summaryPrepContainer}>
            {/* <div className={styles.summary} >
             
              {recipeDetail.summary?.toLocaleString()}
            </div> */}
            <div className={styles.summary}>
              <h4 className={styles.h4White}>Summary </h4>
              <div dangerouslySetInnerHTML={{ __html: recipeDetail.summary }} />
            </div>

            <div className={styles.prep}>
              <h4 className={styles.h4White}>Preparation </h4>
              {recipeDetail.preparation?.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
