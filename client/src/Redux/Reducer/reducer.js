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
  copyOfWeight: []
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_DOGS:
      return { ...state, allDogs: action.payload, allDogsCopy: action.payload };

    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload };

    case SEARCH:
      return { ...state, allDogs: action.payload };

    case ORDER_NAME:
      const dogsName = state.allDogsCopy;
      const dogsByName =
        action.payload === "z-a"
          ? dogsName.sort((a, b) => {
              const nameA = a.name.trim().toLowerCase();
              const nameB = b.name.trim().toLowerCase();
              if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
              return 0;
            })
          : dogsName.sort((a, b) => {
              const nameA = a.name.trim().toLowerCase();
              const nameB = b.name.trim().toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
      return { ...state, allDogs: dogsByName };

      
    case ORDER_WEIGHT:
      const dogsWeight = state.allDogsCopy;

      const dogsByWeight =
        action.payload === "crec"
          ? dogsWeight.sort((a, b) => (b === undefined || b.weightMin === undefined || isNaN(b.weightMin)) ? -1 : a.weightMin - b.weightMin)// Algunos perros no tienen dato en el peso y con el condicional y el return -1 los mando al final
          : dogsWeight.sort((a, b) => (b === undefined || b.weightMax === undefined || isNaN(b.weightMax)) ? -1 : b.weightMax - a.weightMax); // Algunos perros no tienen dato en el peso y con el condicional y el return -1 los mando al final
          
      return { ...state, allDogs: dogsByWeight};


    case FILTER_TEMPERAMENT:
      const dogs = state.allDogsCopy;
      if (action.payload === "Todos") {
        return { ...state, allDogs: dogs };
      } else {
        const filteredDog = dogs.filter((dog) =>
          dog.temperaments.includes(action.payload)
        );
        return { ...state, allDogs: filteredDog };
      }
    default:
      break;
  }
};

export default rootReducer;
