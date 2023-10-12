import React from 'react';
import style from './NavBar.module.css';
import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <div className={style.mainContainer}> 
            <Link to='/home'>
                <button className={style.home}>Home</button>
            </Link>
            <Link to='/form'>
                <button className={style.newRecipe}>New Recipe</button>
            </Link>
        </div>
    )
}

export default NavBar;