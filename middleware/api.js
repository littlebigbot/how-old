import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { map, join, isUndefined } from 'lodash';
import 'isomorphic-fetch'

const API_ROOT = 'http://api.themoviedb.org/3';
const API_KEY = 'cfa0adf468d2103f9def27b896a6f917';

// function buildNextUrl(response, url, data) {
//   if(response.page < response.totalPages) {
//     return `${url}?${serialize({
//       ...data,
//       api_key: API_KEY,
//       page: data.page + 1
//     })}`;
//   }

//   return `${url}?${serialize({...data, api_key: API_KEY})}`;
// };

function serialize(obj) {
  return join(map(obj, (val, key) => {
    if(!isUndefined(val)) {
      return `${key}=${encodeURIComponent(val)}`;
    }
  }), '&');
}

function makeUrl(endpoint) {
  return (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(config) {
  const { endpoint, data, key, schema, query } = config;
  const url = makeUrl(endpoint);

  return fetch(`${url}?${serialize({...data, api_key: API_KEY})}`)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      // console.log(mapResultsToDetails(camelizedJson.results));
      // if(schema) {
      //   return normalize(camelizedJson, schema);
      // }
      return camelizedJson;
      // console.log(camelizedJson)
      // return {
      //   entities: {
      //     ...camelizedJson
      //   }
      //   // nextUrl: buildNextUrl(json, url, data)
      // }
    })
}

const resultSchema = new Schema('searchResults', {
  idAttribute: 'id'
});

const mediaSchema = new Schema('media', {
  idAttribute: 'id'
});

export const Schemas = {
  SEARCH: {results: arrayOf(resultSchema)},
  MEDIA: mediaSchema
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { key, types, query, id } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!key) {
  //   throw new Error('Specify a key.')
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  next(actionWith({type: requestType}))

  return callApi(callAPI).then(
    response => next(actionWith({
      response,
      type: successType,
      query,
      id
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
