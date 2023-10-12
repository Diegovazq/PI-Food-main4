const {Router}= require ("express");

const {getAllDietHandler}= require("../Handlers/dietHandler");

const dietRouter= Router();

dietRouter.get("/",getAllDietHandler);

module.exports=dietRouter;