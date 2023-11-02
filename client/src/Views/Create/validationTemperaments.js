const validationTemperaments = (data) => {
    let temperaments  = {};
  
    if(data.temperaments.length >= 1){
      temperaments.choice = data.temperaments
    }
  
    return temperaments;
  };
  
  export default validationTemperaments;
  