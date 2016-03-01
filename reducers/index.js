import * as ActionTypes from '../actions';
import { merge, keys } from 'lodash';
import paginate from './paginate';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { searchEntity: { isFetching: false } }, action) {
  console.log(action)
  if (action.response && action.response.entities) {
    if(action.type === ActionTypes.LOAD_MORE_SEARCH_SUCCESS) {
      console.log({
        ...state,
        [action.key]: {
          ...action.response.entities,
          results: [...state[action.key].results, ...action.response.entities.results],
          isFetching: action.isFetching
        }
      });
      return {
        ...state,
        [action.key]: {
          ...action.response.entities,
          results: [...state[action.key].results, ...action.response.entities.results],
          isFetching: action.isFetching
        }
      }
    }
    return {
      ...state,
      [action.key]: {
        ...action.response.entities,
        isFetching: action.isFetching
      }
    }
    // return merge({}, state, action.response.entities)
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
  // meta,
  entities,
  // pagination,
  errorMessage,
  routing
})

export default rootReducer
