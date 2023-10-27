import React, { useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import { getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function FormCopy() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [formValues, setformValues] = useState({
    name: "",
    healthScore: 0,
    summary: "",
    inputPrep: "",
    preparation: [],
    image: "",
    optionDiet: "",
    diets: [],
  });

  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  /* ////////////////////////////////////&        validate Form   */

  const validateForm = (name, value) => {
    // console.log("validate", values);
    console.log("name", name);
    console.log("value", value);
    const errors = {};

    if (name === "name") {
      if (!value) {
        errors.name = "Recipe name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        // console.log("errors.name", values.name);
        errors.name = "Recipe name cannot have numbers";
      } else {
        setformValues({ ...formValues, name: value });
      }
    }

    if (name === "healthScore") {
      if (!value) {
        errors.healthScore = "Recipe health score is required";
      } else if (!typeof valuehScore === "number") {
        errors.healthScore = "Health Score must be a number";
        // } else if (/^([1-9][0-9]?|100|0)$/.test(valuehScore)) {
      } else if (value < 0 || value > 100) {
        errors.healthScore = "Must be between 0 - 100";
      } else {
        setformValues({ ...formValues, healthScore: value });
      }
    }

    if (name === "inputPrep") {
      setformValues({ ...formValues, inputPrep: value });
      if (!value) {
        console.log("3", value.length);
        errors.preparation = "required";
      } else if (formValues.preparation.length < 1) {
        errors.preparation = "more than 2";
      }
    }

    if (name === "summary") {
      if (!value) {
        errors.summary = "Recipe summary is required";
      }
    }

    if (name === "image") {
      if (!value) {
        errors.image = "Recipe image name is required";
      } else if (
        !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value)
      ) {
        errors.image =
          "Must any of these formats jpg | jpeg | png | webp | avif | gif | svg";
      } else {
        setformValues({ ...formValues, image: value });
      }
    }
    // if (!value.length > 0) {
    //   errors.diets = "Type of diet is required";
    // } else if ([...formValues.diets].includes(value)) {
    //   console.log("  diets validtion", value);
    //   // console.log("  diets option", formValues.optionDiet);

    //   errors.diets = "Diet already selected";
    // }

    return errors;
  };

  /* ////////////////////////////////////&    Handle Click diets        */

  const handleSelectDiets = (e) => {
    console.log("handleselectdiets", e.target.value);
    // const option = e.target.value.toLowerCase();
  };

  /* ////////////////////////////////////////////////////////////////////////&    Handle click Preparation  */

  const handlePrepClick = (e) => {
    e.preventDefault();

    const step = formValues.inputPrep;
    console.log("step", step);
    if (step) {
      setformValues({
        ...formValues,
        preparation: [...formValues.preparation, step],
        inputPrep: "",
      });
    }
  };

  /* ////////////////////////////////////&    Handle delete prepartion       */
  const handleClickDelete = (e, i, s) => {
    e.preventDefault();
    console.log("delete index", i);
    const newItems = formValues.preparation.filter((r) => !r.includes(s));
    // const newItems = formValues.preparation.filter((r) => {
    //   console.log(i, [...formValues.preparation].indexOf(r));
    //   return [...formValues.preparation].indexOf(r) !== i;
    // });

    // "sed do eiusmod tempor incididunt ut labore et dolore",

    setformValues({ ...formValues, preparation: newItems });
    console.log(i);
    console.log(s);
    console.log(newItems);
  };

  /* //////////////////////////////////////////////////////////////////////&     Handle Change            */
  const handleChange = (e) => {
    setFormErrors(validateForm(e.target.name, e.target.value));
  };

  /* ////////////////////////////////////////////////////////////////&             Handle Submit           */

  const handleSubmit = async (e) => {};
  console.log("formErrorscopy", formErrors);

  console.log("formCopy", formValues);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1> FormCopy</h1>{" "}
        {/* ////////////////////////////////////////////////////////////////////&     NAME */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Recipe Name </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Recipe name"
            name="name"
            // value={}
            onChange={handleChange}
          ></input>
          <p> {formErrors.name}</p>
        </div>
        {/* ////////////////////////////////////&    HEALTH SCORE */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Health score </label>
          <input
            className={styles.input}
            placeholder="HealthScore"
            name="healthScore"
            type="number"
            // value={formValues.healthScore}
            onChange={handleChange}
          ></input>{" "}
          <p> {formErrors.healthScore}</p>{" "}
        </div>
        {/* ////////////////////////////////////&    SUMMARY             */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Summary </label>
          <input
            className={styles.input}
            placeholder="Summary"
            name="summary"
            // value={formValues.summary}
            onChange={handleChange}
          ></input>
          <p> {formErrors.summary}</p>{" "}
        </div>
        {/* ////////////////////////////////////&     PREP STEPS              */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Preparation Steps </label>
          <input
            className={styles.input}
            placeholder="Preparation Steps"
            // name="preparation"
            name="inputPrep"
            value={formValues.inputPrep}
            onChange={handleChange}
          ></input>
          <div>
            <ul>
              {formValues.preparation.map((s, i) => (
                <li key={i}>
                  {s}
                  <button key={i} onClick={(e) => handleClickDelete(e, i, s)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p> {formErrors.preparation}</p>
          <button
            className={styles.stepsButton}
            onClick={handlePrepClick}
            type="text"
          >
            Add Step
          </button>
        </div>
        {/* ////////////////////////////////////&    IMAGE              */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Image </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Image URL"
            name="image"
            // value={formValues.image}
            onChange={handleChange}
          ></input>
          <p> {formErrors.image}</p>
        </div>
        {/* ////////////////////////////////////&     DIETS            */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Diets </label>
          <select
            type="text"
            className={styles.diets}
            // placeholder="Select Diets"
            name="diets"
            multiple={true}
            value={[formValues.optionDiet]}
            onChange={handleSelectDiets}
          >
            {diets.map((diet) => (
              <option key={diet.id}>{diet.name?.toUpperCase()}</option>
            ))}
          </select>
          <div>
            {" "}
            {formValues.diets.map((d) => (
              <span>{d}</span>
            ))}{" "}
          </div>
          <p> {formErrors.diets}</p>{" "}
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          // disabled={showSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default FormCopy;
