import React from "react";
import "./Paginado.css"

const Paginado = ({ recipesPerPage, allRecipes, paginado }) => {

    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage) -1; i++) {
        // 100/9 = 12
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className="paginado">
                { pageNumbers?.map((number) =>(
                    <button className="number" key={number}
                        onClick={() => paginado(number)}>{number}
                    </button>
                ))}
            </ul>
        </nav>
    );
} 

export default Paginado;
