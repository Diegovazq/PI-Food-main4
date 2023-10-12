const {Router}= require("express");

const {  getAllRecipesHandler,
    getRecipeByIdHandler,
    getRecipeByNameHandler,
    getCreateRecipeHandler,}= require("../Handlers/recipeHandler");

const recipeRouter= Router();

recipeRouter.get("/",getAllRecipesHandler);

recipeRouter.get("/name",getRecipeByNameHandler );

recipeRouter.get("/:id",getRecipeByIdHandler );

recipeRouter.post("/create",getCreateRecipeHandler);

module.exports=recipeRouter;