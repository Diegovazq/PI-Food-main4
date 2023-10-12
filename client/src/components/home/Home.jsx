import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getRecipes,filters,} from "../../redux/actions/actions";
import Paginado from "../paginado/Paginado";
import Card from "../card/Card";
import SearchBar from "../searchBar/SearchBar";
import Loading from "../loading/Loading";

import "./Home.css"

const Home = () => {

    //HOOKS
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    const cargando = useSelector((state) => state.loading);
    console.log("useDispatch:",useDispatch);
    const [filter, setFilter] = useState({
        abc: "default",
        score: "default",
        origin : "All",
        diets: "All"
    })
    // ---------------------------PAGINADO-------------------------------------
    const [flag, setFlag] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);
    const indexOfLastRecipe = currentPage * recipesPerPage; // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // cambia mi numero de pagina
    }

    const handlerFilterDiet = (e) => {
        setFilter({...filter,diets:e.target.value})  
        
    }

    const handlerFilterCreated = (e) => {
        setFilter({...filter,origin:e.target.value})
    }

    const handlerSortByName = (e) => {
        setFilter({...filter,abc:e.target.value})
    }

    const handlerSortByScore = (e) => {
        setFilter({...filter,score:e.target.value})
    } 
    //--------------------------------------------------------------------------------------------
    //cuando se monta, hago el dispatch
    //  useEffect()   -   useDispatch()

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
     console.log("getRecipes:",getRecipes);
    

    const handleRefresh = (event) =>{
        event.preventDefault();
        dispatch(getRecipes());
    }

    const handleFilters = (event) =>{
        event.preventDefault();
        console.log("Filtered Recipes:", allRecipes);

        dispatch(filters(filter))
        if(flag){
            setFlag({...flag,flag:false})
            console.log("Flag:", flag);
        }else{       
            setFlag({...flag,flag:true})
        }
        setCurrentPage(1);
        console.log("Current Page:", currentPage);
    }

    return(  
        <div>
            <div>
                <SearchBar />
                    <button className="refButton" onClick={(e) => {
                        handleRefresh(e);
                    }}>Refresh</button>
            </div>
            <div className="filters">
                <select className="eachFilter" onChange={(e) => handlerSortByName(e)}>
                    <option value="default">-</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
                <select className='eachFilter' onChange={(e) => handlerSortByScore(e)}>
                    <option value="default">-</option>
                    <option value="Higher Score">Highest Score</option>
                    <option value="Lower Score">Lowest Score</option>
                </select>
                <select className='eachFilter' onChange={(e) => handlerFilterCreated(e)} >
                    <option value="All">All</option>
                    <option value="created">Created</option>
                    <option value="api">From API</option>
                </select>
                <select className='eachFilter' onChange={(e)=> handlerFilterDiet(e)}>
                    <option value="All">All Diets</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Low Fodmap</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                <button className='eachFilter'
                onClick = {(e) => handleFilters(e)}
                >Apply filter</button>
            </div>
            {cargando ? (
                <Loading />
            ):(
                <div>
                    <div>
                    <Paginado 
                    recipesPerPage = { recipesPerPage }
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}
                    />
                </div>
                <div className="container">
                    {currentRecipes?.map((recipe) => {
                        return(
                            <Card 
                            key={recipe.id}
                            id={recipe.id}
                            name={recipe.name}
                            title={recipe.title} 
                            image={recipe.image}
                            diets={recipe.diets}
                            background_image={recipe.background_image}
                                />
                                )
                            })}
                                
                </div>
                <div>
                    <Paginado 
                    recipesPerPage = { recipesPerPage }
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}
                    />
                </div>
                    
                
            </div>
                )}
                </div>
        )
    }
    

export default Home;