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
  allDogsCopyToCombineFilters: [],
  allDogsCopyToCombineFilters1: [],
  allDogsCopyToCombineFilters2: [],
  allDogsCopyToCombineFilters3: [],
  allTemperaments: [],
  dogId: [],
  favorites: [],
  dogIdCount: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogsCopy: action.payload,
      };

    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload };

    case DOG_BY_ID:
      return { ...state, dogId: action.payload };

    case SEARCH:
      return {
        ...state,
        allDogs: action.payload,
        allDogsCopyToCombineFilters: action.payload,
        allDogsCopyToCombineFilters1: [],
        allDogsCopyToCombineFilters2: [],
        allDogsCopyToCombineFilters3: [],
      };

    case DELETE:
      const copyForSource = state.allDogsCopy;
      const allDogsFilterByDelete = copyForSource.filter(
        (dog) => dog.id !== action.payload
      );
      return {
        ...state,
        allDogs: allDogsFilterByDelete,
        allDogsCopy: allDogsFilterByDelete,
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
      const copyWithouthFilters = state.allDogsCopy
      const copyForTemperament = state.allDogsCopyToCombineFilters;

      if(copyForTemperament.length == 0 ){
        if (action.payload === "todos") {
          return {
            ...state,
            allDogs: copyWithouthFilters,
            allDogsCopyToCombineFilters1: copyWithouthFilters
          };
        } else {
          const filteredDog = copyWithouthFilters.filter((dog) =>
            dog.temperaments.includes(action.payload)
          );
          return {
            ...state,
            allDogs: filteredDog,
            allDogsCopyToCombineFilters1: filteredDog
          };
        }
      }

      if (action.payload === "todos") {
        return {
          ...state,
          allDogs: copyForTemperament,
          allDogsCopyToCombineFilters2: copyForTemperament,
          allDogsCopyToCombineFilters3: copyForTemperament
        };
      } else {
        const filteredDog = copyForTemperament.filter((dog) =>
          dog.temperaments.includes(action.payload)
        );
        return {
          ...state,
          allDogs: filteredDog,
          allDogsCopyToCombineFilters2: filteredDog,
          allDogsCopyToCombineFilters3: filteredDog,
        };
      }

    case FILTER_SOURCE:
      const copyForSourceFilterOriginal = state.allDogsCopy
      const copyForSourceFilter1 = state.allDogsCopyToCombineFilters1
      const copyForSourceFilter = state.allDogsCopyToCombineFilters2;


      if(state.allDogsCopyToCombineFilters1.length != 0){
        if (action.payload === "todos") {
          return { ...state, allDogs: copyForSourceFilter1 };
        } else if (action.payload === "db") {
          const filteredDogDB = copyForSourceFilter1.filter(
            (dog) => dog.createdInDb === true
          );
          return { ...state, allDogs: filteredDogDB };
        } else {
          const filteredDog2 = copyForSourceFilter1.filter(
            (dog) => !dog.createdInDb
          );
          return { ...state, allDogs: filteredDog2 };
        }
      }

      if(state.allDogsCopyToCombineFilters.length == 0){
        if (action.payload === "todos") {
          return { ...state, allDogs: copyForSourceFilterOriginal };
        } else if (action.payload === "db") {
          const filteredDogDB = copyForSourceFilterOriginal.filter(
            (dog) => dog.createdInDb === true
          );
          return { ...state, allDogs: filteredDogDB };
        } else {
          const filteredDog2 = copyForSourceFilterOriginal.filter(
            (dog) => !dog.createdInDb
          );
          return { ...state, allDogs: filteredDog2 };
        }
      }


      if (state.allDogsCopyToCombineFilters2.length > 0) {
        if (action.payload === "todos") {
          return { ...state, allDogs: copyForSourceFilter };
        } else if (action.payload === "db") {
          const filteredDogDB = state.allDogsCopyToCombineFilters2.filter(
            (dog) => dog.createdInDb === true
          );
          return { ...state, allDogs: filteredDogDB };
        } else {
          const filteredDog2 = state.allDogsCopyToCombineFilters3.filter(
            (dog) => !dog.createdInDb
          );
          return { ...state, allDogs: filteredDog2 };
        }
      }

      if (state.allDogsCopyToCombineFilters2.length == 0) {
        const copyFilter = state.allDogsCopyToCombineFilters
        if (action.payload === "todos") {
          return { ...state, allDogs: copyFilter };
        } else if (action.payload === "db") {
          const filteredDogDB = copyFilter.filter(
            (dog) => dog.createdInDb === true
          );
          return { ...state, allDogs: filteredDogDB };
        } else {
          const filteredDog2 = copyFilter.filter(
            (dog) => !dog.createdInDb
          );
          return { ...state, allDogs: filteredDog2 };
        }
      }

    default:
      break;
  }
};

export default rootReducer;
