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
          extraParams: {
            query
          }
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
    const media = entities[id];
    if(!_.isObject(media) || !media.fullData) {
      return dispatch({
        [CALL_API]: {
          types: [ LOAD_MEDIA_REQUEST, LOAD_MEDIA_SUCCESS, LOAD_MEDIA_FAILURE ],
          endpoint: `/${mediaType}/${id}`,
          extraParams: {
            id,
            mediaType
          }
        }
      });
    }
  }
};

export const GET_CREDITS_REQUEST = 'GET_CREDITS_REQUEST';
export const GET_CREDITS_SUCCESS = 'GET_CREDITS_SUCCESS';
export const GET_CREDITS_FAILURE = 'GET_CREDITS_FAILURE';

export function getCredits(mediaType, id) {
  return (dispatch, getState) => {
    const { entities } = getState();
    const media = entities[id];
    console.log(media)
    if(_.isEmpty(media.credits)) {
      return dispatch({
        [CALL_API]: {
          types: [ GET_CREDITS_REQUEST, GET_CREDITS_SUCCESS, GET_CREDITS_FAILURE ],
          endpoint: mediaType === 'person' ? `/${mediaType}/${id}/combined_credits` : `/${mediaType}/${id}/credits`,
          extraParams: {
            id
          }
        }
      });
    }
  }
}

export function getFullCredits(creditId) {
  return {
    types: [ GET_FULL_CREDITS_REQUEST, GET_FULL_CREDITS_SUCCESS, GET_FULL_CREDITS_FAILURE ],
    extraParams: {
      creditId
    }
  }
}


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
