import axios from "axios";
import {
        GET_RECIPES,
        GET_RECIPE_ID,
        GET_DIETS,
        GET_RECIPE_NAME,
        LOADING,
        CLEAR_DETAIL,
        FILTERS,  
        DELETE_RECIPE,  
} from '../types/types';

// TODAS LAS RECETAS
export const getRecipes = () => {
    console.log("getRecipes:",getRecipes);
    return async function (dispatch) {
        dispatch({ type: LOADING })
        const apiData = await axios.get('http://localhost:3005/recipes');
        const users = apiData.data;
        dispatch({ type: GET_RECIPES, payload: users })
    };
}

//TRAEMOS RECETA POR ID
export const getRecipeById = (id) =>{
    console.log("getRecipeById:",getRecipeById);
    return async  function (dispatch) {
        const apiData = await axios.get(`http://localhost:3005/recipes/${id}`);
        const user = apiData.data;
        dispatch({ type: GET_RECIPE_ID, payload: user})
    }
}

//BORRAR RECETA POR ID
export const deleteRecipeById = (id) => {
    return{
        type: DELETE_RECIPE,
        payload: id
    }
}


export const clearDetail = () =>{
    return { type: CLEAR_DETAIL }
}


//TODAS LAS DIETAS
export const getAllDiets = () => {
    return async function (dispatch) {
        dispatch({ type: LOADING })
        const apiData = await axios.get('http://localhost:3005/diets');
        const diets = apiData.data;
        dispatch({ type: GET_DIETS, payload: diets })
    }
}

//CREAR RECETA
export const postRecipes = (payload) => {
    return async function () {
        const postRecipe = await axios.post('http://localhost:3005/recipes', payload)
        return postRecipe
    }
}

//QUERY RECETA / manejar errores
export const recipeByName = (query) => {
    return async function (dispatch) {    
        try {
            console.log("Query en recipeByName:", query); 
            const allRecipesByName = await axios.get(`http://localhost:3005/recipes?name=${query}`)
            console.log("Respuesta de la API:", allRecipesByName.data);
            return dispatch({ type: GET_RECIPE_NAME, payload: allRecipesByName.data })
            
        } catch (error) {
            console.error("Error en recipeByName:", error);
            return dispatch({ type: GET_RECIPE_NAME, payload: [] })
        }
    }
}   


export const filters = (payload) => {
    return{
        type: FILTERS,
        payload
    }
}

