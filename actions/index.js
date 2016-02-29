import { CALL_API, Schemas } from '../middleware/api'
import { arrayOf } from 'normalizr'

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export function search(query, page) {
  return {
    [CALL_API]: {
      types: [ SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE ],
      endpoint: `/search/multi`,
      data: {
        query,
        page
      },
      key: 'searchEntity'
      // schema: {results: arrayOf(Schemas.RESULT)}
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
