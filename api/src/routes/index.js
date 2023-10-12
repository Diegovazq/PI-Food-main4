const { Router } = require('express');

const dietRouter= require ("./dietRouter");
const recipeRouter =require ("./recipeRouter");

const router = Router();

router.use("/diets",dietRouter);

router.use("/recipes",recipeRouter);




module.exports = router;
