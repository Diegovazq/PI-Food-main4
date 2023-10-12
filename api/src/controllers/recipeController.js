const axios = require("axios");
const { Op } = require("sequelize");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;        


const getApiInfo = async () => {  
  
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;
    const apiRecipes = await axios.get(url);
  
    return apiRecipes.data.results;
};


const getDBInfo = async () => {
  
    const allData = await Recipe.findAll({
      where: {
      
        createdInDb: true,
      },
      include: {
        model: Diet,
      },
});

    return allData.map((recipe) => ({
      
        id: recipe.id,
        name: recipe.name,
        title:recipe.title,
        image: recipe.image,
        dishSummary: recipe.dishSummary,
        healthScore: recipe.healthScore,
        steps: recipe.steps,
        diets: recipe.diets.map((diet) => diet.name),
      
    }));
};


const getRecipeByIdFromAPI = async (id) => {

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    const apiRecipe = await axios.get(url);
    return apiRecipe.data;

};


const getRecipeByIdFromDB = async (id) => {
 
    const dbRecipe = await getDBInfo();

    return dbRecipe.find((recipe) => String(recipe.id) === String(id));

};

   
const recipeDetailById = async (id) => {

    console.log(`Buscando receta con ID: ${id}`);

    const [apiRecipe, dbRecipe] = await Promise.all([getRecipeByIdFromAPI(id), getRecipeByIdFromDB(id)]);

    if (!apiRecipe && !dbRecipe) {
      throw new Error(`No se encontró una receta con el ID "${id}"`);
    }

    const result = apiRecipe || dbRecipe;

    console.log(`Resultado de la búsqueda para ID ${id}:`, result);

    return result;
};




const recipeByName = async (name, title) => {
  if (!name && !title) {
    throw new Error("Debe proporcionar un nombre o título de receta válido");
  }
  console.log("recipeByName:",title,name);
  const queryOptions = {};

  if (name) {
    // Consulta a la base de datos para buscar una receta con un nombre similar (insensible a mayúsculas y minúsculas)
    queryOptions.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  if (title) {
    // Consulta a la base de datos para buscar una receta con un título similar (insensible a mayúsculas y minúsculas)
    queryOptions.title = {
      [Op.iLike]: `%${title}%`,
    };
  }

  // Realiza una llamada a la API externa para buscar recetas por nombre o título
  const resultFromAPI = await getDBInfo(name || title);

  // Consulta a la base de datos para buscar recetas que coincidan con los criterios de nombre y/o título
  const resultFromDB = await Recipe.findAll({
    where: queryOptions,
    include: { model: Diet },
  });

  if (!resultFromDB && !resultFromAPI) {
    throw new Error(`No se encontraron recetas con el nombre o título "${name || title}"`);
  }

  const combinedResults = [];

  // Si se encontraron recetas en la base de datos, agrégalas a los resultados combinados
  if (resultFromDB) {
    combinedResults.push(...resultFromDB);
  }

  // Si se encontraron recetas en la API, agrégalas a los resultados combinados
  if (resultFromAPI) {
    combinedResults.push(...resultFromAPI);
  }

  return combinedResults;
};


  const createRecipe = async (recipeData) => {
  const { name, image, dishSummary, healthScore, steps, diets } = recipeData;

   if (!diets ||!Array.isArray(diets)) {
    console.log("Invalid diets:", diets);
    throw new Error("Diets must be an array");
  }

  // Crear la receta en la base de datos
  const createdRecipe= await Recipe.create({
    name,
    image,
    dishSummary,
    healthScore,
    steps,
    createdInDb: true,
  });

  // Relacionar la receta con los tipos de dieta
  for(let i = 0; i < diets.length; i++) {
    const dietName = diets[i];

    // Buscar la dieta en la base de datos por nombre
    const diet = await Diet.findOne({
      where: {
        name: dietName,
      },
    });

    if (diet) {
      // Si se encuentra la dieta, relacionarla con la receta
      await createdRecipe.addDiets([diet]);
    } else {
      console.log(`Diet not found for name: ${dietName}`);
    }
  }

  return createdRecipe;
};

module.exports = {
  recipeDetailById,
  recipeByName,        
  createRecipe,
  getApiInfo,
  getDBInfo,}


  