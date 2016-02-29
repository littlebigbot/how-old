import * as ActionTypes from '../actions';
import { merge, keys } from 'lodash';
import paginate from './paginate';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { searchEntity: {} }, action) {
  console.log(action)
  if (action.response && action.response.entities) {

    return {
      ...state,
      [action.response.key]: {
        ...action.response.entities
      }
    }
    // return merge({}, state, action.response.entities)
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
