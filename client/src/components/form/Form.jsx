
import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postRecipes, getAllDiets } from "../../redux/actions/actions";
import validate from "../../validation/validation";
import './Form.css'


//NECESITO REPLANTEAR LAS VALIDACIONES YA QUE NO FUNCIONAN BIEN

const Form = () => {
    
    //HOOKS
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    //let navigate = Navigate();
    
    //STATES
    const [form, setForm] = useState({
        name: "",
        dishSummary: "",
        diets: [],
        image: "",
        healthScore: "",
        step: "",
        steps: []
    })

    const [errors, setErrors] = useState({
        name : "The name is required",
        dishSummary : "The summary is required",
        healthScore : "The health score is required",
        image : "The image is required",
        steps : "The steps is required",
        diets : "Need to add between 1 to 3 types of diets",
        step: "Need to add a step"
    })
    
    //EFFECTS
    useEffect(() => {
        dispatch(getAllDiets())
    },[dispatch])
    
    //FUNCTIONS


    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        setErrors(validate({
            ...form,
            [property]: value 
        }))
        setForm({ 
            ...form,
            [property]: value 
        })
    }

    const handlerCheck = (e) => {
        if(e.target.checked){
            setForm({
                ...form,
                diets: [...form.diets, e.target.value],
            })
        }else if(!e.target.checked){
            setForm({
                ...form,
                diets: form.diets.filter(diet => diet !== e.target.value)
            })
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(postRecipes(form))
        alert("You just set the new Recipe")
        setForm({
            name: "",
            dishSummary: "",
            diets: [],
            image: "",
            healthScore: "",
            step: "",
            steps: [],
        })
       // navigate('/home')
        //return <Navigate to="/home" />;
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(form.step !== "" && form.step.length > 4 && form.step.length < 41){
            let newItem = form[e.target.name];
        newItem.push(form.step);
        setForm({ ...form, steps: newItem });
        setForm({ ...form, step: "" })
        }
    }
    
    const handleDelete = (e) => {
        
        e.preventDefault();
        let newItem = form.steps;

        const index = e.target.name
        newItem.splice(index, 1);
        setForm({ ...form, steps: newItem });

    }


    return(
        <div>
            <div className="buttonReturn">
                <Link to= '/home'>
                    <button className="button">Return</button>
                </Link>
            </div>
            <h1 id="title">Create your own Recipe !</h1>
            <form onSubmit={(e) =>submitHandler(e)} className="Formulario">
                <div className="inputs">
                    <div>
                        <label>Recipe:  </label>
                        <input 
                            type="text" 
                            value={form.name} 
                            onChange={(e) =>changeHandler(e)} 
                            name="name" 
                            placeholder="Write Recipe name..."/>
                            
                        {errors.name && <strong>{errors.name}</strong>}
                    </div>

                    <div>
                        <label>Summary: </label>
                        <input 
                            type="text" 
                            value={form.dishSummary} 
                            onChange={(e) =>changeHandler(e)} 
                            name="dishSummary" 
                            placeholder="Detail your Recipe..."/>
                        {errors.dishSummary && <strong>{errors.dishSummary}</strong>}
                    </div>

                    <div>
                        <label>Health Score: </label>
                        <input 
                            id="score"
                            type="number" 
                            value={form.healthScore} 
                            onChange={(e) =>changeHandler(e)} 
                            name="healthScore" 
                            min="0"
                            max="100"
                            />
                        {errors.healthScore && <strong>{errors.healthScore}</strong>}
                    </div>

                    <div>
                        <label>Image: </label>
                        <input 
                            type="url" 
                            value={form.image} 
                            onChange={(e) =>changeHandler(e)} 
                            name="image"
                            placeholder="Put image..."/>
                        {errors.image && <strong>{errors.image}</strong>}
                    </div>
            
                    <div>
                        <label>Steps: </label>
                        <input
                            type="text" 
                            value={form.step} 
                            onChange={(e) =>changeHandler(e)} 
                            name="step"
                            placeholder="Put yours steps..."/>
                    {errors.step && <strong>{errors.step}</strong>}
                    </div>
                        <button

                        className="buttonStep"
                        name="steps"
                        onClick={(e) => handleClick(e)}
                        >
                        Add Step
                        </button>
                </div>
                    <div className="sqaureStep"> 
                    {form.steps?.map((e,index) => (
                        <div className="step" key={index}>
                            <p>Step: {index+1}</p>
                            <button
                            className="crossBtn"
                            name={index} 
                            onClick = {(e) => handleDelete(e)}
                            >X</button>
                        </div>
                        
                    ))}
                    </div>
                
                
                <div className="dietsType">
                    <div>
                    <label>Diets: </label>
                            <div className="options">
                                {diets.map((e) => (
                                    <div key={e.name}>
                                        <input
                                        type="checkbox"
                                        value={e.name}
                                        name={e.name}
                                        onChange={(e) => handlerCheck(e)}
                                        disabled={form.diets.length >= 3 && !form.diets.includes(e.name)? true : false}
                                        />
                                        <label>{e.name}</label>
                                    </div>
                                ))}
                                {errors.diets && <strong>{errors.diets}</strong>}
                            </div>
                    </div>
                    <button
                        disabled={errors.name || errors.dishSummary || errors.healthScore || errors.step || errors.image || errors.diets }
                        type="submit"
                        className="button"
                    >Create Recipe</button>
                </div>

            </form>
        </div>
    )
}

export default Form;