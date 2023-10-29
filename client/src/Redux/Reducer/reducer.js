import { orderTemperaments } from "../../sortFunction";
import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  FILTER_TEMPERAMENT,
  ORDER_NAME,
  ORDER_WEIGHT,
} from "../Actions/actionsTypes";

const initialState = {
  allDogs: [],
  allDogsCopy: [],
  allTemperaments: [],
  dogsFiltered: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, allDogs: action.payload, allDogsCopy: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload};
    case SEARCH:
      return { ...state, allDogs: action.payload };
    case ORDER_NAME:
      if (action.payload === "desc") {
        const allDogs = state.allDogsCopy;
        const orderDogs = allDogs.sort((a, b) => {
          const nameA = a.name.trim().toLowerCase();
          const nameB = b.name.trim().toLowerCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
        return { ...state, allDogs: orderDogs };
      }
    case ORDER_WEIGHT:

    case FILTER_TEMPERAMENT:
      const dogs = state.allDogsCopy;
      if (action.payload !== "Todos") {
        const filteredDog = dogs.filter((dog) =>
          dog.temperaments.includes(action.payload)
        );
        return { ...state, allDogs: filteredDog };
      } else {
        return{ ...state, allDogs: dogs};
      }
    default:
      break;
  }
};

export default rootReducer;
