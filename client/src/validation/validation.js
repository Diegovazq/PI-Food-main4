const validate = (form) => {

    let validateNum = /([0-9])+/;
    let validateImg = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;
    
    const errors = {};

    if (/[^a-zA-Z, ]/g.test(form.name.trim() || validateNum.test(form.name))) {
        errors.name = "The name can not have symbols and numbers";
    } else if(!form.name.trim()){
        errors.name = "The name is required"
    } else if(form.name.length > 20 || form.name.length < 5) {
        errors.name = "The name can can't be less 5, or be higher than 20"
    }

    if(!form.dishSummary.trim().length){
        errors.dishSummary = "The summary is required"
    } else if (form.dishSummary.trim().length < 10){
        errors.dishSummary = "You need to add information to the summary greater than 10 characters";
    }

    if (!form.healthScore.trim()){
        errors.healthScore = "The health score is required";
    } else if(form.healthScore.trim() > 100 || form.healthScore.trim() < 10){
        errors.healthScore = "Score can't be less than 10, or be higher than 100"
    } 

    if(!form.image.trim()){
        errors.image = "The image is required"
    } else if (!validateImg.test(form.image.trim())){
        errors.image = "This is not a valid URL. It must be a JPG, GIF or PNG image";
    } 

    if (!form.step.trim().length) {
        errors.step = "The steps is required";
    } else if (form.step.length < 5 || form.step.length > 40) {
        errors.step = "You must describe the step to follow with at least 5 to 40 characters"
    }

    
    if(form.steps.length < 5) {
        errors.steps = "You need to add at less 5 steps"
    }
    
    if (!form.diets) {
        errors.diets = "You need to add a diet";
    }
    
    return errors;
}



export default validate;