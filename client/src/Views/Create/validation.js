const validation = (data) => {
  let errors = {};

  const pattern = /^\d+\s*-\s*\d+\s*$/;
  const patternURL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/

  if (data.name.length > 0) {
    errors.name = "";
  }

  if (data.name.length >= 20) {
    errors.name = "Nombre demasiado largo";
  }

  if (data.heightMin < 9) {
    errors.heightMin =
      "Campo requerido. La raza debe medir más de 9cm. No existen razas de perro tan chicas.";
  }

  if (data.heightMax == 0) {
    errors.heightMax = "Campo requerido";
  }

  if (data.heightMax > 1100) {
    errors.heightMax =
      "La raza no puede medir más de 1100cm. No existen perros tan grandes. Googlea el record de Zeus 🐶 ";
  }

  if (data.weightMin == 0) {
    errors.weightMin = "Campo requerido. No puede ser 0";
  }

  if (data.weightMax == 0) {
    errors.weightMax = "Campo requerido";
  }

  if (data.weightMin > 110) {
    errors.weightMin =
      "La raza debe pesar maximo 110kg. No existen perros que hayan superado ese número.";
  }

  if (data.weightMax > 110) {
    errors.weightMax =
      "La raza debe pesar maximo 110kg. No existen perros que hayan superado ese número.";
  }

  if (!pattern.test(data.life_span)) {
    errors.life_span =
      "El promedio de vida debe ser escrito como en el ejemplo";
  }

  if (data.temperaments.length >= 1) {
    errors.chosenTemperaments = data.temperaments;
  }

  return errors;
};

export default validation;
