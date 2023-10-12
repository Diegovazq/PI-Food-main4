import { 
    GET_RECIPES, 
    GET_RECIPE_ID, 
    GET_DIETS, 
    POST_RECIPES, 
    GET_RECIPE_NAME,        
    LOADING,
    CLEAR_DETAIL,
    FILTERS,
    DELETE_RECIPE,
} from "../types/types";


const initialState = {
    recipes: [],
    filterRecipes: [], //estado aux para filtrar
    recipeDetail: [],
    diets: [],
    loading: false,
    render: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filterRecipes: action.payload,
                loading: false,
            };

        case LOADING:
            return{ ...state, loading: true }
            
        case GET_RECIPE_NAME:
            return{
                ...state,
                recipes: action.payload
            }

        case GET_RECIPE_ID:
            return {
                ...state,
                recipeDetail: action.payload,
                loading: false
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            };

        case POST_RECIPES:
            return{
                ...state,
            };

        case DELETE_RECIPE:
            const updatedRecipes = state.recipes.filter((e) => {
                if(e.id !== action.payload){
                    return e;
                }
                return true;
            });
            return{
                ...state,
                recipes: updatedRecipes
            };

        case FILTERS:
            let asd = state.filterRecipes;

            if(action.payload.origin === "created"){
                asd = asd.filter(el => el.createdInDb)
            }
            else if(action.payload.origin === "api"){
                asd.filter(el => !el.createdInDb)
            }
            
            if(action.payload.diets !== "All"){
                asd = asd.filter((el) => 
                el.diets?.includes(action.payload.diets)
            )
            }

            if(action.payload.abc === "asc"){
                asd.sort((a, b)=>{
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0
                }) 
            }else if(action.payload.abc === "desc"){
                asd.sort((a, b) =>{
                    if(a.name > b.name) return -1;
                    if(b.name >  a.name) return 1;
                    return 0
                })
            }

            if(action.payload.score === "Higher Score"){
                asd.sort((a, b)=>{
                    if(a.healthScore > b.healthScore ) return -1;
                    if(b.healthScore > a.healthScore ) return 1;
                    return 0
                }) 
            } else if(action.payload.score === "Lower Score"){
                asd.sort((a, b) =>{
                    if(a.healthScore > b.healthScore ) return 1;
                    if(b.healthScore > a.healthScore ) return -1;
                    return 0
                })
            }

            return{
                ...state,
                recipes: asd
            }

        case CLEAR_DETAIL: 
            return{
                ...state,
                recipeDetail: []
            }

        default:
            return { ...state };
    }
};

export default rootReducer;