const { getApiDiets } = require("../controllers/dietsControllers");

const getAllDiets = async (req, res) => {
  const getDiets = await getApiDiets();

  try {
    res.status(200).send(getDiets);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getAllDiets };
