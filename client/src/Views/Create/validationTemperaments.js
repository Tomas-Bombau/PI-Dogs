  const validationTemperaments = (data) => {
      let arrayOfChoices  = [];

      if(data.temperaments.length >= 1 && data.temperaments.length <= 10) {
        arrayOfChoices.push(...data.temperaments)
        return arrayOfChoices
      }

    };
  
  export default validationTemperaments;
  