const validation = (data) => {
  let errors = {};

  const pattern = /^\d+\s*-\s*\d+\s*$/;
  const patternURL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  if (data.name.length > 0) {
    errors.name = "";
  }

  if (data.name.length >= 20) {
    errors.name = "Nombre demasiado largo";
  }

  if (data.heightMin < 5 && data.heightMin >= 1) {
    errors.heightMin =
      "La raza debe medir más de 5cm";
  }

  if (data.heightMin > 1100) {
    errors.heightMin =
    "La raza no puede medir más de 1100cm";
  }

  
  if (data.heightMax > 1100) {
    errors.heightMax =
      "La raza no puede medir más de 1100cm";
  }

  if (Number(data.weightMin) === 0) {
    errors.weightMin = " ";
  }

  if (Number(data.weightMax) === 0) {
    errors.weightMax = " ";
  }

  if (data.weightMin > 110) {
    errors.weightMin =
      "La raza debe pesar maximo 110kg";
  }

  if (data.weightMax > 110) {
    errors.weightMax =
      "La raza debe pesar maximo 110kg";
  }

  if (!pattern.test(data.life_span)) {
    errors.life_span =
      "El promedio de vida debe ser escrito como en el ejemplo";
  }

  const minAge = data.life_span.split("-")[0];
  if (pattern.test(data.life_span) && Number(minAge) === 0) {
    errors.life_span = "La esperanza de vida no puede ser de 0 años";
  }

  if (!patternURL.test(data.reference_image_id)) {
    errors.reference_image_id = "Ingresar una URL";
  }

  return errors;
};

export default validation;
