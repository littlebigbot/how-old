import { CALL_API, Schemas } from '../middleware/api'
import _ from 'lodash';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_WITH_PREVIOUS_QUERY = 'SEARCH_WITH_PREVIOUS_QUERY';

export function search(query) {
  return (dispatch, getState) => {
    const { searchResults } = getState();
    if(searchResults[query.toLowerCase()]) {
      return dispatch({
        type: SEARCH_WITH_PREVIOUS_QUERY,
        query
      });
    } else {
      return dispatch({
        [CALL_API]: {
          types: [ SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE ],
          endpoint: `/search/multi`,
          data: {
            query
          },
          query
        }
      })
    }
  }
}

export const LOAD_MEDIA_REQUEST = 'LOAD_MEDIA_REQUEST';
export const LOAD_MEDIA_SUCCESS = 'LOAD_MEDIA_SUCCESS';
export const LOAD_MEDIA_FAILURE = 'LOAD_MEDIA_FAILURE';

export function loadMediaIfNeeded(mediaType, id) {
  return (dispatch, getState) => {
    const { entities } = getState();
    if(!_.isObject(entities[id])) {
      return dispatch({
        [CALL_API]: {
          types: [ LOAD_MEDIA_REQUEST, LOAD_MEDIA_SUCCESS, LOAD_MEDIA_FAILURE ],
          endpoint: `/${mediaType}/${id}`,
          id
        }
      });
    }
  }
};

// export const LOAD_EXTRA_INFO_REQUEST = 'LOAD_EXTRA_INFO_REQUEST';
// export const LOAD_EXTRA_INFO_SUCCESS = 'LOAD_EXTRA_INFO_SUCCESS';
// export const LOAD_EXTRA_INFO_FAILURE = 'LOAD_EXTRA_INFO_FAILURE';

// export function loadMedia(mediaType, id) {
//   return {
//     [CALL_API]: {
//       types: [ LOAD_EXTRA_INFO_REQUEST, LOAD_EXTRA_INFO_SUCCESS, LOAD_EXTRA_INFO_FAILURE ],
//       endpoint: `/${mediaType}/${id}`,
//       key: 'searchResults'
//     }
//   }
// };

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
