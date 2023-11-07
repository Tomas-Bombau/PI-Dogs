import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  FILTER_TEMPERAMENT,
  FILTER_SOURCE,
  ORDER_NAME,
  ORDER_WEIGHT,
  DOG_BY_ID,
  POST,
  DELETE,
  ADD_FAV,
  REMOVE_FAV,
} from "./actionsTypes";
import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs/");
      return dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getDogById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const data = response.data;
      return dispatch({
        type: DOG_BY_ID,
        payload: data,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/temperaments");
      const data = response.data;
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDog = (dog) => {
  return async function (dispatch) {
    let data = await axios.post("http://localhost:3001/dogs/", dog);
    return dispatch({
      type: POST,
      payload: data,
    });
  };
};

export const orderName = (value) => {
  return {
    type: ORDER_NAME,
    payload: value,
  };
};

export const orderWeight = (value) => {
  return {
    type: ORDER_WEIGHT,
    payload: value,
  };
};

export const filterTemperament = (value) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload: value,
  };
};

export const filterSource = (value) => {
  return {
    type: FILTER_SOURCE,
    payload: value,
  };
};

export const deleteDog = (newId) => {
  return async function (dispatch) {
    await axios.delete("http://localhost:3001/dogs/delete", { data: newId });
    return dispatch({
      type: DELETE,
      payload: newId.id,
    });
  };
};

export const addFav = (id) => {
  return {
    type: ADD_FAV,
    payload: id,
  };
};

export const removeFav = (id) => {
  return {
    type: REMOVE_FAV,
    payload: id,
  };
};
