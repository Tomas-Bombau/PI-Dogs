import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  SEARCH,
  FILTER_TEMPERAMENT,
  ORDER_NAME,
  ORDER_WEIGHT,
  FILTER_SOURCE,
  DOG_BY_ID,
  DELETE,
  ADD_FAV,
  REMOVE_FAV,
} from "../Actions/actionsTypes";

const initialState = {
  allDogs: [],
  allDogsCopy: [],
  allTemperaments: [],
  dbDog: [],
  dogId: [],
  favorites: [],
  dogIdCount: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      const db = action.payload.filter((dog) => dog.createdInDb === true);
      return {
        ...state,
        allDogs: action.payload,
        allDogsCopy: action.payload,
        dbDog: db,
      };

    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload };

    case DOG_BY_ID:
      return { ...state, dogId: action.payload };

    case SEARCH:
      return { ...state, allDogs: action.payload };

    case DELETE:
      const filterByDelete = state.dbDog.filter(
        (dog) => dog.id !== action.payload
      );
      const allDogsFilterByDelete = state.allDogs.filter(
        (dog) => dog.id !== action.payload
      );
      return {
        ...state,
        dbDog: filterByDelete,
        allDogs: allDogsFilterByDelete,
      };

    case ADD_FAV:
      const copy = state.allDogs;
      const addingDog = copy.filter((dog) => dog.id == action.payload);
      return { ...state, favorites: [...state.favorites, ...addingDog] };

    case REMOVE_FAV:
      const copy2 = state.favorites;
      const removingDog = copy2.filter((dog) => dog.id != action.payload);
      return { ...state, favorites: [...removingDog] };

    case ORDER_NAME:
      const dogsName = state.allDogs;
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
      const dogsWeight = state.allDogs;
      const dogsByWeight =
        action.payload === "crec"
          ? dogsWeight.sort((a, b) =>
              b === undefined || b.weightMin === undefined || isNaN(b.weightMin)
                ? -1
                : a.weightMin - b.weightMin
            ) // Algunos perros no tienen dato en el peso y con el condicional y el return -1 los mando al final
          : dogsWeight.sort((a, b) =>
              b === undefined || b.weightMax === undefined || isNaN(b.weightMax)
                ? -1
                : b.weightMax - a.weightMax
            ); // Algunos perros no tienen dato en el peso y con el condicional y el return -1 los mando al final

      return { ...state, allDogs: dogsByWeight };

    case FILTER_TEMPERAMENT:
      const copyForTemperamentSource = state.allDogsCopy;
      if (action.payload === "todos") {
        return { ...state, allDogs: copyForTemperamentSource };
      } else {
        const filteredDog = copyForTemperamentSource.filter((dog) =>
          dog.temperaments.includes(action.payload)
        );
        return { ...state, allDogs: filteredDog };
      }

    case FILTER_SOURCE:
      const copyForSourceFilter = state.allDogsCopy;
      if (action.payload === "todos") {
        return { ...state, allDogs: copyForSourceFilter };
      } else if (action.payload === "db") {
        const filteredDogDB = copyForSourceFilter.filter(
          (dog) => dog.createdInDb === true
        );
        return { ...state, allDogs: filteredDogDB };
      } else {
        const filteredDog = copyForSourceFilter.filter(
          (dog) => !dog.createdInDb
        );
        return { ...state, allDogs: filteredDog };
      }

    default:
      break;
  }
};

export default rootReducer;
