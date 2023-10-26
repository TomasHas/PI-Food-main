import React, { useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import { getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FormCopy from "./Form copy";

function Form() {
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

  useEffect(() => {
    console.log("formerrors", formErrors);
    if (initialLoad.current === false) {
      console.log("initialLoad.current", initialLoad.current);

      if (!Object.keys(formErrors).length > 0) {
        setShowSubmit(false);
      }
    }
    console.log(formValues);
  }, [formErrors]);

  useEffect(() => {
    dispatch(getDiets());

    setFormErrors(validateForm(formValues));
    initialLoad.current = false;
  }, []);

  const handleSelectDiets = (e) => {
    console.log("handleselectdiets", e.target.value);
    // const option = e.target.value.toLowerCase();

    setformValues({
      ...formValues,
      // diets: [...formValues.diets, option],
      diets: [...formValues.diets, e.target.value.toLowerCase()],
      // optionDiet: "",
    });

    setFormErrors(
      validateForm({
        ...formValues,
        // diets: [...formValues.diets, option],
        diets: [...formValues.diets, e.target.value.toLowerCase()],
      })
    );
  };

  const handlePrepClick = (e) => {
    e.preventDefault();
    const step = formValues.inputPrep;
    setformValues({
      ...formValues,
      preparation: [...formValues.preparation, step],
      inputPrep: "",
    });

    setFormErrors(
      validateForm({
        ...formValues,
        preparation: [...formValues.preparation, step],
      })
    );
  };

  const validateForm = (values) => {
    // console.log("validate", values);
    const errors = {};

    if (!values.name) {
      errors.name = "Recipe name is required";
    } else if (!/^[a-zA-Z]+$/.test(values.name)) {
      // console.log("errors.name", values.name);
      errors.name = "Recipe name cannot have numbers";
    }

    if (!values.healthScore) {
      errors.healthScore = "Recipe health score is required";
    } else if (!typeof values.healthScore === "number") {
      errors.healthScore = "Health Score must be a number";
      // } else if (/^([1-9][0-9]?|100|0)$/.test(values.healthScore)) {
    } else if (values.healthScore < 0 || values.healthScore > 100) {
      errors.healthScore = "Must be between 0 - 100";
    }

    if (values.preparation.length <= 0) {
      // console.log("prep length", values.preparation.length);
      errors.preparation = "Recipe preparation is required";
    } else if (values.preparation.length <= 1) {
      errors.preparation = "Must have at least 2 Steps";
    }

    if (!values.summary) {
      errors.summary = "Recipe summary is required";
    }

    if (!values.image) {
      errors.image = "Recipe image name is required";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(values.image)
    ) {
      errors.image = "Must any of these formats jpg|jpeg|png|webp|avif|gif|svg";
    }

    if (!values.diets.length > 0) {
      errors.diets = "Type of diet is required";
    } else if ([...values.diets].includes(formValues.optionDiet)) {
      console.log("  diets validtion", values.diets);
      // console.log("  diets option", formValues.optionDiet);

      errors.diets = "Diet already selected";
    }

    return errors;
  };
  console.log(formErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
    // setIsSubmit(true);

    console.log("submitted");
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        formValues
      );

      alert("Recipe created!!");
    } catch (error) {
      alert("recipe fail");
    }

    setformValues({
      name: "",
      healthScore: 0,
      summary: "",
      inputPrep: "",
      preparation: [],
      image: "",
      diets: [],
    });
  };

  const onChange = (e) => {
    e.preventDefault();

    setformValues({
      ...formValues,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    setFormErrors(
      validateForm({ ...formValues, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className={styles.container}>
      <FormCopy />
      <form onSubmit={handleSubmit}>
        <h1> Create Recipe</h1>{" "}
        {/* ////////////////////////////////////&     NAME             */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Recipe Name </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Recipe name"
            name="name"
            value={formValues.name}
            onChange={onChange}
          ></input>
          <p> {formErrors.name}</p>
        </div>
        {/* ////////////////////////////////////&    HEALTH SCORE              */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Health score </label>
          <input
            className={styles.input}
            placeholder="HealthScore"
            name="healthScore"
            type="number"
            value={formValues.healthScore}
            onChange={onChange}
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
            value={formValues.summary}
            onChange={onChange}
          ></input>
          <p> {formErrors.summary}</p>{" "}
        </div>
        {/* ////////////////////////////////////&     PREP STEPS              */}
        <div className={styles.labelInput}>
          <label className={styles.label}>Preparation Steps </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Preparation Steps"
            name="inputPrep"
            value={formValues.inputPrep}
            // multiple={false}
            onChange={onChange}
          ></input>
          <div> {formValues.preparation.map((s) => s)} </div>
          <p> {formErrors.preparation}</p>{" "}
          <button
            className={styles.stepsButton}
            onClick={handlePrepClick}
            type="text"
          >
            {" "}
            Add Step{" "}
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
            value={formValues.image}
            onChange={onChange}
          ></input>{" "}
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
          disabled={showSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default Form;
