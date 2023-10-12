const {
    recipeDetailById,
    recipeByName,
    createRecipe,
    getApiInfo,
    getDBInfo,
  } = require ("../controllers/recipeController");
  
  const getRecipeByIdHandler = async (req, res) => {
    try {

      const { id } = req.params;
      const recipe = await recipeDetailById(id);

       console.log("Se obtuvo con éxito.");
      res.status(200).json({ data: recipe });

    } catch (error) {

      console.log("Error en getRecipeByIdHandler:", error);
      res.status(404).json({ error: "Recipe not found" });
    }
  };
  

  const getRecipeByNameHandler = async (req, res) => {
    try {
      const { name, title } = req.query;
      const recipe = await recipeByName(name, title);
  
      res.status(200).json({ message: "Se obtuvieron con éxito.", data: recipe });
    } catch (error) {
      console.log("error:", error);
      res.status(404).json({ error: "Recipe not found" });
    }
  };
  
  const getCreateRecipeHandler = async (req, res) => {
    const { name, image, dishSummary, healthScore, steps, diets } = req.body;
  
    try {
      if (!name || !image || !dishSummary || !healthScore || !steps || !diets || !title) {
        throw new Error("Missing important data");
      }
  
      const recipeData = {
        name,
        title,
        image,
        dishSummary,
        healthScore,
        steps,
        createdInDb: true,
      };
  
      const newRecipe = await createRecipe(recipeData);

      res.status(201).json({ message: "Recipe created successfully", data: newRecipe });
    } catch (error) {

        console.log("error:",error);
      res.status(400).json({ error: error.message });
    }
  };


  const getAllRecipesHandler = async (req, res) => {
    const { title } = req.query;
  
    try {
      if (!title) {
        // Si no hay parámetro "title", obtener todas las recetas
        const totalApiRecipes = await getApiInfo();
        const totalDbRecipes = await getDBInfo();   
        const totalRecipes = [...totalApiRecipes, ...totalDbRecipes];
  
        console.log("Se obtuvieron todas las recetas con éxito.");
        return res.status(200).json(totalRecipes);
      } else {
        // Si hay un parámetro "title", filtrar recetas por título en la base de datos y en la API
        const titleFilteredDB = await getDBInfo();
        const titleFilteredAPI = await getApiInfo();
  
        const filteredRecipesDB = titleFilteredDB.filter((recipe) =>
          recipe.title.toLowerCase().includes(title.toLowerCase())
        );
        const filteredRecipesAPI = titleFilteredAPI.filter((recipe) =>
          recipe.title.toLowerCase().includes(title.toLowerCase())
        );
  
        const filteredRecipes = [...filteredRecipesDB, ...filteredRecipesAPI];
  
        if (filteredRecipes.length === 0) {
          return res.status(404).json({ error: "Recipe not found" });
        }
  
        return res.status(200).json(filteredRecipes);
      }
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
    

  module.exports = {
    getRecipeByIdHandler,   
    getRecipeByNameHandler,
    getCreateRecipeHandler,
    getAllRecipesHandler,
  };