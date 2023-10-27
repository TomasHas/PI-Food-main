const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const fakeApi = require("../../fakeApi/fakeApi");

const router = Router();

const dietsRouter = require("./dietsRoutes");
const recipesRouter = require("./recipesRoutes");

router.use("/diets", dietsRouter);
router.use("/recipes", recipesRouter);

// fakeApi.use("/diets", dietsRouter);
// fakeApi.use("/recipes", recipesRouter);

module.exports = router;
// module.exports = fakeApi;
