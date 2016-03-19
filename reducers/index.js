import * as ActionTypes from '../actions';
import { merge, keys } from 'lodash';
import paginate from './paginate';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(
  state = {
    searchResults: {isFetching: false},
    media: {isFetching: false}
  },
  action
) {
  if (action.response && action.response.entities) {

    return {
      ...state,
      [action.key]: {
        ...action.response.entities,
        isFetching: action.isFetching
      }
    };

  }

  if(action.key) {
    return {
      ...state,
      [action.key]: {
        ...state[action.key],
        isFetching: action.isFetching
      }
    }
  }

  return state
}

function media(state = {isFetching: false}, action) {
  return {
    ...state
  }
  return state;
}

function searchResults(state = {isFetching: false}, action) {
  switch(action.type) {
    case ActionTypes.LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        [data.id]: {
          ...state[data.id],
          ...action.response.entities,
          isFetching: false
        }
      };
    case ActionTypes.LOAD_MORE_SEARCH_SUCCESS:
      return {
        ...state,
        results: { ...state.results, ...action.response.entities },
        isFetching: false
      };
    case ActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        catalog: action.response.results,
        page: action.response.page,
        totalResults: action.response.totalResults,
        isFetching: false
      };
    default:
      return {
        ...state,
        isFetching: true
      }
  }

  return state;
}

// If we normalize, we need to save the metadata.
// function meta(state = {searchResults: {}}, action) {
//   if(action.response && action.response.result) {
//     const key = keys(action.response.entities)[0];
//     return {
//       ...state,
//       [key]: {
//         ...action.response.result
//       }
//     }
//     // return/ ret;
//   }

//   return state;
// }

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}


const rootReducer = combineReducers({
  // entities,
  searchResults,
  errorMessage,
  routing
})

export default rootReducer
