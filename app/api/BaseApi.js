import axios from 'axios';
import { API_HOSTNAME } from './index'


class BaseApi {
  constructor(hostname) {
    this.hostname = hostname;
    this.load = this.load.bind(this);
  }
  async load(urlPath, success, error) {
    if (!this.hostname) console.error(`[BaseApi Error]: no hostname provided`)
    try {
      const res = await axios.get(`${this.hostname}/api${urlPath}`)
      .then(success)
      .catch(error)
      return res
    } catch (e) {
      console.error(`[BaseApi Error]: ${e}`)
      return {}
    }
  }
}


export async function load(urlPath, success, error) {
  await axios.get(`${API_HOSTNAME}/api${urlPath}`)
    .then(success)
    .catch(error)
}


export default BaseApi


// /**
//  * Parses the JSON returned by a network request
//  *
//  * @param  {object} response A response from a network request
//  *
//  * @return {object}          The parsed JSON from the request
//  */
// function parseJSON(response) {
//   if (response.status === 204 || response.status === 205) {
//     return null;
//   }
//   return response.json();
// }

// /**
//  * Checks if a network request came back fine, and throws an error if not
//  *
//  * @param  {object} response   A response from a network request
//  *
//  * @return {object|undefined} Returns either the response, or throws an error
//  */
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// /**
//  * Requests a URL, returning a promise
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  *
//  * @return {object}           The response data
//  */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }
