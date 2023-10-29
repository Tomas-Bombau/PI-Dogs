import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  // FILTER,
  // ORDER,
} from "../Actions/actionsTypes";

const initialState = {
  allDogs: [],
  allDogsBackUp: [],
  allTemperaments: [],
  dogsFiltered: [],
  dogsSearch: [],
  currentPage: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, allDogs: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload };
    case SEARCH:
      return { ...state, allDogs: action.payload };
      
    default:
      break;
  }
};

export default rootReducer;
