import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, clearDetail } from "../../redux/actions/actions";
import Loading from "../loading/Loading";
import './Detail.css';



const Detail = () => {

    //HOOKS
    const myRecipe = useSelector((state) => state.recipeDetail)
    const dispatch = useDispatch();
    const { id } =  useParams();
   
    //STATE
    // let [loading, setLoading] = React.useState(false);
    const [loading, setLoading] = useState(true); // Inicialmente
    
    //useEffect
    // useEffect(()=>{
    //     setLoading(true);

	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 1200);
    //     dispatch(getRecipeById(id))
    //     //cuando se desmonta

    useEffect(() => {
        // Realiza la solicitud para obtener los detalles de la receta
        dispatch(getRecipeById(id))
            .then(() => {
                // Una vez que se completa la carga de datos, cambia loading a false
                setLoading(false);
            });

        // Limpia los detalles cuando el componente se desmonta     
        return () => {
            dispatch(clearDetail())
        }
    },[dispatch, id]);
    console.log("myRecipe:", myRecipe);
    return(
        <div className="Detail">
            {!loading ? (
                    <>
                    <div className="detailContainer">
                            <div className="detailDentro">
                                {myRecipe.data.title ? (
                                    <h1>{myRecipe.data.title}</h1>
                                ) : (
                                    <h1>{myRecipe.data.name}</h1>
                                )}
                                <img src={myRecipe.data.image }
                                alt="img not found"
                                width="280px"
                                height="200px"
                                />
                                <h2>
                                    Score:{" "}
                                    {myRecipe.data.healthScore }
                                </h2>
                                <h2>
                                    Diets:{" "}
                                    {!myRecipe.data.createdInDb
                                    ? myRecipe.data.diets + " "
                                    : myRecipe.data.diets.map((e) => e.name + " ")}
                                </h2>
                            </div>
                            <div className="detailContainerUno">
                                <p>Summary</p>
                                <div>
                                    {!myRecipe.data.createdInDb
                                    ? myRecipe.data.summary
                                    : myRecipe.data.dishSummary}
                                </div>
        
                                <p>STEPS</p>
                                <div>
                                    {!myRecipe.data.createdInDb
                                    ? myRecipe.data.analyzedInstructions &&
                                     myRecipe.data.analyzedInstructions[0]
                                     ?.steps.map((s,index) => {
                                        return (
                                            <li key={index}>{s.step}</li>
                                        )
                                    })
                                    : myRecipe.data.steps[0].map((s,index) => {
                                        
                                        return(
                                            <li key={index}>{s}</li>
                                        )
                                    })}
                                </div>
                            </div>
                    </div>
                        <Link to="/home">
                            <button id="buttonReturn">Return</button>
                        </Link> 
                    </>
                    
                ) : (
                <div>
                    <Loading />
                </div>
            )}
        </div>
        
        
        
        
    )

}
export default Detail;

