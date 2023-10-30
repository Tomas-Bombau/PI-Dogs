import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  FILTER_TEMPERAMENT,
  FILTER_SOURCE,
  ORDER_NAME,
  ORDER_WEIGHT,
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
      console.log(error);
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
      console.log(error);
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

export const orderName = (value) => {
  return {
    type: ORDER_NAME,
    payload: value,
  };
};

export const orderWeight = (value) => {
  console.log(value)
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
}

  export const filterSource = (value) => {
    return {
      type: FILTER_SOURCE,
      payload: value,
    };
};
