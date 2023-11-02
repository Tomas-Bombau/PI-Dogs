const validationTemperaments = (data) => {
    let temperaments  = {};
  
    if(data.temperaments.length >= 1){
      temperaments.choise = data.temperaments
    }
  
    return temperaments;
  };
  
  export default validationTemperaments;
  