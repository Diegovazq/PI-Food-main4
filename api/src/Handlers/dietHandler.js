const { putDietInfo} =require ( "../controllers/dietController" );

const getAllDietHandler = async (req, res) => {
    try{
        const allDiet= await putDietInfo();
        console.log("Se obtuvieron todas las dietas con éxito.");
        res.status(200).json(allDiet)
    }catch(error){
        res.status(500).json({ error: "Hubo un error al obtener los tipos de dietas" });
    }
    };
  
module.exports={ getAllDietHandler }