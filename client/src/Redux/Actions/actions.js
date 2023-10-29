import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  // FILTER,
  // ORDER,
} from "./actionsTypes";
import axios from 'axios'

export const getDogs = () => {
  return async function (dispatch){
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

// export const order = (value) => {
//   return {
//     type: ORDER,
//     payload: value,
//   }
// };
