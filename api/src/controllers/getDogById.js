require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog } = require("../db");

const getDogById = async (idRaza) => {
  const regexValidationUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  if (regexValidationUUID.test(idRaza)) {
    const dogById = await Dog.findByPk(idRaza);
    if (!dogById) {
      throw Error("The UUID you provided doesn't match our records in the DataBase");
    } else return dogById;
  }

  if (idRaza) {
    const getDogById = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${idRaza}?api_key=${API_KEY}`
    );
    let getDogByIdDetail = getDogById.data;
    const image = getDogByIdDetail.reference_image_id;

    if (getDogByIdDetail?.name) {
      const dogIdDetail = {
        id: getDogByIdDetail.id,
        name: getDogByIdDetail.name,
        life_span: getDogByIdDetail.life_span,
        weight: getDogByIdDetail.weight,
        height: getDogByIdDetail.height,
        reference_image_id: `https://cdn2.thedogapi.com/images/${image}.jpg`,
      };
      return dogIdDetail;
    } else {
        throw Error("The ID you provided doesn't match our records in the API or DataBase")
    }
  }
};

module.exports = getDogById;
