

const { Diet } = require('../db');

const dietTypes = [
 
  "dairy free",
  "vegan",
  "gluten free",
  "lacto ovo vegetarian",
  "paleolithic",
  "primal",
  "pescatarian",
  "fodmap friendly",
  "whole 30",
];

const createOrUpdateDiet = async (name) => {
  try {
    const [diet, created] = await Diet.findOrCreate({
      where: { name },
    });

    return diet;
  } catch (error) {
    // console.error(`Error al crear o actualizar la dieta "${name}":`, error);
    throw new Error(`Hubo un error al crear o actualizar la dieta "${name}"`);
  }
};

const putDietInfo = async () => {
  try {
    const createdDiets = await Promise.all(
      dietTypes.map(async (dietType) => {
        const diet = await createOrUpdateDiet(dietType);
        return diet;
      })
    );

    return createdDiets;
  } catch (error) {
    console.error('Error al crear las dietas:', error);
    throw new Error('Hubo un error al crear las dietas');
  }
};   

module.exports = {
  putDietInfo,
};
