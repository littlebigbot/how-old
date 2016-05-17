import * as ActionTypes from '../actions';
import { merge, keys, reduce, map } from 'lodash';
import paginate from './paginate';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

function entities(state = {}, action) {
  switch(action.type) {
    case ActionTypes.SEARCH_SUCCESS:
      return {
        ...reduce(action.response.results, (accumulator, result) => {
          return {
            ...accumulator,
            [result.id]: result
          };
        }, {}),
        ...state //after, as to not overwrite the expanded media
      };
    case ActionTypes.LOAD_MEDIA_REQUEST:
      return {
        ...state,
        [action.extraParams.id]: {
          ...state[action.extraParams.id],
          isFetching: true
        }
      }
    case ActionTypes.LOAD_MEDIA_SUCCESS:
      console.log(action)
      return {
        ...state,
        [action.extraParams.id]: {
          ...state[action.extraParams.id],
          ...action.response,
          mediaType: action.extraParams.mediaType,
          isFetching: false,
          fullData: true
        }
      }
    case ActionTypes.LOAD_MEDIA_REQUEST:
      return {
        ...state,
        [action.extraParams.id]: {
          ...state[action.extraParams.id],
          isFetching: false
        }
      }
    case ActionTypes.GET_CREDITS_SUCCESS:
      return {
        ...state,
        [action.extraParams.id]: {
          ...state[action.extraParams.id],
          isFetching: false,
          credits: {
            cast: action.response.cast,
            crew: action.response.crew
          }
        }
      }
    case ActionTypes.GET_FULL_CREDITS_SUCCESS:
      return  {
        ...state,
        [action.extraParams.creditId]: {
          ...state[action.extraParams.creditId],
          ...action.response,
          fullData: true,
          mediaType: 'person',
          isFetching: false
        }
      }
    default:
      return state;
  }
}

function searchResults(state = {isFetching: false}, action) {
  switch(action.type) {
    case ActionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        [action.extraParams.query.toLowerCase()]: {
          catalog: map(action.response.results, result => result.id),
          page: action.response.page,
          totalResults: action.response.totalResults,
        },
        isFetching: false
      };
    default:
      return {
        ...state,
        isFetching: false
      }
  }

  return state;
}

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
  entities,
  searchResults,
  errorMessage,
  routing
})

export default rootReducer
