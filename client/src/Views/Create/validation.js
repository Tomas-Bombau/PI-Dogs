const validation = (data) => {
  let errors = {};

  const pattern = /^\d+\s*-\s*\d+\s*$/;
  const patternURL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  if (data.name.length >= 20) {
    errors.name = "Nombre demasiado largo";
  }

  if (data.heightMin == "") {
    errors.heightMin = " ";
  } else if (data.heightMin.trim() !== "" && Number(data.heightMin) < 5) {
    errors.heightMin = "La raza debe medir más de 5cm";
  } else if (data.heightMin > 1100) {
    errors.heightMin = "La raza no puede medir más de 1100cm";
  } else if (Number(data.heightMax) < Number(data.heightMin)) {
    errors.heightMax = "La altura maxima no puede ser menor a la altura minima";
  } else if (data.heightMax > 1100) {
    errors.heightMax = "La raza no puede medir más de 1100cm";
  } else {
    errors.heightMax = "";
    errors.heightMin = "";
  }

  if (data.weightMin == 0) {
    errors.weightMin = " ";
  } else if (data.weightMin.trim() !== "" && Number(data.weightMin) <= 0) {
    errors.weightMin = "El peso no puede ser menor o igual a 0";
  } else if (data.weightMin > 110) {
    errors.weightMin = "La raza debe pesar maximo 110kg";
  } else if (Number(data.weightMax) < Number(data.weightMin)) {
    errors.weightMax = "El peso maximo no puede ser menor al peso minimo";
  } else if (data.weightMax > 110) {
    errors.weightMax = "La raza debe pesar maximo 110kg";
  } else {
    errors.weightMax = "";
    errors.weightMin = "";
  }


  const life = data.life_span.split("-");
  const minAge = Number(life[0]);
  const maxAge = Number(life[1]);
  if (!pattern.test(data.life_span)) {
    errors.life_span =
      "El promedio de vida debe ser escrito como en el ejemplo";
  } else if (data.life_span.length === 0) {
    errors.life_span = " ";
  } else if (maxAge <= minAge) {
    errors.life_span =
      "La esperanza de vida más baja no puede ser menor a la esperanza de vida más alta";
  } else {
    errors.life_span = ""
  }

 
  if (data.reference_image_id == 0) {
    errors.reference_image_id = " ";
  } else if(!patternURL.test(data.reference_image_id)) {
    errors.reference_image_id = "Ingresar una URL";
  } else {
    errors.reference_image_id = ""
  }

  return errors;
};

export default validation;
