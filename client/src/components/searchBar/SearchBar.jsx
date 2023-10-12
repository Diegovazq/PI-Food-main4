import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { recipeByName } from "../../redux/actions/actions";
import style from './SearchBar.module.css';



const SearchBar = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState('') // Cambiar el nombre a 'query'

    const handleInputChange = (e) =>{
        setQuery(e.target.value) // Cambiar el nombre a 'query'
    }

    const handleSubmit = () =>{
        
        // Comprobar si 'query' es un nombre o título y enviarlo al backend
        if (query) {
            console.log("Query:");
            dispatch(recipeByName(query)); // Envía 'query' al backend
            setQuery(""); // Limpia el campo de búsqueda
        }
    }

    return (
        <div className={style.SearchContainer}>
            <input className={style.bar} type="text" placeholder="Find your recipe...🔍" onChange={(e) => handleInputChange(e)} value={query} />
            <button className={style.search} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}


export default SearchBar;