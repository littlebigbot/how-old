import { CALL_API, Schemas } from '../middleware/api'
import { arrayOf } from 'normalizr'

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export function search(query) {
  return {
    [CALL_API]: {
      types: [ SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE ],
      endpoint: `/search/multi`,
      data: {
        query
      },
      key: 'searchEntity'
    }
  }
}

export const LOAD_MORE_SEARCH_REQUEST = 'LOAD_MORE_SEARCH_REQUEST';
export const LOAD_MORE_SEARCH_SUCCESS = 'LOAD_MORE_SEARCH_SUCCESS';
export const LOAD_MORE_SEARCH_FAILURE = 'LOAD_MORE_SEARCH_FAILURE';

export function loadMoreSearch(query, page) {
  return {
    [CALL_API]: {
      types: [ LOAD_MORE_SEARCH_REQUEST, LOAD_MORE_SEARCH_SUCCESS, LOAD_MORE_SEARCH_FAILURE ],
      endpoint: `/search/multi`,
      data: {
        query,
        page
      },
      key: 'searchEntity'
    }
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
