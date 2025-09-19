const initialState = {
  comics: [],
  comics_filter: [],
  issues: [],
  comic: {},
  issues_sorting: [],
  filters: false,
  loading: true,
  loading_issues: true,
  isWaking: false,
};


const comicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COMICS":
      return {
        ...state,
        comics: action.payload,
        comics_filter: action.payload,
        loading: false
      }

    case "GET_ISSUES":
      return {
        ...state,
        issues: action.payload,
        loading_issues: false,
        issues_sorting: action.payload
      }

    case "GET_COMIC":
      return {
        ...state,
        comic: action.payload
      }

    case "SEARCH_COMICS":
      return {
        ...state,
        comics_filter: action.payload,
        loading: false
      }

    case "RESET_STATE":
      return {
        ...state,
        comic: {},
        issues: []
      }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
        loading_issues: action.payload,
        isWaking: false,
      }
    
    case 'SHOW_WAKEUP_MESSAGE':
      return { ...state, isWaking: true };

    case "SORT_ISSUES":
      return{
        ...state,
        issues_sorting: action.payload
      }

    ///-------------Filtros
    case "FILTER_COMIC_FOR_PUBLISHERS":
      return{
        ...state,
        comics_filter: action.payload
      }

    case "ORDER_NAME":
      return {
        ...state,
        comics_filter: [...action.payload]
      }

    case "FILTER_FOR_RELEASE": {
      const filterRelease = action.payload === "1990"    
  
      return {
        ...state,
        comics: filterRelease
      };
    }


    default: return state
  };
};

export default comicsReducer;